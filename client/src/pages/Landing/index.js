import {useState, useEffect} from 'react';
import PokemonCard from '../../components/PokemonOutput';
import LoadingSpinner from '../../components/Loading';
import getPokemonInfo from '../Search/pokeApiQuery';
import DancingPokemon from '../../components/DancingPokemon';

function Landing() {
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
    <main className="landing bg-cover bg-center h-screen flex items-center">
      <div className="mx-auto text-center">
      
        <DancingPokemon />
      

        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
          Welcome to the PokeDex Express
        </h1>
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
