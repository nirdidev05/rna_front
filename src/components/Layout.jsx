import React from 'react';
import Header from './header';
import Menu from './Menu';
import '../styles/Layout.css'; // Ensure you create this CSS file

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="main-content">
                <Menu />
                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
