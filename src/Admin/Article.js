import React, { useEffect ,useState} from 'react'
import axiosClient from '../axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Articles() {

  const [articles, setArticles] = useState([]);
  const [requestArticle, setRequestArticle] = useState([]);
  const [newArticle, setNewArticle] = useState("");

  useEffect(() => {
  const fetchArticle = async () => {
    try {
      const response = await axiosClient.get("/admin/articles");
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchArticle();
}, []);


  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosClient.get("/admin/articles/getnotavailable");
        setRequestArticle(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, []);

  const makeAvailable = async (id) => {
    try {
      const response = await axiosClient.put(`/admin/articles/edit/${id}`);
      const updatedArticle = articles.filter((row) => row.id !== id);
      setArticles(updatedArticle);
  
      const updatedDemand = requestArticle.filter((row) => row.id !== id);
      setRequestArticle(updatedDemand);
  
      const response2 = await axiosClient.get("/admin/articles");
      setArticles(response2.data);
  
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };
  

  
  const addService = async () => {
    try {
      const response = await axiosClient.post("/admin/articles/add", {
        name: newArticle
      });
  
      // Make a new request to get the updated list of services
      const updatedServicesResponse = await axiosClient.get("/admin/articles");
      setArticles(updatedServicesResponse.data);
      setNewArticle('')
      return response.data;
    } catch (error) {
      console.error(error);
      return error
    }
  };
  
  const deleteArticle = async (id) => {
  try {
    const response = await axiosClient.delete(`/admin/articles/delete/${id}`);

    // Make new requests to get the updated lists of services and demands
    const updatedServicesResponse = await axiosClient.get("/admin/articles");
    setArticles(updatedServicesResponse.data);

    const updatedDemandsResponse = await axiosClient.get("/admin/articles/getnotavailable");
    setRequestArticle(updatedDemandsResponse.data);

    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

  return (
<>
  <Box sx={{ my: 2, mx: 2, backgroundColor: '#f7fafc', maxHeight: 450, overflow: 'auto' }}>
    <Item sx={{ mt: 0, mx: 0, display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}>
      <TextField sx={{ width: 300, mx: 2 }} required label="Nom de vêtement " value={newArticle} onChange={(e) => setNewArticle(e.target.value)} />
      <Button variant="outlined" style={{ color: "#fff", borderColor: "#6B46C1", backgroundColor: "#6B46C1" }} sx={{ height: 40 }} onClick={addService}>
        Ajouter
      </Button>
    </Item>
  </Box>

  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} sx={{ minWidth: 1050, maxHeight: 390 }}>
    <Box gridColumn="span 6" sx={{ my: 2, mx: 2, backgroundColor: '#f7fafc', maxHeight: 350, overflow: 'auto' }}>
      <Item sx={{ mt: 0, mx: 0, position: "sticky",zIndex:50, top: 0, backgroundColor: '#6B46C1', color: '#fff' }}>
        <Typography sx={{}}>Liste de vêtements :</Typography>
      </Item>

      {articles.map((article) => (
        <Item key={article.id} sx={{ my: 2, mx: 1, backgroundColor: '#fff', color: '#000', display: 'flex', alignItems: 'center' }}>
          <div>{article.name}</div>
          <IconButton onClick={() => deleteArticle(article.id)} sx={{ color: '#8B5CF6', marginLeft: 'auto' }}><DeleteIcon /></IconButton>
        </Item>
      ))}

    </Box>

    <Box gridColumn="span 6" sx={{ my: 2, mx: 2, backgroundColor: '#f7fafc', maxHeight: 350, overflow: 'auto' }}>
      <Item sx={{ mt: 0, mx: 0, position: "sticky",zIndex:50, top: 0, backgroundColor: '#6B46C1', color: '#fff' }}>
        <Typography sx={{}}>Les demandes :</Typography>
      </Item>
      {requestArticle.map((row) => (
        <Item key={row.id} sx={{ my: 2, mx: 1, px: 2, backgroundColor: '#fff', color: '#000', display: 'flex', alignItems: 'center' }}>
          <div>{row.name}</div>
          <IconButton onClick={() => makeAvailable(row.id)} sx={{ marginLeft: 'auto', color: '#34D399' }}><DoneIcon /></IconButton>
          <IconButton onClick={() => deleteArticle(row.id)} sx={{ color: '#EF4444' }}><ClearIcon /></IconButton>
        </Item>
      ))}
    </Box>

  </Box>
</>



  )
}

export default Articles

