import React, { useState, useEffect } from 'react';
import Payment from '../../components/Payment';

function TypingEffect({ text }) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      // I used the setInterval to control the typing speed
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText((prevDisplayText) => prevDisplayText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(typingInterval);
        }
      }, 150);
  
      return () => {
        clearInterval(typingInterval);
      };
    }, [currentIndex, text]);
  
    return <h1 className="text-2xl md:text-5xl text-white mb-4">{displayText}</h1>;
  }

function Donation() {
    const text = "Become a Pokémon Champion!";
    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-6">
            <TypingEffect text={text} />
            <p className="text-lg md:text-xl text-white mb-6">
                Help us continue our mission to catch 'em all and spread Pokémon joy around the world. Your donation supports our Pokédex adventure!
            </p>
            <p className="text-lg md:text-xl text-white mb-6">Your donation supports our Pokédex adventure!</p>
            <div className="w-full max-w-xl">
                <Payment />
            </div>
        </div>
    );
};

export default Donation;
