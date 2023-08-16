import React from 'react';
import '../index.scss'; // Import the main SCSS file if needed
import contactImage from '../images/Pokemon-PNG.png'; // Import the new image file



function Contact() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <img src={contactImage} alt="Contact Us" className="contact-image" /> {/* Use the new image */}
            <p>If you would like to get in touch with our team, feel free to reach out to us through the following channels:</p>
            <ul className="contact-list">
                <li>
                    <a className="contact-button" href="https://github.com/Reyesfrancisp/pokemon_devdex" target="_blank" rel="noopener noreferrer">
                        GitHub Profile
                    </a>
                </li>
                {/* Add more contact information as needed */}
            </ul>
            <p className="contact-message">We look forward to hearing from you!</p>
        </div>
    );
}


export default Contact;
