const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const {getWeather, getHoroscopeData} = require('../utils/fetchFunctions')



const resolvers = {
  Query: {
    dashboard: async (parent, args, context) => {
      
      if (context?.user) {
        const weatherData = await getWeather('san francisco')
        const horoscopeData = await getHoroscopeData(context.user.sign)
        console.log('weatherData: ', weatherData)
        console.log('horoscopeData: ', horoscopeData)
        //add properties to our data object that include weather(description), weatherIcon, temperature, and horoscope
        return{
          
        
        }
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
