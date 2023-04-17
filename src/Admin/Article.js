import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button,Container,Modal,Typography,Box, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
function Article() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ouvrir, setOuvrir] = React.useState(false);
  const handleOuvrir = () => setOuvrir(true);
  const handleFermer = () => setOuvrir(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get("/admin/articles/show");
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axiosClient.post('/admin/articles/add', {
        name: newArticle,
      });
      setArticles([...articles,newArticle ]);
      setNewArticle("")
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateArticle = async (id, data) => {
    try {
      const response = await axiosClient.put(`/admin/articles/edit/${id}`, data);
      return setArticles(response.data)
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Container sx={{ display: 'flex', height: '100vh' }}>

       <TableContainer component={Paper} sx={{mr:3}}>
      <Table sx={{ minWidth: 950 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nom</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((a) => (
            <TableRow
              key={a.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center" >
                {a.name}
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" size="small" onClick={handleOuvrir}>
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h4" sx={{mb:4}} >
            Ajouter nouveau article :
          </Typography>
          <TextField
          value={newArticle} onChange={(e) => setNewArticle(e.target.value)}
          sx={{mr:2}}
          required
          label="Nom d'article"
        />
        <Button onClick={(e) => {
            handleSubmit(e);
            handleClose();
          }} variant="contained">
          Ajouter
        </Button>
        </Box>
      </Modal>
    </div>
    <div>
      <Modal
        open={ouvrir}
        onClose={handleFermer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h4" sx={{mb:4}} >
            Modifier
          </Typography>
          <TextField
          value={newArticle} onChange={(e) => setNewArticle(e.target.value)}
          sx={{mr:2}}
          required
          label="Nom d'article"
        />
        <Button onClick={(e) => {
            updateArticle(e);
            handleFermer();
          }} variant="contained">
          Modifier
        </Button>
        </Box>
      </Modal>
    </div>
    <Button onClick={handleOpen} variant="contained" size="medium" sx={{ mb: 2,mt: 2, display: 'flex', justifyContent: 'center' }}>
        Ajouter
     </Button>
   
    </Container>
  );
}

export default Article;
