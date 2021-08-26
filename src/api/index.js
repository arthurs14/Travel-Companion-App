import axios from 'axios';
import { URL } from '../keys/keys';

export const getPlacesData = async (type, sw, ne) => {
  try {
    // request
    const { data: { data } } = await axios.get(URL + `${type}/list-in-boundary`, {
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