import React, { useEffect, useState } from 'react';
import axiosClient from '../axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
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

    setPrice('');

    // Add the new tarif to the existing list
    setTarifs((prevTarifs) => [...prevTarifs, response.data]);

  } catch (error) {
    console.log(error);
  }
};


  return (
    <Box sx={{ minWidth: 800, overflow: 'auto' }}>
      <Box component="form" onSubmit={handleAddTarif} sx={{ my: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ mr: { xs: 0, sm: 2 } }}>
              <InputLabel>Vêtement</InputLabel>
              <Select
                value={selectedArticle}
                onChange={handleChangeArticle}
                label="Vêtement"
              >
                {articles.map((article) => (
                  <MenuItem key={article.id} value={article.id}>
                    {article.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ mr: { xs: 0, sm: 2 } }}>
              <InputLabel>Service</InputLabel>
              <Select
                value={selectedService}
                onChange={handleChangeService}
                label="Service"
              >
                {services.map((service) => (
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
            <Button fullWidth variant="contained" color="primary" type="submit">
              Ajouter
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 5 }}>
        {tarifs.length === 0 ? (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Aucun tarif trouvé.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {tarifs.map((tarif) => (
              <Grid item xs={12} sm={6} key={tarif.id}>
                <Card sx={{ bgcolor: '#F3F6F9' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#424242' }}>
                      {tarif.article.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#616161' }}>
                      {tarif.service.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#212121' }}>
                      {tarif.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="modifier">
                      <EditIcon sx={{ color: '#757575' }} />
                    </IconButton>
                    <IconButton aria-label="supprimer">
                      <DeleteIcon sx={{ color: '#757575' }} />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Tarif;
