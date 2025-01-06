import React from 'react';
import { Button, Typography, Card as MCard , CardMedia, CardContent, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../stores/cartSlice';
import { useNavigate } from 'react-router-dom';



const StyledCard = styled(MCard)( ({
  cursor: 'pointer',
  width: 300,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  objectFit: 'contain',
});



const CardBodyContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TextTypography = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const Card = React.memo(({ productList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  const handleAddItem = (product) => {
    dispatch(addItem(product));
  };

  const handleRemoveItem = (product) => {
    dispatch(removeItem(product));
  };

  const isAdded = (product) => cartItems.some(item => item.id === product.id);

  const handleCardClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <CardBodyContainer>
      <Grid container spacing={2} justifyContent="center">
        {productList.map((product) => (
          <Grid item  key={product.id}>
            <StyledCard onClick={() => handleCardClick(product)}>
              <StyledCardMedia
                component="img"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <TextTypography variant="h6">
                  {product.title}
                </TextTypography>
                <Typography variant="body1">${product.price}</Typography>
                <Button
                  variant="contained"
                  color={isAdded(product) ? 'secondary' : 'primary'}
                  onClick={(e) => {
                    e.stopPropagation();
                    isAdded(product) ? handleRemoveItem(product) : handleAddItem(product);
                  }}
                >
                  {isAdded(product) ? 'Remove from Cart' : 'Add to Cart'}
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </CardBodyContainer>
  );
});

export default Card;
