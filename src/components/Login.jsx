import React, { useEffect, useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link as MuiLink, Snackbar } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { Link, useNavigate } from 'react-router-dom';
import ShopPics from './ShopPics.jpg';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { passwordRegExp } from './utils';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../stores/authSlice';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').matches(
    passwordRegExp, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character'
  ),
});

const Login = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loginError = useSelector(state => state.auth.loginError);

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isAuthenticated) {
      setSuccessMessage('Successfully signed in!');
      setTimeout(() => {
        reset();
        navigate('/home');
      }, 3000); // Delay navigation by 3 seconds to show the success message
    }
  }, [isAuthenticated, navigate, reset]);

  useEffect(() => {
    if (loginError) {
      setErrorMessage(loginError);
    }
  }, [loginError]);

  const onSubmit = (data) => {
    dispatch(login(data));
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
      <Paper elevation={11} style={{ padding: 30, height: '65vh', width: 250, margin: "20px auto" }}>
        <Grid container direction="column" alignItems="center">
          <Avatar style={{ backgroundColor: '#3eb9f1' }}>
            <LockPersonOutlinedIcon />
          </Avatar>
          <Typography variant="h4" gutterBottom>Sign In</Typography>
        </Grid>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='E-Mail'
                placeholder='Enter Your Email'
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
               
                type='password'
                placeholder='Enter Password'
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
            Sign In
          </Button>
        </form>
        <Typography style={{ marginTop: 16 }}>
          Don't have an account?
          <Link to='/signup' style={{ marginLeft: 4, textDecoration: 'none' }}>
            <MuiLink>Sign Up</MuiLink>
          </Link>
        </Typography>
        <Typography style={{ marginTop: 16 }}>
          Admin?
          <Link to='/admin-login' style={{ marginLeft: 4, textDecoration: 'none' }}>
            <MuiLink>Admin Login</MuiLink>
          </Link>
        </Typography>
        <Snackbar open={!!successMessage} autoHideDuration={2000} onClose={() => setSuccessMessage('')}>
          <Alert elevation={6} variant="filled" onClose={() => setSuccessMessage('')} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
          <Alert elevation={6} variant="filled" onClose={() => setErrorMessage('')} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Grid>
  );
};

export default Login;
