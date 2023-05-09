import React, { useEffect ,useState} from 'react'
import axiosClient from '../axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Snackbar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Articles() {
  const [articles, setArticles] = useState([]);
  const [name, setName] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axiosClient.get('/pressing/article');
      setArticles(response.data);
    }

    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post("/pressing/article/frompressing", {
        name,
      });
      console.log(data);
      // do something with the created service
      setName('');
      setIsSnackbarOpen(true);
      // fetch the updated list of services

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
      <Item sx={{mt:1,mx:1,position: "sticky", top: 3}}><Typography sx={{}}>Liste de vêtements : </Typography></Item>
      
      {articles.map((article) => (
        <Item key={article.id} sx={{my:2,mx:1,backgroundColor:'#b388ff',color:'white' }}>{article.name}</Item>
      ))}

    </Box>
    <Box gridColumn="span 6" sx={{my:2 , mx:2}}>
      <Item sx={{my:2,mx:1}}>vous voulez ajouter un autre vêtement ?</Item>
      <Item sx={{my:2,mx:1,display:'flex',alignItems:'center'}}>
        <TextField
          sx={{width:400,mx:2}}
          required
          label="nom de vêtement"
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

export default Articles