import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="footer_logo"></div>
                <div className="footer_contacts">
                    <a href="https://ar.quora.com/Marouan-Ahmina" target="_blank" rel="noopener noreferrer" className="contact_item contact_item_q">
                        <i className="fab fa-quora"></i>
                        <span className="contact_hidden_span">Quora</span>
                    </a>
                    <a href="https://github.com/AhminaMar1" target="_blank" rel="noopener noreferrer" className="contact_item contact_item_g">
                        <i className="fab fa-github"></i>
                        <span className="contact_hidden_span">Github</span>
                    
                    </a>
                    <a href="https://twitter.com/AhminaMar1" target="_blank" rel="noopener noreferrer" className="contact_item contact_item_t">
                        <i className="fab fa-twitter"></i>
                        <span className="contact_hidden_span">Twitter</span>
                    
                    </a>
                    <a href="mailto:AhminaMar1@gmail.com" target="_blank" rel="noopener noreferrer" className="contact_item contact_item_m">
                        <i className="fas fa-envelope"></i>
                        <span className="contact_hidden_span">mail</span>
                    
                    </a>
                </div>
                <p className="last-para-footer">
                    <span>صنع بكل <i className="fas fa-heart"></i> بواسطتي</span>
                    <span> | </span>
                    <span>تم بجاتسبي ولارافيل، المصدر المفتوح على </span>
                    <a href="https://github.com/AhminaMar1/LaraGatsby" target="_blank" rel="noopener noreferrer" className="footer-link">حسابي</a>
                    <span> | </span>
                    <Link to="/privacy" className="footer-link">سياسة الخصوصية</Link>
                </p>
            </div>
    	</footer>
    );
};

export default Footer;