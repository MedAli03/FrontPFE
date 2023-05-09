import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button, TextField, Stack, Autocomplete, FormControl, InputLabel, Select, MenuItem, Container } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function ClientsList() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState('Nom');

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

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filteredClients = clients.filter((client) => {
    if (searchQuery === '') {
      return true;
    }

    if (searchBy === 'Nom') {
      return client.first_name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchBy === 'Prénom') {
      return client.last_name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchBy === 'Email') {
      return client.email.toLowerCase().includes(searchQuery.toLowerCase());
    }else if (searchBy === 'Adress') {
      return client.address.toLowerCase().includes(searchQuery.toLowerCase());
    }else if (searchBy === 'Ville') {
      return client.city.toLowerCase().includes(searchQuery.toLowerCase());
    }else if (searchBy === 'Pays') {
      return client.country.toLowerCase().includes(searchQuery.toLowerCase());
    }
    

    return true;
  });

  const getOptionList = () => {
    switch (searchBy) {
      default:
        return [];
    }
  };

  return (
    <>
      
        <Typography sx={{ m:2 , mb : 4}} variant="h4" gutterBottom>
        Liste de clients :
      </Typography>
      <Container sx={{display:"flex"}}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{minWidth:100}}>
        <Autocomplete
          sx={{minWidth:200}}
          freeSolo
          disableClearable
          options={getOptionList()}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Search by ${searchBy}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        />
      </Stack>

      <FormControl sx={{ m: 2 }} variant="outlined" size="small">
        <InputLabel id="search-by-label">Search by</InputLabel>
        <Select
        sx={{width:150,height:55}}
          labelId="search-by-label"
          id="search-by-select"
          value={searchBy}
          onChange={handleSearchByChange}
          label="Search by"
        >
          <MenuItem value="Nom">Nom</MenuItem>
          <MenuItem value="Prénom">Prénom</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Adress">Adress</MenuItem>
          <MenuItem value="Ville">Ville</MenuItem>
          <MenuItem value="Pays">Pays</MenuItem>
        </Select>
      </FormControl>
      </Container>
      
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
          {filteredClients.map((client) => (
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
                  <Button variant="contained" size="small" style={{background: 'black', color: 'white'}}><ModeEditIcon /></Button>
                  <Button variant="outlined" size="small" style={{borderColor: 'black', color: 'red', marginLeft:4}}><PersonRemoveIcon /></Button>
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
