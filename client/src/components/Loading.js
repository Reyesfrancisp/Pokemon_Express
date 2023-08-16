
function LoadingSpinner({ message = 'Loading...' }) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50 h-16 w-16 mb-2"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    );
  }
  
  export default LoadingSpinner;