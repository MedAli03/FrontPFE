import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button,Container } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
function Article() {
  const [articles, setArticles] = useState([]);

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

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosClient.post('/admin/articles/add', {
//         name: articles,
//       });
//       console.log(response.data);
//       setArticles('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

  

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
          {articles.map((articles) => (
            <TableRow
              key={articles.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {articles.name}
              </TableCell>
              <TableCell align="center">
              <Button variant="contained" size="small"><EditIcon /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="contained" size="medium" sx={{ mb: 2,mt: 2, display: 'flex', justifyContent: 'center' }}>
        Ajouter
     </Button>
    </Container>
  );
}

export default Article;
