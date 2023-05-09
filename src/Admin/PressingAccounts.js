import React, { useEffect, useState } from 'react';

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
  Stack,
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axiosClient from '../axios';


function PressingAccounts() {

    const [activePressings, setActivePressings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchBy, setSearchBy] = useState('Nom');

  useEffect(() => {
    const fetchActivePressings = async () => {
      try {
        const response = await axiosClient.get('/admin/pressings');
        setActivePressings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivePressings();
  }, []);

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filteredPressings = activePressings.filter((pressing) => {
    if (searchQuery === '') {
      return true;
    }
    if (searchBy === 'Nom') {
      return pressing.pressing_name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchBy === 'Telephone') {
      return pressing.phone.includes(searchQuery);
    } else if (searchBy === 'TVA') {
      return pressing.tva.includes(searchQuery);
    }else if (searchBy === 'Adress') {
      return pressing.address.toLowerCase().includes(searchQuery.toLowerCase());
    }else if (searchBy === 'Ville') {
      return pressing.city.toLowerCase().includes(searchQuery.toLowerCase());
    }else if (searchBy === 'Région') {
      return pressing.country.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div>
    <Typography sx={{ m: 2, mb: 4 }} variant="h4" gutterBottom>
      Les Comptes de Pressing:
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
          <MenuItem value="Telephone">Telephone</MenuItem>
          <MenuItem value="TVA">TVA</MenuItem>
          <MenuItem value="Adress">Adress</MenuItem>
          <MenuItem value="Ville">Ville</MenuItem>
          <MenuItem value="Région">Région</MenuItem>
        </Select>
      </FormControl>
      </Container>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000, p: 2 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Telephone</TableCell>
            <TableCell>TVA</TableCell>
            <TableCell>Adress</TableCell>
            <TableCell>Ville</TableCell>
            <TableCell>Région</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPressings.map(pressing => (
            <TableRow key={pressing.id}>
              <TableCell>{pressing.pressing_name}</TableCell>
              <TableCell>{pressing.phone}</TableCell>
              <TableCell>{pressing.tva}</TableCell>
              <TableCell>{pressing.address}</TableCell>
              <TableCell>{pressing.city}</TableCell>
              <TableCell>{pressing.country}</TableCell>
              <TableCell align="center">
                <Button variant="contained" size="small" style={{ backgroundColor: 'black', color: 'white' }} >
                  <ModeEditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}

export default PressingAccounts