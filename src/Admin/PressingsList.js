import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function PressingsList() {
  const [pressings, setPressings] = useState([]);

  useEffect(() => {
    try {
      const response = axios.get('http://127.0.0.1:8000/api/admin/pressingnoactive');
      setPressings(response.data);
    } catch (error) {
      console.error(error);
    }
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
            {pressings.map((pressing) => (
              <TableRow key={pressing.id}>
                <TableCell>{pressing.email}</TableCell>
                <TableCell>{pressing.location}</TableCell>
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
