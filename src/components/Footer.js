import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} File Converter & Image Editor - Professional Tools</p>
            </div>
        </footer>
    );
};

export default Footer;