import axios from 'axios';
import { travelKeyAPI, travelHost } from '../keys/keys';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

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

const getPlacesData = async () => {
  try {
    // request
    const res = await axios.get();
  } catch (error) {
    // code redirect if fails    
  }
};