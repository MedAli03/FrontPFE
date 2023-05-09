import React, { useEffect, useState } from 'react';
import axiosClient from '../axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import { Typography } from '@mui/material';


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
    <>
      <Typography sx={{my : 1 , mx:2}}>Notation Total : <Rating sx={{mb : 1 , mx:2}} name="half-rating-read" value={averageRating} precision={0.1} readOnly /> </Typography>
      
      <Typography sx={{my : 1 , mx:2}}>Nombre de clients qui notent : {numRatings}  </Typography>
      <TableContainer component={Paper} sx={{maxHeight:400}}>
      <Table sx={{ minWidth: 850 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Nom du client</TableCell>
            <TableCell align="center">Notation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ratings.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
              {row.client.first_name}
              </TableCell>
              <TableCell align="center">
                <Rating
                  name="simple-controlled"
                  value={row.value}
                  readOnly 
                />
      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default Ratings