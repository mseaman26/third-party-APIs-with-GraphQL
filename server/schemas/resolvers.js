const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const {getWeather, getHoroscopeData} = require('../utils/fetchFunctions')



const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      const weatherData = await getWeather('san francisco')
      const horoscopeData = await getHoroscopeData('leo')
      console.log('weatherData: ', weatherData)
      console.log('horoscopeData: ', horoscopeData)
    
     
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    users: async () => {
      const users = await User.find()
      return users
    }

  },
  Mutation: {
    createUser: async (parent, {username, password, city, sign}) => {
      console.log('city!: ', city)
      console.log('sign!: ', sign)
      try{
        const user = await User.create({username, password, city, sign}) 
        const token = signToken(user)
        return {token, user};
      }catch(e){
        console.log('error: ', e)
      }
      
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
