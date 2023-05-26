import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosClient from '../axios';
import { Navigate } from 'react-router';
import { UserStateContext } from '../Contexts/ContextProvider';
import * as yup from 'yup';
import { FormHelperText } from '@mui/material';

const theme = createTheme();


export default function SingUP() {
  const [formErrors, setFormErrors] = useState({});

  const schema = yup.object().shape({
    pressing_name: yup.string().required('Name is required'),
    tva: yup.number().required('TVA is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    postal_code: yup.number().required('Postal code is required'),
    phone: yup.number().min(8, 'Phone must be at least 8 numbers').required('Phone number is required'),
    cin: yup.number().min(8, 'CIN must be at least 8 numbers').required('CIN number is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });
  

  const initialFormData = {
    role: 'pressing',
    cin: '',
    phone: '',
    password: '',
    address: '',
    city: '',
    country: '',
    postal_code: '',
    pressing_name: '',
    tva: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const { userToken } = UserStateContext();    
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };

      
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    await schema.validate(formData, { abortEarly: false });
    await axiosClient.post('/register', formData);

    console.log('Registration successful');
    // Reset form state
    setFormData(initialFormData);
    window.location.href = "/login";
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
    } else {
      console.log('An error occurred:', error);
    }
  }
};


      if (userToken) {
        return <Navigate to="/admin" />
      }

      
      
  return (
<ThemeProvider theme={theme}>
<Container component="main" maxWidth="xs" sx={{ width:800,display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="pressingname"
                label="Nom de pressing"
                name="pressing_name"
                autoFocus
                value={formData.pressing_name}
                onChange={handleChange}
                error={!!formErrors.pressing_name}
              />
              {formErrors.pressing_name && (
                  <FormHelperText error>{formErrors.pressing_name}</FormHelperText>
                )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                id="tva"
                label="TVA"
                name="tva"
                autoComplete="family-name"
                value={formData.tva}
                onChange={handleChange}
                error={!!formErrors.tva}
              />
              {formErrors.tva && (
                  <FormHelperText error>{formErrors.tva}</FormHelperText>
                )}
            </Grid>
            {/* <Grid item xs={12}>
              
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address-line1"
                  value={formData.address}
                  onChange={handleChange}
                  error={!!formErrors.address}
                />
                {formErrors.address && (
                  <FormHelperText error>{formErrors.address}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="family-name"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!formErrors.city}
                />
                {formErrors.city && (
                  <FormHelperText error>{formErrors.city}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="family-name"
                  value={formData.country}
                  onChange={handleChange}
                  error={!!formErrors.country}
                />
                {formErrors.country && (
                  <FormHelperText error>{formErrors.country}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="postal-code"
                  label="Postal code"
                  name="postal_code"
                  type="number"
                  autoComplete="family-name"
                  value={formData.postal_code}
                  onChange={handleChange}
                  error={!!formErrors.postal_code}
                />
                {formErrors.postal_code && (
                  <FormHelperText error>{formErrors.postal_code}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  type="number"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!formErrors.phone}
                />
                {formErrors.phone && (
                  <FormHelperText error>{formErrors.phone}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cin"
                label="CIN"
                name="cin"
                type="number"
                autoComplete="family-name"
                value={formData.cin}
                onChange={handleChange}
              />
                {formErrors.cin && (
                  <FormHelperText error>{formErrors.cin}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                />
                {formErrors.password && (
                  <FormHelperText error>{formErrors.password}</FormHelperText>
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

