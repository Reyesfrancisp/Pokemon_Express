import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

function DancingPokemon({ pokemonImage }) {
  return (
    <div className="animate-bounce mb-4">
      <img
        src={pokemonImage}
        alt="Dancing Pokemon"
        className="w-16 h-16 mx-auto"
      />
    </div>
  );
}

//Displays each letter of the text
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

  return <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">{displayText}</h1>;
}

function Landing() {
  const pokemonImage = 'https://th.bing.com/th/id/R.eda5531538101e2e5e3babbd75f811eb?rik=m857wQaMnapABw&riu=http%3a%2f%2forig08.deviantart.net%2f4dfb%2ff%2f2014%2f090%2f6%2f1%2fpikachu___01_by_mighty355-d7cdjy7.png&ehk=%2byUUP8C5NCRSYi0hJ3Lq2HpzY3uaqw2AKbH0JyCGFik%3d&risl=&pid=ImgRaw&r=0';
  const welcomeText = "Welcome to the PokeDex Express";

  return (
    <main className="landing bg-cover bg-center h-screen flex items-center">
      <div className="mx-auto text-center">
        <DancingPokemon pokemonImage={pokemonImage} />
        <TypingEffect text={welcomeText} />
        <p className="text-lg md:text-xl text-white mb-8">
          Catch 'em all and explore the world of Pokémon!
        </p>
        <motion.div
          className="box"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <a href="/search" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg md:text-xl hover:bg-blue-500 transition duration-300 ease-in-out">
            Explore Now
          </a>
        </motion.div>

      </div>
    </main>
  );
}

export default Landing;
