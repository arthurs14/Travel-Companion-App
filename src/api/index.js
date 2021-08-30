import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com'

export const getPlacesData = async (type, sw, ne) => {
  try {
    // request
    
    const { data: { data } } = await axios.get(URL + `/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
    });

    return data;
  } catch (error) {
    // code redirect if fails   
    console.log(error); 
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
      params: { lon: '0', lat: '0' },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'a66f8625e6msh1b8b020dd9212b4p1815a6jsn43c94a2a1a2b'
      }
    });
  } catch (error) {
    console.log(error);
  }
};