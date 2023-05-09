import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Tarif() {

  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [tarifs, setTarifs] = useState([]);
  const [price, setPrice] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axiosClient.get('/pressing/article');
        console.log(response.data);
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axiosClient.get('/pressing/service/');
        console.log(response.data);
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchTarifs = async () => {
      try {
        const response = await axiosClient.get('/pressing/tarif');
        setTarifs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTarifs();
  }, []);

  const handleChangeArticle = (event) => {
    setSelectedArticle(event.target.value);
  };
  const handleChangeService = (event) => {
    setSelectedService(event.target.value);
  };

  const handleAddTarif = async () => {
    try {
      const response = await axiosClient.post('/pressing/tarif/ajouter', {
        price: price,
        id_service: selectedService,
        id_article: selectedArticle,
      });
      setTarifs([...tarifs, response.data]);
      setPrice('');
    } catch (error) {
      console.log(error);
    }
  };

return (
<>
    <Box component="form" onSubmit={handleAddTarif}>
      <Grid container spacing={3} sx={{my : 2,justifyContent:'center',alignItems:'center',mx:2}} >
      <Grid item xs={12} sm={3}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Vêtement</InputLabel>
            <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Vêtement"
          value={selectedArticle}
          onChange={handleChangeArticle}
          sx={{width:200} }
        >
          {articles.map(article => (
          <MenuItem key={article.id} value={article.id}>
            {article.name}
          </MenuItem>
      ))}
        </Select>
        </FormControl>
            </Grid>
          <Grid item xs={12} sm={3} >
            <TextField 
              label="Prix" 
              id="outlined-size-normal" 
              type="number" 
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={3}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Service</InputLabel>
              <Select
                  label="Service"
                  value={selectedService}
                  onChange={handleChangeService}
                  sx={{width:200} }
                >
                  {services.map(service => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
              ))}
            </Select>
         </FormControl>
            </Grid>
           
          <Grid item xs={12} sm={3} sx={{}}>
            <Button type='submit' size='large' variant='outlined' style={{color:'white',backgroundColor: '#8e24aa',borderColor:'#e1bee7'}}>Ajouter</Button>
          </Grid>
            
          </Grid>
      </Box>
<TableContainer component={Paper} sx={{mt : 5}}>
      <Table sx={{ minWidth: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Vétement </TableCell>
            <TableCell align="center">Prix</TableCell>
            <TableCell align="center">Service</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tarifs && tarifs.map((tarif) => (
            <TableRow
              key={tarif.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>
              {tarif.article.name}
              </TableCell>
              <TableCell align="center">
                {tarif.price}
              </TableCell>
              <TableCell align="center">
                  {tarif.service.name}
              </TableCell>
              <TableCell align="center">
              <IconButton color="secondary" aria-label="add an alarm">
                <EditIcon />
              </IconButton>
              <IconButton color="primary" aria-label="add to shopping cart">
                <DeleteIcon />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</>
)
}

export default Tarif