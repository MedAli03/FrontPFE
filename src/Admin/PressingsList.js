import React, { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
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

  const activatePressingAccount = async (id) => {
    try {
      const response = await axiosClient.put(`/admin/activate/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handleClick = (id) => {
    activatePressingAccount(id)
      .then(() => {
        console.log('Pressing account activated successfully');
        // Reload the page after activation
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }
  
  const rejectPressing = async (id) => {
    try {
      const response = await axiosClient.delete(`/admin/delete/${id}`);
      console.log(response.data.message);
      // Refresh the list of pressings after deleting the current one
      const updatedPressings = pressings.filter(
        (pressing) => pressing.id !== id
      );
      setPressings(updatedPressings);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div>
      <Typography sx={{ m: 2, mb: 4 }} variant="h4" gutterBottom>
        demande de pressing:
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000, p: 2 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>CIN</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>TVA</TableCell>
              <TableCell>Adress</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pressings.map((pressing) => (
              <TableRow key={pressing.id}>
                <TableCell>{pressing.pressing_name}</TableCell>
                <TableCell>{pressing.cin}</TableCell>
                <TableCell>{pressing.phone}</TableCell>
                <TableCell>{pressing.tva}</TableCell>
                <TableCell>{pressing.address}</TableCell>
                <TableCell>{pressing.city}</TableCell>
                <TableCell>{pressing.country}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" size="small" 
                  style={{ color: 'white', background: 'black', marginLeft: 3 }}
                  onClick={() => handleClick(pressing.id)}>
                    <AddIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ color: 'red', borderColor: 'red', marginLeft: 3 }}
                    onClick={() => rejectPressing(pressing.id)}
                  >
                    <ClearIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}



export default PressingsList;
