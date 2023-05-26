import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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
      await axiosClient.post('/pressing/tarif/ajouter', {
        price: price,
        id_service: selectedService,
        id_article: selectedArticle,
      });
      setPrice('');
      const response2= await axiosClient.get("/pressing/tarif");
      setTarifs(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

return (
<Box sx={{minWidth: 800, overflow: 'auto'}}>
  <Box component="form" onSubmit={handleAddTarif} sx={{my: 2}}>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth sx={{mr: {xs: 0, sm: 2}}}>
          <InputLabel>Vêtement</InputLabel>
          <Select
            value={selectedArticle}
            onChange={handleChangeArticle}
            label="Vêtement"
          >
            {articles.map(article => (
              <MenuItem key={article.id} value={article.id}>
                {article.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth sx={{mr: {xs: 0, sm: 2}}}>
          <InputLabel>Service</InputLabel>
          <Select
            value={selectedService}
            onChange={handleChangeService}
            label="Service"
          >
            {services.map(service => (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          fullWidth
          label="Prix"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Ajouter
        </Button>
      </Grid>
    </Grid>
  </Box>

  <Box sx={{mt: 5}}>
    {tarifs.length === 0 ? (
      <Typography variant="body2" sx={{textAlign: 'center'}}>
        Aucun tarif trouvé.
      </Typography>
    ) : (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vêtement</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tarifs.map((tarif) => (
              <TableRow key={tarif.id}>
                <TableCell>{tarif.article.name}</TableCell>
                <TableCell>{tarif.service.name}</TableCell>
                <TableCell>{tarif.price}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="modifier"
                   
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="supprimer"
                    // onClick={() => handleDeleteTarif(tarif)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </Box>
</Box>

)
}

export default Tarif