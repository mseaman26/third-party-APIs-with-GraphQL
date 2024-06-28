const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const {getWeather, getHoroscopeData} = require('../utils/fetchFunctions')



const resolvers = {
  Query: {
    dashboard: async (parent, args, context) => {
      
    
     
      if (context.user) {
        const user =  await User.findOne({ _id: context.user._id });
        const weatherData = await getWeather('san francisco')
        const horoscopeData = await getHoroscopeData(user.sign)
        console.log('weatherData: ', weatherData)
        console.log('horoscopeData: ', horoscopeData)
        return{
          weather: weatherData.weather[0].description,
          weatherIcon: weatherData.weather[0].icon,
          temperature: Math.floor(weatherData.main.temp * (9/5) - 459.67),
          horoscope: horoscopeData.data.horoscope_data,
          meData: user
        
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
