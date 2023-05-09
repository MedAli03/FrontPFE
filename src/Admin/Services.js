import React, { useState, useEffect } from 'react';
import axiosClient from '../axios'

import { Typography, List, ListItem, ListItemText } from '@mui/material';



function Services() {

  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get('/admin/service/all');
        setServices(response.data.services);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  

  return (
    <div>
    <Typography variant="h3">Services List</Typography>
    <List>
      {services.map((service) => (
        <ListItem key={service.id}>
          <ListItemText primary={service.name} />
        </ListItem>
      ))}
    </List>
  </div>
  )
}

export default Services