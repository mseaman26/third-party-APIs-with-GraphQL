const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const {getWeather, getHoroscopeData} = require('../utils/fetchFunctions')



const resolvers = {
  Query: {
    dashboard: async (parent, args, context) => {
      console.log('query')
      if (context?.user) {
        const weatherData = await getWeather(context.user.city)
        const horoscopeData = await getHoroscopeData(context.user.sign)
        console.log('weatherData: ', weatherData)
        console.log('horoscopeData: ', horoscopeData)
        //add properties to our data object that include weather(description), weatherIcon, temperature, and horoscope
        return{
          weather: weatherData.weather[0].description,
          weatherIcon: weatherData.weather[0].icon,
          temperature: Math.floor(weatherData.main.temp * (9/5) - 459.67),
          horoscope: horoscopeData.data.horoscope_data,
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
