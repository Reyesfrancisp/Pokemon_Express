import React from 'react';
import '../index.scss'; // Import the main SCSS file if needed
import dragon from "../images/types/dragon.png"
import electric from "../images/types/electric.png"
import grass from "../images/types/grass.png"
import fire from "../images/types/fire.png"

const typeImages = {
    dragon,
    electric,
    fire,
    grass

};


const teamMembers = [
    {
        name: 'Francis Reyes',
        role: 'Backend Developer',
        github: 'https://github.com/Reyesfrancisp',
        type: "dragon"

    },
    {
        name: 'Michael Rodriguez',
        role: 'Frontend Developer',
        github: 'https://github.com/mkyrene',
        type: "electric"
    },
    {
        name: 'Isaias Flores',
        role: 'Frontend Developer',
        github: 'https://github.com/IsaiasD18',
        type: "grass"
    },
    {
        name: 'Liam Brandt',
        role: 'Backend Developer',
        github: 'https://github.com/LiamG00250118',
        type: "fire"
    },
];

function About() {
    return (
        <div className="about-container mx-auto px-4 py-8 text-white">
            <h3 className="text-4xl font-bold mb-4">Get to Know the Team!</h3>
            <div className='text-white'>
                <p>Welcome to our team page, where you can learn more about the amazing individuals who make our mission possible. We are a diverse group of talented and dedicated individuals who share a common goal and passion for creating innovative solutions.</p>
                <p>Each member of our team brings unique skills, experiences, and perspectives to the table, contributing to our collaborative and dynamic work environment.</p>
                <p>Whether it's design, development, or any other aspect of our projects, we're committed to delivering the best results and pushing the boundaries of what we can achieve.</p>
                <p>Feel free to explore our profiles and get to know us better. We're excited to have you on this journey with us!</p>
            </div>

            <h3 className="text-3xl font-bold mt-8 mb-4">Meet Our Team</h3>
            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {teamMembers.map((member, index) => (
                    <li key={index}>
                        <div className="bg-blue-500 rounded-lg p-6">
                            <img
                                src={typeImages[member.type]} // Assuming move.type is the type name
                                alt={`${member.type} type`}
                                className="w-10 h-10 mb-4 mx-auto"
                            />
                            {/* add image line above */}
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
