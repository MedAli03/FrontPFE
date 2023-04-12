import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import axiosClient from '../axios';

function PressingsList() {
  const [pressings, setPressings] = useState([]);

useEffect(() => {
  const getPressings = async () => {
    try {
      const response = await axiosClient.get('/admin/pressingnoactive');
      setPressings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  getPressings();
}, []);


  return (
    <div>
      <h1>Pressings not active:</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {pressings.map(pressing => (
              <TableRow key={pressing.id}>
                <TableCell>{pressing.tva}</TableCell>
                <TableCell>{pressing.country}</TableCell>
                <TableCell>{pressing.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PressingsList;
