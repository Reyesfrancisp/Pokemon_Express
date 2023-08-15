import React from 'react';

function Contact() {
    return (
        <div>
            <h1>Contact Us</h1>
            <p>If you would like to get in touch with our team, feel free to reach out to us through the following channels:</p>
            <ul>
                <li>
                    GitHub: <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                </li>
                <li>
                    LinkedIn: <a href="https://www.linkedin.com/in/your-linkedin-username" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </li>
                {/* Add more contact information as needed */}
            </ul>
            <p>We look forward to hearing from you!</p>
        </div>
    );
}

export default Contact;
