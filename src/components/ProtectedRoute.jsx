import React from 'react';

const ProtectedRoute = ({ children }) => {
  // Always render children without any authentication checks
  return children;
};

export default ProtectedRoute; 