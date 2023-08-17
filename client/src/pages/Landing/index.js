import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import PokemonCard from '../../components/PokemonOutput';
import LoadingSpinner from '../../components/Loading';
import getPokemonInfo from '../Search/pokeApiQuery';
import DancingPokemon from '../../components/DancingPokemon';

// Displays each letter of the text
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
  const welcomeText = "Welcome to the PokeDex Express";

  const getRandomNumber = () => Math.floor(Math.random() * 1008) + 1;
  const [loading, setLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState(null);

  const fetchData = async () => {
    try {
      const searchNum = getRandomNumber();
      const pokemonData = await getPokemonInfo(searchNum);
      await setPokemonInfo(pokemonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon info:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 30 seconds
    }, 30000); // 30 seconds in milliseconds

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />; // You can show a loading modal here
  }

  return (
    <main className="landing bg-cover bg-center h-screen flex items-center mt-40 mb-40">
      <div className="mx-auto text-center">
        <DancingPokemon />

      
        <TypingEffect text={welcomeText} />

        <p className="text-lg md:text-xl text-black mb-8">
          Catch 'em all and explore the world of Pokémon!
        </p>

        <PokemonCard info={pokemonInfo} />

        <button href="/search" className="bg-blue-600 text-white my-5 px-6 py-3 rounded-lg text-lg md:text-xl hover:bg-blue-500 transition duration-300 ease-in-out">
          Explore Now
        </button>
      </div>
    </main>
  );
}

export default Landing;
