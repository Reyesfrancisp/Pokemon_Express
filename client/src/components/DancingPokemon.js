import pikachuImage from '../images/pikachu.png';

function DancingPokemon() {
  return (
    <div className="animate-bounce mb-4">
      <img
        src={pikachuImage}
        alt="Dancing Pokemon"
        className="w-24 h-24 mx-auto"
      />
    </div>
  );
}

export default DancingPokemon;
