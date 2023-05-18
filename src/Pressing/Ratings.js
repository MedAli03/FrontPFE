import React, { useEffect, useState } from 'react';
import axiosClient from '../axios';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

function Ratings() {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [numRatings, setNumRatings] = useState(null);

  useEffect(() => {
    async function fetchRatings() {
      try {
        const response = await axiosClient.get('/pressing/rating/');
        console.log(response.data);
        setRatings(response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchRatings();
  }, []);

  useEffect(() => {
    async function fetchAverageRating() {
      try {
        const response = await axiosClient.get('/pressing/rating/m');
        console.log(response.data);
        setAverageRating(response.data.average_rating);
        setNumRatings(response.data.num_ratings);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchAverageRating();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',minWidth:700 }}>
      <Typography sx={{ mt: 2, mb: 1, color: 'black' }}>
        Notation totale :{' '}
        <Rating
          sx={{ mb: 1 }}
          name="half-rating-read"
          value={averageRating}
          precision={0.1}
          readOnly
        />
      </Typography>
      <Typography sx={{ mb: 2, color: 'black' }}>
        Nombre de clients qui ont noté : {numRatings}
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
          {ratings.map((row, index) => (
            <React.Fragment key={row.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {`${row.client.first_name} ${row.client.last_name}`}
                    </Typography>
                  }
                  secondary={<Rating value={row.value} readOnly />}
                />
              </ListItem>
              {index !== ratings.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Ratings;
