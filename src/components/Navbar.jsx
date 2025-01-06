import React from 'react';
import { AppBar, Toolbar, Typography, Button as MUIButton, Divider, TextField, InputAdornment } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../stores/authSlice';
import { styled } from '@mui/material/styles';

const StyledIcon = styled(ShoppingCartIcon)({
  fontSize: 40,
  cursor: 'pointer',
});

const ToolbarContainer = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',

});

const CartInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Navbar = ({ num, click, searchValue, onSearchChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <AppBar position="static">
      <ToolbarContainer>
        <Typography variant="h4">
          Shopify
        </Typography>
        
        <TextField
        
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
        borderRadius:'4px',
          '& fieldset': {
            borderColor: '#fff',
          },
          '&:hover fieldset': {
            borderColor: '#9dc8fb',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#fff',
          },
        },
        '& .MuiInputBase-input': {
          backgroundColor: '#FFFFFF',
          borderRadius:'3px'

        },
      }}
      InputProps={{
        endAdornment: (
          <>
            <Divider orientation="vertical" flexItem sx={{ borderColor: '#fff' }} />
            <InputAdornment position="end">
             
                <SearchIcon />
             
            </InputAdornment>
            
          </>
        ),
      }}
      size="small"
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search Shopify"
    />
      <div style={{ display: 'flex' }}>
          <CartInfo>
            <StyledIcon onClick={() => click(true)} color="inherit" />
            <Typography variant="body1">
              Added {num} {num === 0 ? 'item' : 'items'}
            </Typography>
          </CartInfo>
          <Divider orientation="vertical" flexItem sx={{ marginX: 2, mt: 0, height: 40, borderWidth: 1, borderColor: '#D3D3D3' }} />
          <MUIButton color="inherit" onClick={handleLogout} sx={{ mt: 0 }}>
            Logout
          </MUIButton>
        </div>
      </ToolbarContainer>
    </AppBar>
  );
};

export default Navbar;
