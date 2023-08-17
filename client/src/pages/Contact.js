import React from 'react';
import contactImage from '../images/Pokemon-PNG.png'; 

function Contact() {
    return (
        <div className="contact-container">
            <h1 className='text-white text-3xl'>Contact Us</h1>
            <img
                src={contactImage}
                alt="Contact Us"
                className="contact-image animated-image"
            />
            <p className="font-bold text-white">
                If you would like to get in touch with our team, feel free to reach out to us through the following channels:
            </p>
            <ul className="contact-list">
                <li>
                    <a className="contact-button" href="https://github.com/Reyesfrancisp/pokemon_devdex" target="_blank" rel="noopener noreferrer">
                        GitHub Profile
                    </a>
                </li>
            </ul>
            <p className="contact-message">We look forward to hearing from you!</p>
        </div>
    );
}

export default Contact;
