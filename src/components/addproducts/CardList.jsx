import React from "react";
import { Box, Button, Typography, IconButton, Divider } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { updateItemQuantity, removeItem } from '../../stores/cartSlice'; 

const CardListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', // Stack items vertically
  width: '100%', 
  maxWidth: 500, 
  height: 'auto',
  padding: theme.spacing(2),
  border: '1px solid #6a5acd',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  position: 'relative',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1, // Take available space
  display: 'flex',
  flexDirection: 'column',
  paddingRight: theme.spacing(7), // Space for the delete icon
}));

const Image = styled('img')(({ theme }) => ({
  width: '100px',
  height: '100px',
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2), // Add margin below the image
}));

const QuantityControl = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& > button': {
    minWidth: '40px',
    height: '40px',
    margin: theme.spacing(0, 1),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const Footer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: theme.spacing(1),
}));

const CardList = ({ item }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleIncrease = () => {
    dispatch(updateItemQuantity({ id: item.id, addNumber: item.addNumber + 1 }));
  };

  const handleDecrease = () => {
    if (item.addNumber > 1) {
      dispatch(updateItemQuantity({ id: item.id, addNumber: item.addNumber - 1 }));
    }
  };

  const handleRemove = () => {
    document.querySelector(".card-list-body").classList.add("animate");
    setTimeout(() => dispatch(removeItem(item)), 200);
  };

  return (
    <CardListContainer className="card-list-body">
      <Image src={item.image} alt={item.title} />
      <ContentContainer>
        <Title variant="h6" noWrap>
          {item.title}
        </Title>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">Price: ${item.price}</Typography>
        <QuantityControl>
          <Button
            variant="contained"
            onClick={handleIncrease}
          >
            +
          </Button>
          <Typography variant="body2">{item.addNumber}</Typography>
          <Button
            variant="outlined"
            onClick={handleDecrease}
          >
            -
          </Button>
        </QuantityControl>
      </ContentContainer>
      <Footer>
        <IconButton
          color="error"
          onClick={handleRemove}
        >
          <DeleteIcon />
        </IconButton>
      </Footer>
    </CardListContainer>
  );
};

export default CardList;
