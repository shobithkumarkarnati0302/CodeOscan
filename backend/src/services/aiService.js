// AI service wrapper using Google Generative AI (Gemini) when available
let GoogleGenerativeAI;
try {
  // Lazy require so the app can run without the package if not installed
  GoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI;
} catch (err) {
  console.log('Failed to load Google AI SDK:', err.message);
  GoogleGenerativeAI = null;
}

// Force reload env vars in case they weren't loaded when this module was imported
require('dotenv').config();

const hasGoogleKey = !!process.env.GOOGLE_AI_API_KEY && GoogleGenerativeAI;

// Debug logging
// console.log('AI Service Debug (after dotenv reload):', {
//   hasApiKey: !!process.env.GOOGLE_AI_API_KEY,
//   apiKeyLength: process.env.GOOGLE_AI_API_KEY?.length || 0,
//   hasSDK: !!GoogleGenerativeAI,
//   willUseAI: hasGoogleKey,
//   rawKey: process.env.GOOGLE_AI_API_KEY ? 'PRESENT' : 'MISSING'
// });

function guessLanguage(code) {
  if (/\bdef\s+\w+\(/.test(code) || /:\n\s+/.test(code)) return "python";
  if (/function\s+\w+\(/.test(code) || /const\s+\w+\s*=\s*\(/.test(code)) return "javascript";
  if (/class\s+\w+\s*\{/.test(code) && /:\s*\w+;/.test(code)) return "typescript";
  return undefined;
}

function parseJsonFromText(text) {
  try {
    // Try direct parse first
    return JSON.parse(text);
  } catch (_) {}
  // Fallback: extract first {...} JSON-ish block
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch (_) {}
  }
  return null;
}

async function validateCodeLanguage(input) {
  if (hasGoogleKey) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a strict language detector. Output ONLY a single lowercase language id like: javascript, typescript, python, java, csharp, cpp, go, ruby, php, swift, kotlin, rust. If unknown, output "unknown".\n\nCode:\n\n\n${input.code}\n`;
      const res = await model.generateContent(prompt);
      const text = res.response.text().trim().toLowerCase();
      const detected = text.split(/\s+/)[0].replace(/[^a-z#++]/g, '');
      const isValid = detected === 'unknown' ? true : detected === input.expectedLanguage.toLowerCase();
      return {
        isValid,
        detectedLanguage: detected === 'unknown' ? undefined : detected,
        reasoning: isValid
          ? `Detected language matches expected (${input.expectedLanguage}).`
          : `Detected ${detected} while expected ${input.expectedLanguage}.`,
      };
    } catch (err) {
      console.warn('validateCodeLanguage AI error, using heuristic fallback:', err?.message);
    }
  }
  // Heuristic fallback
  const detected = guessLanguage(input.code);
  const isValid = !detected || detected.toLowerCase() === input.expectedLanguage.toLowerCase();
  return {
    isValid,
    detectedLanguage: detected,
    reasoning: isValid
      ? `Detected language matches expected (${input.expectedLanguage}).`
      : `Detected ${detected} while expected ${input.expectedLanguage}.`,
  };
}

async function analyzeCodeComplexity(input) {
  console.log('analyzeCodeComplexity called with:', { 
    hasKey: !!process.env.GOOGLE_AI_API_KEY, 
    hasSDK: !!GoogleGenerativeAI,
    willTryAI: hasGoogleKey 
  });
  
  if (hasGoogleKey) {
    console.log('Attempting Gemini AI analysis...');
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const sys = `You are an expert in code comprehension and algorithm analysis.
Strictly output a single valid JSON object and nothing else.
Fields to include:
  - timeComplexity: Big-O for time (e.g., "O(n)", "O(n log n)")
  - spaceComplexity: Big-O for space (e.g., "O(1)", "O(n)")
  - explanation: A comprehensive description of what the code does, how it works, and important edge cases. Tailor depth to the provided explanation level.
  - improvementSuggestions: Actionable suggestions to minimize time and space complexity where possible (1-6 concise items).`;
      const user = `Title: ${input.title || 'Code analysis'}
Language: ${input.language}
ExplanationLevel: ${input.explanationLevel || 'Intermediate'}

Code:
${input.code}`;
      const res = await model.generateContent(sys + '\n\n' + user);
      const text = res.response.text();
      console.log('Gemini response received, length:', text.length);
      const json = parseJsonFromText(text);
      if (json && json.timeComplexity && json.spaceComplexity && json.explanation) {
        console.log('Successfully parsed Gemini response');
        return {
          timeComplexity: String(json.timeComplexity),
          spaceComplexity: String(json.spaceComplexity),
          explanation: String(json.explanation),
          improvementSuggestions: json.improvementSuggestions ? String(json.improvementSuggestions) : undefined,
        };
      }
      // If parsing failed, fall through to placeholder
      console.warn('analyzeCodeComplexity: could not parse AI JSON, using fallback. Raw response:', text);
    } catch (err) {
      console.error('analyzeCodeComplexity AI error, using fallback:', err);
    }
  } else {
    console.log('Skipping AI - using heuristic fallback');
  }
  // Heuristic analysis fallback (non-AI) that crafts an explanation based on patterns
  return heuristicAnalyze(input);
}

module.exports = { validateCodeLanguage, analyzeCodeComplexity };

// --- Heuristic fallback implementation ---
function heuristicAnalyze(input) {
  const code = input.code || '';
  const lower = code.toLowerCase();
  const level = (input.explanationLevel || 'Intermediate').toLowerCase();

  // Very rough pattern detection
  const isRecursive = /\bfunction\b.*\(.*\)|\bdef\b.*\(.*\)|\w+\s*\(.*\)/.test(code) && /return\s+\w+\s*\(/.test(code);
  const mentionsSort = /(sort|quicksort|mergesort|heapsort)/i.test(code);
  const mentionsHash = /(map|dict|object|hash|set)\b/i.test(code);
  const mentionsLoop = /for\s*\(|for\s+\w+\s+in|while\s*\(/i.test(code);
  const mentionsNestedLoop = /(for\s*\(.*\)\s*\{[^]*for\s*\(|for\s+\w+\s+in[^]*for\s+\w+\s+in|while\s*\([^]*for\s*\()/.test(lower);
  const mentionsGraph = /(bfs|dfs|graph|adjacency|queue|stack)/i.test(code);
  const mentionsDP = /(dp\b|memo|tabulation|bottom[- ]?up|top[- ]?down)/i.test(code);

  let time = 'O(n)';
  let space = 'O(1)';
  let bullets = [];

  if (mentionsNestedLoop) time = 'O(n^2)';
  if (mentionsLoop && !mentionsNestedLoop) time = 'O(n)';
  if (mentionsSort) time = 'O(n log n)';
  if (isRecursive && mentionsGraph) time = 'O(n + m)'; // typical graph traversal
  if (isRecursive && !mentionsGraph && !mentionsSort) time = 'O(2^n)'; // generic worst-case for unknown recursion
  if (mentionsDP) time = 'O(n * m)'; // generic DP

  if (mentionsHash) space = 'O(n)';
  if (mentionsGraph) space = 'O(n + m)';
  if (mentionsDP) space = 'O(n * m)';

  bullets.push(`Time complexity is approximated as ${time} based on detected patterns (loops/recursion/sorting).`);
  bullets.push(`Space complexity is approximated as ${space} considering auxiliary structures (maps/sets/graphs).`);
  if (mentionsSort) bullets.push('Sorting usually dominates to O(n log n); verify the sorting algorithm and input size.');
  if (mentionsHash) bullets.push('Hash-based lookups provide average O(1) performance; worst-case depends on collisions.');
  if (mentionsGraph) bullets.push('Graph traversal typically visits each node and edge once (O(n + m)).');
  if (mentionsDP) bullets.push('Dynamic programming trades space for time by caching subproblem results.');

  const makeExplanation = (lvl) => {
    const paragraphs = {
      basic: `The code processes input elements and performs operations that suggest a ${time} time complexity. Memory usage appears around ${space}.` ,
      intermediate: `From a structural perspective, control flow indicates ${mentionsNestedLoop ? 'nested iteration' : mentionsLoop ? 'linear iteration' : isRecursive ? 'recursive calls' : 'constant work per step'}. This leads to an estimated time complexity of ${time}. Auxiliary data structures ${mentionsHash ? '(e.g., maps/sets) ' : ''}increase memory usage to approximately ${space}.`,
      deep: `A closer look at the core operations reveals ${mentionsSort ? 'sorting behavior (often O(n log n))' : mentionsDP ? 'overlapping subproblems solved via memoization/tabulation' : isRecursive ? 'recursive decomposition' : mentionsNestedLoop ? 'quadratic nested iteration' : 'predominantly linear passes'}. Considering these, the asymptotic time complexity is about ${time}, while the working memory footprint is around ${space}. Assumptions include typical hash/distribution properties and average-case behavior.`
    };
    if (lvl.startsWith('basic')) return paragraphs.basic;
    if (lvl.startsWith('deep')) return paragraphs.deep;
    return paragraphs.intermediate;
  };

  const explanation = makeExplanation(level) + '\n\n' + bullets.map(b => `• ${b}`).join('\n');
  const improvementSuggestions = [
    mentionsNestedLoop ? 'Consider reducing nested loops via precomputation or hashing to approach O(n).' : null,
    mentionsSort ? 'If sorting large datasets repeatedly, cache sorted results or use more suitable data structures.' : null,
    mentionsHash ? 'Ensure good hash distribution to maintain average O(1) operations.' : null,
    isRecursive ? 'If recursion depth can be large, consider iterative refactoring or tail-call optimization where available.' : null,
  ].filter(Boolean).join('\n');

  return {
    timeComplexity: time,
    spaceComplexity: space,
    explanation,
    improvementSuggestions: improvementSuggestions || undefined,
  };
}
