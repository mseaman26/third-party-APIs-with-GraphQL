module.exports = {
    getWeather: async (location) => {
        var geoTrackingAPIKey = process.env.WEATHER_API_KEY
        try{
            const geoResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${geoTrackingAPIKey}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
    
            if (!geoResponse.ok) {
              console.log('Failed to get geo data')
            }else{
              console.log("GeoResponse ok")
            }
    
            const geoData = await geoResponse.json()
            const lat = geoData.coord.lat
            const lon = geoData.coord.lon
            var CurrentWeatherMapURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${geoTrackingAPIKey}`
            const weatherResponse = await fetch(CurrentWeatherMapURL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if (!weatherResponse.ok) {
            console.log('Failed to get weather data')
          }
          const weatherData = await weatherResponse.json()
          return weatherData
          }catch(e){
            console.log('geoerror: ', e)
            return
          }
          
    },
    getHoroscopeData: async (sign) => {
        try{
            //https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=leo&day=TODAY
            const horoscopeResponse = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
            if (!horoscopeResponse.ok) {
                const text = await horoscopeResponse.text()
                console.log('response text: ', text)
                console.log('Failed to get horoscope data')
            }
            const horoscopeData = await horoscopeResponse.json()
            return horoscopeData
        }catch(e){
            console.log('horoscopeerror: ', e)

        }
    }
    
}


