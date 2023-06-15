import React, { useEffect, useState } from 'react';
import axiosClient from '../axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Snackbar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: theme.spacing(2),
  minWidth: 320,
  minHeight: 450,
  [theme.breakpoints.up('sm')]: {
    minWidth: 600,
  },
  [theme.breakpoints.up('md')]: {
    minWidth: 950,
  },
}));

const ListContainer = styled(Box)(({ theme }) => ({
  my: 2,
  mx: 2,
  backgroundColor: '#F5F5F5',
  maxHeight: 450,
  overflow: 'auto',
  borderRadius: 5,
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
}));

const Item = styled(Paper)(({ theme }) => ({
  my: 2,
  mx: 1,
  backgroundColor: '#FFFFFF',
  color: '#424242',
  borderRadius: 5,
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const AddItemContainer = styled(Box)(({ theme }) => ({
  my: 2,
  mx: 2,
  borderRadius: 5,
  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
}));

function Articles() {
  const [articles, setArticles] = useState([]);
  const [name, setName] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isArticleExist, setIsArticleExist] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axiosClient.get('/pressing/article');
      setArticles(response.data);
    }

    fetchArticles();
  }, []);

  useEffect(() => {
    if (isArticleExist) {
      const timeout = setTimeout(() => {
        setIsArticleExist(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isArticleExist]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingArticle = articles.find(
        (article) => article.name.toLowerCase() === name.toLowerCase()
      );
      if (existingArticle) {
        setIsArticleExist(true);
        return;
      }

      const { data } = await axiosClient.post('/pressing/article/frompressing', {
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
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Wrapper>
      <ListContainer gridColumn={{ xs: '1 / -1', md: 'span 6' }}>
        <Item sx={{ mt: 1, position: 'sticky', top: 3 }}>
          <Typography variant="h5" sx={{ color: '#424242' }}>
            Liste des vêtements
          </Typography>
        </Item>

        {articles.length > 0 ? (
          articles.map((article) => (
            <Item key={article.id}>
              <Typography variant="subtitle1">{article.name}</Typography>
            </Item>
          ))
        ) : (
          <Item>
            <Typography variant="subtitle1" sx={{ color: '#424242' }}>
              Aucun vêtement trouvé.
            </Typography>
          </Item>
        )}
      </ListContainer>

      <AddItemContainer gridColumn={{ xs: '1 / -1', md: 'span 6' }}>
        <Item>
          <Typography variant="h5" sx={{ color: '#424242' }}>
            Ajouter un vêtement
          </Typography>
        </Item>

        <Item sx={{ display: 'flex', alignItems: 'center' }}>
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

        {isArticleExist && (  
          <Item>
            <Typography variant="subtitle1" sx={{ color: 'red' }}>
              Cet article existe déjà.
            </Typography>
          </Item>
        )}
      </AddItemContainer>
    </Wrapper>
  );
}

export default Articles;
