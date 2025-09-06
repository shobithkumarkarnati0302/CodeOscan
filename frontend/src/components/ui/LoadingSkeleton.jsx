export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-5 bg-white animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="flex items-center gap-3">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded-lg"></div>
            <div className="h-20 bg-gray-100 rounded-lg"></div>
            <div className="h-16 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
