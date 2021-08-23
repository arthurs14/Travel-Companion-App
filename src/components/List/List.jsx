import { useState, useEffect, createRef } from 'react';
import { 
  CircularProgress, 
  Grid, 
  Typography, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
} from "@material-ui/core";

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({ places, childClicked, loading }) => {
  const classes = useStyles();
  const [type, setType] = useState('restauraunts');
  const [rating, setRating] = useState('');
  
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, idx) => elRefs[idx] || createRef());

    setElRefs(refs);
  }, [elRefs, places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaraunts, Hotels, and Attractions Around You
      </Typography>
      {
        loading ? (
          <div className={classes.loading}>
            <CircularProgress size="5rem" />
          </div>
        ) : (
          <>
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="restauraunts">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
              {
                places?.map((place, idx) => (
                  <Grid item key={idx} xs={12}>
                    <PlaceDetails 
                      place={place} 
                      select={childClicked === idx} 
                      refProp={elRefs[idx]}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </>
        )
      }
    </div>
  );
};

export default List;