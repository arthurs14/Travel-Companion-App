import { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
   const [places, setPlaces] = useState([]);
   const [coordinates, setCoordinates] = useState({});
   const [bounds, setBounds] = useState(null);

  // should only run at the start
  useEffect(() => {
    const success = (pos) => {
      const { latitude, longitude } = pos.coords;
      setCoordinates({ lat: latitude, lng: longitude });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // should update when either bounds or coords change
  useEffect(() => {
    if (bounds) {
      getPlacesData(bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data);
        });
    }
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;