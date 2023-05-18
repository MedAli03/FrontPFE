import React, { useEffect ,useState} from 'react'
import axiosClient from '../axios';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Snackbar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// import Img from './images/service.png'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Services() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosClient.get("/pressing/service/");
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post("/pressing/service/frompressing", {
        name,
      });
      console.log(data);
      // do something with the created service
      setName('');
      setIsSnackbarOpen(true);
      // fetch the updated list of services
      const response = await axiosClient.get("/pressing/service/");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleInputChange = (event) => {
    setName(event.target.value);
  }
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };


  return (
    <Box
    display="grid"
    gridTemplateColumns={{ xs: "1fr", md: "repeat(12, 1fr)" }}
    gap={2}
    sx={{ py: 2, px: { xs: 2, md: 8 }, backgroundColor: "#F5F5F5" }}
  >
    <Box
      gridColumn={{ xs: "1 / -1", md: "span 6" }}
      sx={{
        p: 4,
        maxHeight: 450,
        overflow: "auto",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 4, color: "#3F51B5" }}>
        Les services disponibles
      </Typography>
      {services.map((service) => (
        <Box
          key={service.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            height: 60,
            borderRadius: 8,
            backgroundColor: "#3F51B5",
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          {service.name}
        </Box>
      ))}
    </Box>
    <Box gridColumn={{ xs: "1 / -1", md: "span 6" }} sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4, color: "#3F51B5" }}>
        Ajouter un nouveau service
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <TextField
          required
          label="Nom de service"
          variant="outlined"
          sx={{ width: "100%", mb: 4 }}
          value={name}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            height: 48,
            width: "100%",
            backgroundColor: "#3F51B5",
            color: "#FFFFFF",
            fontWeight: 500,
            fontSize: 18,
            mt: 2,
          }}
        >
          Envoyer
        </Button>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Votre demande a été envoyée avec succès !"
        sx={{ mt: 4 }}
      />
    </Box>
  </Box>
  
  

  )
}

export default Services