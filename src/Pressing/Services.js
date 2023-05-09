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
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} sx={{minWidth:950,minHeight:450}}>
    <Box gridColumn="span 6" sx={{my:2 , mx:2,backgroundColor:'#eeeeee' ,maxHeight:450,overflow: 'auto'}}>
      <Item sx={{mt:1,mx:1,position: "sticky", top: 0}}><Typography sx={{}}>Les service disponibles : </Typography></Item>
      
      {services.map(service => (
        <Item key={service.id} sx={{my:2,mx:1,backgroundColor:'#b388ff',color:'white' }}>{service.name}</Item>
      ))}
      
    </Box>
    <Box gridColumn="span 6" sx={{my:2 , mx:2}}>
      <Item sx={{my:2,mx:1}}>vous voulez ajouter un autre service ?</Item>
      <Item sx={{my:2,mx:1,display:'flex',alignItems:'center'}}>
        <TextField
          sx={{width:400,mx:2}}
          required
          label="nom de service"
          value={name}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />} sx={{height:40}}>
        Envoyer
        </Button>
      </Item>
        <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Votre demande a été envoyer avec succès !"
      />

      
    </Box>
  </Box>
  
  )
}

export default Services