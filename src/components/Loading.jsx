import React from 'react';

const Loading = () => {
    return (
        <div>
             <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-lime-500 border-t-transparent border-dashed rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
        </div>
    );
};

export default Loading;