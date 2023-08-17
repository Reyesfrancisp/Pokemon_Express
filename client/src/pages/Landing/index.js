import {useState, useEffect} from 'react';

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
import PokemonCard from '../../components/PokemonOutput';
import LoadingSpinner from '../../components/Loading';
import getPokemonInfo from '../Search/pokeApiQuery';
function Landing() {
  const pokemonImage = 'https://th.bing.com/th/id/R.eda5531538101e2e5e3babbd75f811eb?rik=m857wQaMnapABw&riu=http%3a%2f%2forig08.deviantart.net%2f4dfb%2ff%2f2014%2f090%2f6%2f1%2fpikachu___01_by_mighty355-d7cdjy7.png&ehk=%2byUUP8C5NCRSYi0hJ3Lq2HpzY3uaqw2AKbH0JyCGFik%3d&risl=&pid=ImgRaw&r=0'; 


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
        <DancingPokemon pokemonImage={pokemonImage} />
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
