import React, { useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Navbar from './Navbar';
import AddProducts from './addproducts/AddProducts';
import Card from './card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../stores/productsSlice';

const Home = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [showOnlyAddedItems, setShowOnlyAddedItems] = React.useState(false);

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  const addedItems = useSelector(state => state.cart.items);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredItems = products.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleShowAddedItems = () => {
    setShowOnlyAddedItems(true);
  };

  const handleBack = () => {
    setShowOnlyAddedItems(false);
  };

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) return ("Go Back!!! Don't try to get in without Authentication. Please put your email and password in Login page.");

  return (
    <div>
      <Navbar
        num={addedItems.length}
        click={handleShowAddedItems}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ padding: 2 }}
      >
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && <Typography color="error">Error: {error}</Typography>}
        {status === 'succeeded' && (
          <>
            {showOnlyAddedItems ? (
              <>
                <AddProducts Back={handleBack}/>
              </>
            ) : (
              <Card
                productList={filteredItems}
              />
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default Home;
