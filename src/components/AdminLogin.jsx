import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link as MuiLink, Snackbar } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { Link } from 'react-router-dom';
import ShopPics from './ShopPics.jpg';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { passwordRegExp } from './utils';
import Alert from '@mui/material/Alert';
import { adminLogin } from '../stores/authSlice';

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').matches(
    passwordRegExp, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character'
  )
});

const AdminLogin = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin-dashboard'); // Redirect to admin dashboard if logged in
    }
  }, [isAdmin, navigate]);

  const onSubmit = (data) => {
    const DEFAULT_EMAIL = 'admin@example.com';
    const DEFAULT_PASSWORD = 'Password@123';

    if (data.email === DEFAULT_EMAIL && data.password === DEFAULT_PASSWORD) {
      dispatch(adminLogin());
      setSuccessMessage('Successfully logged in!');
      reset();
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{
        height: '100vh',
        backgroundImage: `url(${ShopPics})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Paper elevation={10} style={{ padding: 30, height: '65vh', width: 250, margin: "20px auto" }}>
        <Grid container direction="column" alignItems="center">
          <Avatar style={{ backgroundColor: '#3eb9f1' }}>
            <LockPersonOutlinedIcon />
          </Avatar>
          <Typography variant="h4" gutterBottom>Admin Login</Typography>
        </Grid>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='E-Mail'
                variant="filled"
                placeholder='Enter Admin Email'
                fullWidth
                required
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Password'
                variant="filled"
                type='password'
                placeholder='Enter Admin Password'
                fullWidth
                required
                margin="normal"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          <Button
            type='submit'
            color='primary'
            variant='contained'
            fullWidth
            style={{ marginTop: 16 }}
          >
            Login
          </Button>
        </form>
        <Typography style={{ marginTop: 16 }}>
          Not an admin?
          <Link to='/login' style={{ marginLeft: 4, textDecoration: 'none' }}>
            <MuiLink>Back to Sign In</MuiLink>
          </Link>
        </Typography>
      </Paper>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert elevation={6} variant="filled" onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
        <Alert elevation={6} variant="filled" onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AdminLogin;
