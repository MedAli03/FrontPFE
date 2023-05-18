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
<Box
  display="grid"
  gridTemplateColumns="repeat(12, 1fr)"
  gap={2}
  sx={{
    minWidth: 320,
    minHeight: 450,
    '@media screen and (min-width: 600px)': {
      minWidth: 600,
    },
    '@media screen and (min-width: 950px)': {
      minWidth: 950,
    },
  }}
>
  <Box
    gridColumn={{ xs: '1 / -1', md: 'span 6' }}
    sx={{
      my: 2,
      mx: 2,
      backgroundColor: '#F5F5F5',
      maxHeight: 450,
      overflow: 'auto',
      borderRadius: 5,
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    }}
  >
    <Item sx={{ mt: 1, mx: 1, position: 'sticky', top: 3 }}>
      <Typography variant="h5" sx={{ color: '#424242' }}>
        Liste des vêtements
      </Typography>
    </Item>

    {articles.length > 0 ? (
      articles.map((article) => (
        <Item
          key={article.id}
          sx={{
            my: 2,
            mx: 1,
            backgroundColor: '#FFFFFF',
            color: '#424242',
            borderRadius: 5,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          <Typography variant="subtitle1">{article.name}</Typography>
        </Item>
      ))
    ) : (
      <Item sx={{ mx: 1, my: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#424242' }}>
          Aucun vêtement trouvé.
        </Typography>
      </Item>
    )}
  </Box>

  <Box
    gridColumn={{ xs: '1 / -1', md: 'span 6' }}
    sx={{ my: 2, mx: 2, borderRadius: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
  >
    <Item sx={{ my: 2, mx: 1 }}>
      <Typography variant="h5" sx={{ color: '#424242' }}>
        Ajouter un vêtement
      </Typography>
    </Item>

    <Item sx={{ my: 2, mx: 1, display: 'flex', alignItems: 'center' }}>
      <TextField
        sx={{ width: '100%', maxWidth: 400, mx: 2 }}
        required
        label="Nom de vêtement"
        value={name}
        onChange={handleInputChange}
        variant="outlined"
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        endIcon={<SendIcon />}
        sx={{
          height: 40,
          color: '#FFFFFF',
          backgroundColor: '#424242',
          ml: { xs: 1, md: 2 },
          mt: { xs: 1, md: 0 },
        }}
      >
        Envoyer
      </Button>
    </Item>

    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      message="Votre demande a été envoyée avec succès !"
      sx={{ backgroundColor: '#43A047' }}
    />
  </Box>
</Box>


  )
}

export default Articles