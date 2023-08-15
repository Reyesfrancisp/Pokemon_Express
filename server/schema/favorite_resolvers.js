const { favoriteResolvers } = require(".");

const favoriteResolvers = {
    Query: {
      favorites: async (_, __, { req }) => {
        try {
          const userId = req.user._id;
          const user = await User.findById(userId).populate('favorites');
          return user.favorites;
        } catch (error) {
          throw new Error('Server Error');
        }
      },
    },
    Mutation: {
      addFavorite: async (_, { pokemonData }, { req }) => {
        try {
          const userId = req.user._id;
          const user = await User.findById(userId);
  
          if (!user) {
            throw new Error('User not found');
          }
  
          const newFavorite = new Favorite(pokemonData);
          user.favorites.push(newFavorite);
          await user.save();
  
          return user;
        } catch (error) {
          throw new Error('Server Error');
        }
      },
      deleteFavorite: async (_, { favoriteId }, { req }) => {
        try {
          const userId = req.user._id;
          const user = await User.findById(userId);
  
          if (!user) {
            throw new Error('User not found');
          }
  
          const favoriteIndex = user.favorites.findIndex(
            fav => fav._id.toString() === favoriteId
          );
  
          if (favoriteIndex === -1) {
            throw new Error('Favorite not found');
          }
  
          user.favorites.splice(favoriteIndex, 1);
          await user.save();
  
          return user;
        } catch (error) {
          throw new Error('Server Error');
        }
      },
    },
  };
  
  module.exports = favoriteResolvers;