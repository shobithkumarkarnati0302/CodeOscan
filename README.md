# 🔍 CodeOscan

**AI-Powered Code Analysis Platform**

CodeOscan is a modern web application that leverages Google's Generative AI to provide comprehensive code analysis, complexity assessment, and optimization suggestions. Built with React and Node.js, it offers an intuitive interface for developers to understand and improve their code quality.


## ✨ Features

### 🎯 **Core Functionality**
- **AI-Powered Analysis**: Leverages Google Generative AI for intelligent code evaluation
- **Multi-Language Support**: Supports 13+ programming languages including JavaScript, Python, Java, C++, and more
- **Complexity Analysis**: Automatic time and space complexity detection
- **Optimization Suggestions**: AI-generated improvement recommendations
- **Code Explanation**: Detailed breakdown of code functionality

### 🎨 **User Experience**
- **Modern UI/UX**: Beautiful gradient designs with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Syntax Highlighting**: Enhanced code display with proper formatting
- **Copy-to-Clipboard**: Easy code sharing functionality
- **Real-time Feedback**: Instant analysis results with loading states

### 📊 **Dashboard & Analytics**
- **Analysis History**: Complete record of all code analyses
- **Personal Notes**: Add custom notes to each analysis
- **Language Statistics**: Track usage across different programming languages
- **Shareable Results**: Generate public links for sharing analyses
- **Advanced Filtering**: Filter by language, date, and complexity

### 🔐 **Security & Authentication**
- **JWT Authentication**: Secure user sessions
- **Password Encryption**: bcrypt hashing for user passwords
- **Protected Routes**: Secure API endpoints and frontend routes
- **CORS Configuration**: Proper cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **Google AI API Key** (for Generative AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codeoscan.git
   cd codeoscan
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   **Backend (.env)**:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/codeoscan
   JWT_SECRET=your-super-secret-jwt-key
   GOOGLE_AI_API_KEY=your-google-ai-api-key
   MONGODB_DB=codeoscan
   ```

   **Frontend (.env)**:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

5. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3001`

## 🏗️ Architecture

### **Frontend Stack**
- **React 19** - Modern React with latest features
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server

### **Backend Stack**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Google Generative AI** - AI-powered code analysis
- **bcryptjs** - Password hashing

### **Project Structure**
```
codeoscan/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Reusable UI components
│   │   │   └── layout/       # Layout components
│   │   ├── pages/            # Route components
│   │   ├── api/              # API client configuration
│   │   ├── constants/        # Application constants
│   │   └── assets/           # Static assets
│   ├── public/               # Public assets
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Custom middleware
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── config/           # Configuration files
│   │   └── server.js         # Entry point
│   └── package.json
└── README.md
```

## 📱 Usage Guide

### **1. User Registration & Login**
- Create an account with email and password
- Secure JWT-based authentication
- Password strength validation

### **2. Code Analysis**
1. Navigate to the Dashboard
2. Select your programming language
3. Paste or type your code
4. Add an optional title for organization
5. Click "Analyze Code" to get results

### **3. Understanding Results**
- **Time Complexity**: Algorithm efficiency analysis
- **Space Complexity**: Memory usage assessment
- **Explanation**: Detailed code breakdown
- **Optimization Suggestions**: AI-generated improvements

### **4. Managing Analyses**
- View all analyses in the Dashboard
- Add personal notes in the Profile section
- Share analyses via public links
- Filter by language and date

## 🔧 API Documentation

### **Authentication Endpoints**
```http
POST /api/auth/register
POST /api/auth/login
```

### **Analysis Endpoints**
```http
GET    /api/analysis          # Get user's analyses
POST   /api/analysis          # Create new analysis
GET    /api/analysis/:id      # Get specific analysis
PATCH  /api/analysis/:id/notes # Update analysis notes
GET    /api/analysis/share/:id # Get shared analysis
```

### **Health Check**
```http
GET /api/health              # Server health status
```

## 🎨 UI Components

### **Custom Components**
- **CodeBlock**: Syntax-highlighted code display with copy functionality
- **Card**: Flexible container component with header and content
- **Button**: Customizable button with loading states
- **Input/Textarea**: Form components with validation
- **Badge**: Status and category indicators
- **Spinner**: Loading animations
- **Tooltip**: Contextual information display

### **Design System**
- **Color Palette**: Blue and emerald gradient themes
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent padding and margins
- **Animations**: Smooth transitions and fade-ins
- **Responsive**: Mobile-first design approach

## 🌍 Supported Languages

| Language   | Extension | AI Analysis |
|------------|-----------|-------------|
| JavaScript | .js       | ✅          |
| Python     | .py       | ✅          |
| Java       | .java     | ✅          |
| C++        | .cpp      | ✅          |
| C          | .c        | ✅          |
| C#         | .cs       | ✅          |
| PHP        | .php      | ✅          |
| Ruby       | .rb       | ✅          |
| Go         | .go       | ✅          |
| Rust       | .rs       | ✅          |
| TypeScript | .ts       | ✅          |
| Swift      | .swift    | ✅          |
| Kotlin     | .kt       | ✅          |

## 🚀 Deployment

### **Production Build**
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

### **Environment Variables (Production)**
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codeoscan
JWT_SECRET=your-production-jwt-secret
GOOGLE_AI_API_KEY=your-google-ai-api-key
```

### **Docker Support** (Optional)
```dockerfile
# Example Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🧪 Testing

### **Frontend Testing**
```bash
cd frontend
npm test                     # Run unit tests
npm run test:coverage       # Coverage report
```

### **Backend Testing**
```bash
cd backend
npm test                     # Run API tests
npm run test:integration    # Integration tests
```

## 🔒 Security Features

- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: MongoDB parameterized queries
- **XSS Prevention**: Proper data sanitization
- **CORS Configuration**: Controlled cross-origin requests
- **Rate Limiting**: API request throttling
- **Secure Headers**: Helmet.js security middleware

## 📈 Performance Optimizations

- **Code Splitting**: Lazy-loaded routes
- **Image Optimization**: Optimized assets
- **Caching**: Browser and API response caching
- **Bundle Analysis**: Webpack bundle optimization
- **Database Indexing**: Optimized MongoDB queries

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Generative AI** for powerful code analysis capabilities
- **React Team** for the amazing frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible database solution

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/codeoscan/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/codeoscan/discussions)
- **Email**: support@codeoscan.dev

## 🗺️ Roadmap

### **Upcoming Features**
- [ ] Real-time collaboration
- [ ] Code comparison tools
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with popular IDEs
- [ ] Team workspace features
- [ ] Custom analysis rules
- [ ] Export to PDF/JSON

---

**Made with ❤️ by the CodeOscan Team**

*Empowering developers with AI-driven code insights*
