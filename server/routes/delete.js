
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports

async function deleteAssociatedMoves(pokemon) {
    const moveIDsToDelete = [
        pokemon.move1,
        pokemon.move2,
        pokemon.move3,
        pokemon.move4,
    ].filter(moveID => moveID);

    await Move.deleteMany({ _id: { $in: moveIDsToDelete } });
}

async function deletePokemonAndRemoveFromTeam(team, pokemonID) {
    if (team) {
        console.log("Team in the delete function", team);
        // Convert pokemonID to a string
        const stringPokemonID = pokemonID.toString();

        if (team.pokemon1 && team.pokemon1.toString() === stringPokemonID) {
            team.pokemon1 = null;
        } else if (team.pokemon2 && team.pokemon2.toString() === stringPokemonID) {
            team.pokemon2 = null;
        } else if (team.pokemon3 && team.pokemon3.toString() === stringPokemonID) {
            team.pokemon3 = null;
        } else if (team.pokemon4 && team.pokemon4.toString() === stringPokemonID) {
            team.pokemon4 = null;
        } else if (team.pokemon5 && team.pokemon5.toString() === stringPokemonID) {
            team.pokemon5 = null;
        } else if (team.pokemon6 && team.pokemon6.toString() === stringPokemonID) {
            team.pokemon6 = null;
        }
        team.save();
    }

    // Delete associated Pokémon documents
    await Pokemon.deleteMany({ _id: { $in: [pokemonID] } });
}


module.exports = {
    deleteAssociatedMoves,
    deletePokemonAndRemoveFromTeam,
};