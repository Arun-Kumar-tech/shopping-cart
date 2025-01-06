import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link as MuiLink, Snackbar } from '@mui/material';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { Link, useNavigate } from 'react-router-dom';
import ShopPics from './ShopPics.jpg';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { passwordRegExp } from './utils';
import Alert from '@mui/material/Alert';
import { signUp } from '../stores/authSlice';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').matches(
    passwordRegExp, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character'
  ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(signUp({ email: data.email, password: data.password }));
    setSuccessMessage('Successfully signed up!');
    reset();
    navigate("/login");
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
      <Paper elevation={10} style={{ padding: 30, height: '70vh', width: 300, margin: "20px auto" }}>
        <Grid container direction="column" alignItems="center">
          <Avatar style={{ backgroundColor: '#3eb9f1' }}>
            <LockPersonOutlinedIcon />
          </Avatar>
          <Typography variant="h4" gutterBottom>Sign Up</Typography>
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
                variant="filled"
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Confirm Password'
                variant="filled"
                type='password'
                placeholder='Confirm Password'
                fullWidth
                required
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
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
            Sign Up
          </Button>
        </form>
        <Typography style={{ marginTop: 16 }}>
          Already have an account?
          <Link to='/login' style={{ marginLeft: 4, textDecoration: 'none' }}>
            <MuiLink>Sign In</MuiLink>
          </Link>
        </Typography>
      </Paper>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
        <Alert elevation={6} variant="filled" onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignUp;
