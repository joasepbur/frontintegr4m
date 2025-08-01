import React from 'react';
import CatalogSidebar from './CatalogSidebar';
import './CatalogLayout.css';

const CatalogLayout = ({ children }) => {
  return (
    <div className="catalog-layout">
      <CatalogSidebar />
      <main className="catalog-content">
        {children}
      </main>
    </div>
  );
};

export default CatalogLayout;
