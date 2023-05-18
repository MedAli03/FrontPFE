import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import axiosClient from '../axios';
function Settings() {

    const [admin, setAdmin] = useState(null);
    const getAdmin = async (id) => {
        try {
          const response = await axiosClient.get(`/admin/user/${id}`);
          setAdmin(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        getAdmin();
      }, []);

      
    return (
        <React.Fragment>
        <Container sx={{px:3,py:2 }}>
          <Typography variant="h6" gutterBottom>
            Information personnel :
          </Typography>
          <Grid container spacing={3} >
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phone"
                name="phone"
                label="Telephone"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="codepostal"
                name="codepostal"
                label="Code Postal"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="adress"
                name="adress"
                label="Adress"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
              
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="ville"
                name="ville"
                label="Ville"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="region"
                name="region"
                label="Région"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Button style={{marginTop:20 ,marginLeft:20}} variant='contained'>Modifier</Button>
          </Grid>
          </Container>
        </React.Fragment>
      );
}

export default Settings