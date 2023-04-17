import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
function Commandes() {

  const [commands, setCommands] = useState([]);

  useEffect(() => {
    async function fetchCommands() {
      try {
        const response = await axiosClient.get('/pressing/commande/');
        console.log(response.data);
        setCommands(response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchCommands();
  }, []);
  


  return (
    <div>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom de Client</TableCell>
            <TableCell align="center">Prénom</TableCell>
            <TableCell align="center">Quantité</TableCell>
            <TableCell align="center">Tarif</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commands.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.client_id}
              </TableCell>
              <TableCell align="center">{row.client_id}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{row.tarif_id}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">
              <Button variant="contained" color="success" sx={{mr:1}}>Accepter</Button>
              <Button variant="outlined" color="error">Reffuser</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Commandes