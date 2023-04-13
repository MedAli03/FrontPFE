import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await axiosClient.get("/admin/clients");
        setClients(response.data.clients);
      } catch (error) {
        console.error(error);
      }
    };

    getClients();
  }, []);

  return (
    <>
          <Typography sx={{ m:2 , mb : 4}} variant="h4" gutterBottom>
        Liste des clients 
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell >Prénom</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Adress</TableCell>
            <TableCell >Ville</TableCell>
            <TableCell >Pays</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow
              key={client.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{client.first_name}</TableCell>
              <TableCell >{client.last_name}</TableCell>
              <TableCell >{client.email}</TableCell>
              <TableCell >{client.address}</TableCell>
              <TableCell >{client.city}</TableCell>
              <TableCell >{client.country}</TableCell>
              <TableCell align='center' >
                  <Button variant="contained" size="small"><ModeEditIcon /></Button>
                  <Button variant="contained" size="small" style={{backgroundColor: 'red', color: 'white'}}><PersonRemoveIcon /></Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default ClientsList;
