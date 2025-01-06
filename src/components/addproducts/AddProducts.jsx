import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Divider } from '@mui/material';
import CardList from './CardList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../stores/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(1),
  gap: theme.spacing(2),
}));

const TableContainerWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const CardsContainerWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const AddProducts = ({ Back }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const total = items
    .reduce((pre, cur) => pre + Number(cur.addNumber) * Number(cur.price), 0)
    .toFixed(2);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <TableContainerWrapper>
        <Header>
          <Typography variant="h5" gutterBottom>
            Shopping Cart
          </Typography>
          <Box>
            <IconButton onClick={Back} aria-label="go back">
              <ArrowBackIcon />
              <Typography> Back to Shop</Typography>
            </IconButton>
            <IconButton aria-label="delete" onClick={handleClearCart}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Header>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.addNumber}</TableCell>
                  <TableCell>${item.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  Total:
                </TableCell>
                <TableCell>${total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TableContainerWrapper>
      <CardsContainerWrapper>
        <Box mb={2}>
          <Divider />
        </Box>
        {items.map((item) => (
          <CardList
            key={item.id}
            item={item}
            setAddedItem={() => {}}
            itemsArr={items}
          />
        ))}
      </CardsContainerWrapper>
    </Container>
  );
};

export default AddProducts;
