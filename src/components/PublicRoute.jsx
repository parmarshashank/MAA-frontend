import React from 'react';

const PublicRoute = ({ children }) => {
  // Always render children without any authentication checks
  return children;
};

export default PublicRoute; 