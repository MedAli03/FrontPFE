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




function Services() {

  const [services, setServices] = useState([]);
  const [requestService, setRequestService] = useState([]);
  const [newService, setNewService] = useState("");

  useEffect(() => {
  const fetchServices = async () => {
    try {
      const response = await axiosClient.get("/admin/getservice");
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchServices();
}, []);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosClient.get("/admin/servicenotavailable");
        setRequestService(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  const makeAvailable = async (id) => {
    try {
      const response = await axiosClient.put(`/admin/accepte/${id}`);
      const updatedService = services.filter((row) => row.id !== id);
      setServices(updatedService);
  
      const updatedDemand = requestService.filter((row) => row.id !== id);
      setRequestService(updatedDemand);
  
      const response2 = await axiosClient.get("/admin/getservice");
      setServices(response2.data);
  
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  };
  

  
  const addService = async () => {
    try {
      const response = await axiosClient.post("/admin/addservice", {
        name: newService
      });
  
      // Make a new request to get the updated list of services
      const updatedServicesResponse = await axiosClient.get("/admin/getservice");
      setServices(updatedServicesResponse.data);
      setNewService('')
      return response.data;
    } catch (error) {
      console.error(error);
      return error
    }
  };
  
  const deleteService = async (id) => {
  try {
    const response = await axiosClient.delete(`/admin/delete/${id}`);

    // Make new requests to get the updated lists of services and demands
    const updatedServicesResponse = await axiosClient.get("/admin/getservice");
    setServices(updatedServicesResponse.data);

    const updatedDemandsResponse = await axiosClient.get("/admin/servicenotavailable");
    setRequestService(updatedDemandsResponse.data);

    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

  return (
    <>
  <Box sx={{ my: 2, mx: 2, backgroundColor: '#f5f5f5', maxHeight: 450, overflow: 'auto' }}>
    <Item sx={{ mt: 0, mx: 0, display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}>
     <TextField sx={{ width: 300, mx: 2 }} required label="Nom de service" value={newService} onChange={(e) => setNewService(e.target.value)} />
          <Button variant="outlined" style={{ color: "#fff", borderColor: "#3f51b5", backgroundColor: "#3f51b5" }} sx={{ height: 40 }} onClick={addService}>
            Ajouter
          </Button>

    </Item>
  </Box>

  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} sx={{ minWidth: 1050, maxHeight: 390 }}>
    <Box gridColumn="span 6" sx={{ my: 2, mx: 2, backgroundColor: '#f5f5f5', maxHeight: 350, overflow: 'auto' }}>
      <Item sx={{ mt: 0, mx: 0, position: "sticky",zIndex:50, top: 0, backgroundColor: '#3f51b5', color: '#fff' }}>
        <Typography sx={{}}>Liste de services :</Typography>
      </Item>

      {services.map((service) => (
        <Item key={service.id} sx={{ my: 2, mx: 1, backgroundColor: '#fff', color: '#000', display: 'flex', alignItems: 'center' }}>
          <div>{service.name}</div>
          <IconButton onClick={() => deleteService(service.id)} sx={{ color: '#a73a38', marginLeft: 'auto' }}><DeleteIcon /></IconButton>
        </Item>
      ))}

    </Box>

    <Box gridColumn="span 6" sx={{ my: 2, mx: 2, backgroundColor: '#f5f5f5', maxHeight: 350, overflow: 'auto' }}>
      <Item sx={{ mt: 0, mx: 0, position: "sticky",zIndex:50, top: 0, backgroundColor: '#3f51b5', color: '#fff' }}>
        <Typography sx={{}}>Les demandes :</Typography>
      </Item>
      {requestService.map((row) => (
        <Item key={row.id} sx={{ my: 2, mx: 1, px: 2, backgroundColor: '#fff', color: '#000', display: 'flex', alignItems: 'center' }}>
          <div>{row.name}</div>
          <IconButton onClick={() => makeAvailable(row.id)} sx={{ marginLeft: 'auto', color: '#47824a' }}><DoneIcon /></IconButton>
          <IconButton onClick={() => deleteService(row.id)} sx={{ color: '#a73a38' }}><ClearIcon /></IconButton>
        </Item>
      ))}
    </Box>

  </Box>
</>

  )
}

export default Services