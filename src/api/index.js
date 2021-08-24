import axios from 'axios';
import { URL, travelKeyAPI, travelHost } from '../keys/keys';

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
        'x-rapidapi-key': travelKeyAPI,
        'x-rapidapi-host': travelHost
      }
    });

    return data;
  } catch (error) {
    // code redirect if fails   
    console.log(error); 
  }
};