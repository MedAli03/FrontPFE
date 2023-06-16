import React, { useEffect, useState } from 'react';
import axiosClient from '../axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal } from '@mui/material';
import {
  Typography,
  Stack,
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from '@mui/material';

function Commandes() {
  const [commands, setCommands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('Nom');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [idState, setId] = useState();

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setId(undefined);
    setOpen(false);
  };

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await axiosClient.get('/pressing/commande');
        console.log(response.data);
        setCommands(response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    fetchCommands();
  }, []);

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filteredCommands = commands
    .filter((commande) => {
      if (commande.status !== status) {
        return commande.status === 'en attente';
      }

      if (searchQuery === '') {
        return true;
      }

      if (searchBy === 'Nom') {
        return commande.client.first_name.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchBy === 'CIN') {
        return commande.client.cin.toString().includes(searchQuery.toString());
      }

      return true;
    })
    .filter((commande) => {
      if (status === 'en attente') {
        return commande.status === 'en attente';
      } else if (status === 'en cours') {
        return commande.status === 'en cours';
      } else if (status === 'terminée') {
        return commande.status === 'terminée';
      }
      return true;
    });

  const deleteCommand = () => {
    console.log(idState);
    axiosClient
      .delete(`/pressing/commande/delete/${idState}`)
      .then((response) => {
        console.log(response.data);
        const updatedCommands = commands.map((command) => {
          if (command.id === idState) {
            return {
              status: response.data.status,
            };
          } else {
            return command;
          }
        });
        setCommands(updatedCommands);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFacturer = async (id) => {
    setIsLoading(true);

    try {
      const response = await axiosClient.post(`/pressing/facture/facturer/${id}`);
      // Handle the response or perform any necessary actions
      console.log(response.data);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
    }

    setIsLoading(false);
  };

  const getOptionList = () => {
    switch (searchBy) {
      default:
        return [];
    }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const accepter = (id) => {
    axiosClient
      .put(`/pressing/commande/accepte/${id}`)
      .then((response) => {
        console.log(response.data);
        const updatedCommands = commands.map((command) => {
          if (command.id === id) {
            return {
              ...command,
              status: response.data.status,
            };
          } else {
            return command;
          }
        });
        setCommands(updatedCommands);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const terminer = (id) => {
    axiosClient
      .put(`/pressing/commande/terminer/${id}`)
      .then((response) => {
        console.log(response.data);
        const updatedCommands = commands.map((command) => {
          if (command.id === id) {
            return {
              ...command,
              status: response.data.status,
            };
          } else {
            return command;
          }
        });
        setCommands(updatedCommands);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 20,
    p: 4,
  };

  return (
    <div>
      <Typography sx={{ m: 2, mb: 4 }} variant="h4" gutterBottom>
        Liste de commandes :
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
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              <MenuItem value="Nom">Nom</MenuItem>
              <MenuItem value="CIN">CIN</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ minWidth: 120, marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={'en attente'}>en attente</MenuItem>
                <MenuItem value={'en cours'}>en cours</MenuItem>
                <MenuItem value={'terminée'}>terminée</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Container>
      </Container>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom de Client</TableCell>
              <TableCell align="center">CIN</TableCell>
              <TableCell align="center">quantité</TableCell>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">Prix total</TableCell>
              <TableCell align="center">Etat</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCommands.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.client.first_name}
                </TableCell>
                <TableCell align="center">{row.client.cin}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">
                  {Object.values(row.items).map((item) => (
                    <div>
                      <div>{item.article.name}</div>
                      <div>{item.article.image}</div>
                      <div>
                        {item.selectedServices.map((service) => (
                          <div>
                            <div>{service.name}</div>
                            <div>{service.price}</div>
                            <div>{service.quantity}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TableCell>
                <TableCell align="center">{row.total_price}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.created_at}</TableCell>
                <TableCell align="center">
                  {row.status === 'en attente' && (
                    <div>
                      <Button
                        onClick={() => accepter(row.id)}
                        variant="contained"
                        color="success"
                        sx={{ mr: 1 }}
                      >
                        Accepter
                      </Button>
                      <>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              êtes-vous sûr de refuser cette commande ?
                            </Typography>
                            <Button
                              onClick={() => {
                                deleteCommand();
                                handleClose();
                              }}
                              variant="contained"
                              style={{ backgroundColor: '#8a1c1c' }}
                            >
                              Refuser
                            </Button>
                          </Box>
                        </Modal>
                      </>
                      <Button
                        onClick={() => handleOpen(row.id)}
                        variant="outlined"
                        color="error"
                      >
                        Refuser
                      </Button>
                    </div>
                  )}
                  {row.status === 'en cours' && (
                    <Button
                      onClick={() => terminer(row.id)}
                      variant="contained"
                      style={{ backgroundColor: '#9500ae' }}
                    >
                      Terminer
                    </Button>
                  )}
                  {row.status === 'terminée' && (
                    <Button
                      variant="contained"
                      onClick={() => handleFacturer(row.id)}
                      disabled={isLoading}
                      style={{ backgroundColor: '#f57c00' }}
                    >
                      {isLoading ? 'Loading...' : 'Facturer'}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Commandes;