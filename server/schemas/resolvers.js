const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

var geoTrackingAPIKey = "dbb601e9b7c8bad902bd55c2a2689ca5"

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      
      try{
        const geoResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=san%20francisco&appid=${geoTrackingAPIKey}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!geoResponse.ok) {
          console.log('Failed to get geo data')
        }else{
          console.log('georesponse: ', geoResponse)
          console.log("Success")
        }

      const geoData = await geoResponse.json()
      const lat = geoData.coord.lat
      const lon = geoData.coord.lon
      console.log('geoData: ', geoData)
      console.log(lat, lon)
        
      }catch(e){
        console.log('geoerror: ', e)
      }
 
      // const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${geoTrackingAPIKey}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      // if (!weatherResponse.ok) {
      //   console.log('Failed to get weather data')
      // }
      // const weatherData = await weatherResponse.json()
      // console.log(weatherData)
      
      // console.log(lat, lon)
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
    createUser: async (parent, {username, password}) => {
      const user = await User.create({username, password}) 
      const token = signToken(user)
      return {token, user};
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
