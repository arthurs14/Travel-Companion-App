import axios from 'axios';
import { travelURL, travelKeyAPI, travelHost } from '../keys/keys';

var options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'x-rapidapi-key': travelKeyAPI,
    'x-rapidapi-host': travelHost
  }
};

export const getPlacesData = async () => {
  try {
    // request
    const { data: { data } } = await axios.get(travelURL, options);

    return data;
  } catch (error) {
    // code redirect if fails   
    console.log(error); 
  }
};