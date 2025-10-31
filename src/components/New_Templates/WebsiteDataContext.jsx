// contexts/WebsiteDataContext.js
import React, { createContext, useContext } from 'react';

const WebsiteDataContext = createContext();

export const useWebsiteData = () => {
  const context = useContext(WebsiteDataContext);
  if (!context) {
    throw new Error('useWebsiteData must be used within a WebsiteDataProvider');
  }
  return context;
};

export const WebsiteDataProvider = ({ children, websiteData }) => {
  return (
    <WebsiteDataContext.Provider value={websiteData}>
      {children}
    </WebsiteDataContext.Provider>
  );
};