import { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
   const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

   const [childClicked, setChildClicked] = useState(null);

   const [coordinates, setCoordinates] = useState({});
   const [bounds, setBounds] = useState({});

   const [loading, setLoading] = useState(false);

   const [type, setType] = useState('restaurants');
   const [rating, setRating] = useState('');

  // should only run at the start
  useEffect(() => {
    const success = (pos) => {
      const { latitude, longitude } = pos.coords;
      setCoordinates({ lat: latitude, lng: longitude });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // when rating filter changes
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  // should update when either bounds or coords change
  useEffect(() => {  
    setLoading(true);
    
    if (bounds) {
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data);
          setFilteredPlaces([])
          setLoading(false)
        });
    }
  }, [type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places} 
            childClicked={childClicked} 
            loading={loading} 
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;