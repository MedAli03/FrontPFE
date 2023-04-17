import React, { useEffect ,useState} from 'react'
import axiosClient from '../axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';

function Services() {
  const [services, setServices] = useState([]);

useEffect(() => {
  const getServices = async () => {
    try {
      const response = await axiosClient.get("/pressing/service/all");
      setServices(response.data.services);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getServices();
}, []);
  return (
    <Container sx={{display:"flex" ,justifyContent:'space-between'}}>
      <TableContainer component={Paper} sx={{mr:5}}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom de service</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" color="success" sx={{mr:1}}>Accepter</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom de service</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" color="success" sx={{mr:1}}>Accepter</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  )
}

export default Services