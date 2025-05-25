import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Network Security Tools - Educational Platform</p>
            </div>
        </footer>
    );
};

export default Footer;