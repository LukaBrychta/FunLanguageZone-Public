import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container">
                <span className="text-muted">&copy; 2024 Fun Language Zone</span>
            </div>
        </footer>
    );
}

export default Footer;