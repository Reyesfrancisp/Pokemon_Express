import React from 'react';
import '../index.scss'; // Import the main SCSS file if needed

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
        name: 'Isaias Flores',
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
        <div className="about-container mx-auto px-4 py-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Get to Know the Team!</h1>
            <div className='text-white'>
                <p>Welcome to our team page, where you can learn more about the amazing individuals who make our mission possible. We are a diverse group of talented and dedicated individuals who share a common goal and passion for creating innovative solutions.</p>
                <p>Each member of our team brings unique skills, experiences, and perspectives to the table, contributing to our collaborative and dynamic work environment.</p>
                <p>Whether it's design, development, or any other aspect of our projects, we're committed to delivering the best results and pushing the boundaries of what we can achieve.</p>
                <p>Feel free to explore our profiles and get to know us better. We're excited to have you on this journey with us!</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Meet Our Team</h2>
            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {teamMembers.map((member, index) => (
                    <li key={index}>
                        <div className="bg-blue-500 rounded-lg p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                            </div>
                            <div className="text-white">
                                <strong>{member.name}</strong> - {member.role}
                                <br />
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:underline flex items-center justify-center"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default About;
