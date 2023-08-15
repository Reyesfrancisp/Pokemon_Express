import React from 'react';

//Team members 
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

function About() {
    return (
        <div>
            <h1>Get to Know the Team!</h1>
            <p>Welcome to our team page, where you can learn more about the amazing individuals who make our mission possible. We are a diverse group of talented and dedicated individuals who share a common goal and passion for creating innovative solutions.</p>
            <p>Each member of our team brings unique skills, experiences, and perspectives to the table, contributing to our collaborative and dynamic work environment.</p>
            <p>Whether it's design, development, or any other aspect of our projects, we're committed to delivering the best results and pushing the boundaries of what we can achieve.</p>
            <p>Feel free to explore our profiles and get to know us better. We're excited to have you on this journey with us!</p>

            <h2>Meet Our Team</h2>
            <ul>
                {teamMembers.map((member, index) => (
                    <li key={index}>
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
