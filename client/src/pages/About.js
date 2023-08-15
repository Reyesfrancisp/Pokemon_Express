import React from 'react';

const teamMembers = [
    {
        name: 'Francis Reyes',
        role: 'Backend Developer',
        github: 'https://github.com/Reyesfrancisp'
    },
    {
        name: 'Michael Rodriguez',
        role: 'Frontend Developer',
        github: 'https://github.com/mkyrene'
    },
    {
        name: 'Isaias F',
        role: 'Frontend Developer',
        github: 'https://github.com/IsaiasD18'
    },
    {
        name: 'Liam Brandt',
        role: 'Backend Developer',
        github: 'https://github.com/LiamG00250118'
    },
];

const aboutStyles = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
};

const boldHeadingStyles = {
    fontWeight: 'bold',
};

const memberStyles = {
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.3s',
    ':hover': {
        backgroundColor: '#f4f4f4', // Add a background color on hover
    },
};

function About() {
    return (
        <div style={aboutStyles}>
            <h1 style={boldHeadingStyles}>Get to Know the Team!</h1>
            <p>Welcome to our team page, where you can learn more about the amazing individuals who make our mission possible. We are a diverse group of talented and dedicated individuals who share a common goal and passion for creating innovative solutions.</p>
            <p>Each member of our team brings unique skills, experiences, and perspectives to the table, contributing to our collaborative and dynamic work environment.</p>
            <p>Whether it's design, development, or any other aspect of our projects, we're committed to delivering the best results and pushing the boundaries of what we can achieve.</p>
            <p>Feel free to explore our profiles and get to know us better. We're excited to have you on this journey with us!</p>

            <h2 style={boldHeadingStyles}>Meet Our Team</h2>
            <ul>
                {teamMembers.map((member, index) => (
                    <li key={index} style={memberStyles}>
                        <strong>{member.name}</strong> - {member.role}
                        <br />
                        GitHub: <a href={member.github} target="_blank" rel="noopener noreferrer">{member.github}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default About;
