import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const DetailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(5),
  margin: theme.spacing(2),
}));

const Image = styled('img')(({ theme }) => ({
  width: '550px',
  height: '400px',
  objectFit: 'cover',
  marginRight: theme.spacing(2),
}));

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector(state => state.products.items.find(p => p.id === parseInt(id)));

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Button onClick={() => navigate(-1)} variant="contained" color="primary">
        Back
      </Button>
      <DetailContainer>
        <Image src={product.image} alt={product.title} style={{objectFit:'contain'}}/>
        <Box>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="h6">{product.category}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5">Price: ${product.price}</Typography>
        </Box>
      </DetailContainer>
    </Paper>
  );
};

export default ProductDetail;
