import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Stack,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Button,
  Modal,
  Box,
} from '@mui/material';
import axiosClient from '../axios';

function Factures() {
  const [factures, setFactures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('Numéro');
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [idState, setId] = useState(null);

  useEffect(() => {
    async function fetchFactures() {
      try {
        const response = await axiosClient.get('/pressing/facture/all');
        setFactures(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFactures();
  }, []);

  const markFactureAsPaid = async (id) => {
       await axiosClient.put(`/pressing/facture/${id}`);
      const updatedFactures = factures.map((facture) => {
        if (facture.id === id) {
          return {
            ...facture,
            status: 'payé',
          };
        }
        return facture;
      });
      setFactures(updatedFactures);
      closePaymentModal();
      
      
  };

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filteredFactures = factures.filter((facture) => {
    if (searchQuery === null) {
      return true;
    }
  
    if (searchBy === 'Numéro') {
      return facture.numero.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchBy === 'CIN') {
      return facture.client.cin.toString().includes(searchQuery.toString());
    }
  
    return true;
  });
  

  const getOptionList = () => {
    switch (searchBy) {
      default:
        return [];
    }
  };

  const openModal = (facture) => {
    setSelectedFacture(facture);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePayment = (id) => {
    setId(id)
    setPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  const imprimer = () => {
    const content = document.getElementById('print-content');
    const windowObject = window.open('', '_blank', 'width=800,height=600');
    windowObject.document.write('<html><head>');
    windowObject.document.write('<title>Facture</title>');
    windowObject.document.write('</head><body>');
    windowObject.document.write(content.innerHTML);
    windowObject.document.write('</body></html>');
    windowObject.document.close();
    windowObject.print();
    windowObject.close();
  };


  return (
    <>
      <Typography sx={{ m: 2, mb: 4 }} variant="h5" gutterBottom>
        Liste de factures :
      </Typography>
      <Container sx={{ display: 'flex' }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 100 }}>
          <Autocomplete
            sx={{ minWidth: 200 }}
            freeSolo
            disableClearable
            options={getOptionList()}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Search by ${searchBy}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          />
        </Stack>

        <FormControl sx={{ m: 2 }} variant="outlined" size="small">
          <InputLabel id="search-by-label">Search by</InputLabel>
          <Select
            sx={{ width: 150, height: 55 }}
            labelId="search-by-label"
            id="search-by-select"
            value={searchBy}
            onChange={handleSearchByChange}
            label="Search by"
          >
            <MenuItem value="Numéro">Numéro</MenuItem>
            <MenuItem value="CIN">CIN</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <Grid container sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <Grid container sx={{ p: 2 }}>
            <Grid item xs={2}>
              <Typography variant="subtitle1">Numéro de facture</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" align="center">
                Nom du client
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" align="center">
                CIN
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" align="center">
                Status
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" align="center">
                Action
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {filteredFactures.map((row) => (
              <Grid key={row.id} item xs={12}>
                <Grid container sx={{ p: 2 }} alignItems="center">
                  <Grid item xs={2}>
                    <Typography>{row.numero}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="center">{row.client.first_name}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="center">{row.client.cin}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="center">
                      {row.status === 'non payé' ? (
                        <Button variant="contained" onClick={() => handlePayment(row)}>
                          non payé
                        </Button>
                      ) : (
                        <Typography style={{ backgroundColor: '#d0e7b7' }}>payé</Typography>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="center">
                      <Button variant="outlined" onClick={() => openModal(row)}>Détails</Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          id="print-content"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Détails de facture :</Typography>
          {selectedFacture && (
            <div>
              <Typography>
                Numéro Facture: {selectedFacture.numero}
              </Typography>
              <Typography>
                Nom du client: {selectedFacture.client.first_name}
              </Typography>
              <Typography>
                CIN: {selectedFacture.client.cin}
              </Typography>
              <Typography>
                Etat: {selectedFacture.status}
              </Typography>
              <Typography>
                Nom du pressing: {selectedFacture.pressing.pressing_name}
              </Typography>
              <Typography>
                quantité: {selectedFacture.commande.quantity}
              </Typography>
              <Typography>
                Prix Total: {selectedFacture.commande.total_price} DT
              </Typography>
              <Button variant='outlined' sx={{ mt: 3 ,'@media print': {
                display: 'none',
              },}} onClick={imprimer}>
                Imprimer
              </Button>
            </div>
          )}
          <Button
            variant='outlined'
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              '@media print': {
                display: 'none',
              },
            }}
            onClick={closeModal}
          >
            X
          </Button>
        </Box>
      </Modal>

      <Modal open={paymentModalOpen} onClose={closePaymentModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Paiement de facture :</Typography>
          {idState && (
            <Typography variant="body1">
              Numéro de Facture: {idState.numero}<br/>
              Etat: {idState.status}<br/>
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => {markFactureAsPaid(idState.id)}}
          >
            Payer
          </Button>
          <Button
            variant="outlined"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            onClick={closePaymentModal}
          >
            X
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Factures;
