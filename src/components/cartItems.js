import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Header from '../layout/Header/header'
import { useCart } from '../context/CartContext'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const CartItems = () => {
  const { cartItems, removeItem } = useCart();

  const checkout = () => {
    console.log("Proceeding to checkout...");
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  )

  return (
    <>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <Typography variant="body1">{item.title}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>${item.price} x {item.quantity}</Typography>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit" onClick={() => removeItem(item.id)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">Total: ${total}</Typography>
              <Button variant="contained" color='success' onClick={checkout}>Checkout</Button>
            </Box>
          </>
        ) : (
          <Typography variant="h6">Your cart is empty!</Typography>
        )}
      </Box>
    </>
  )
}

export default CartItems
