import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../layout/Header/header'
import { useCart } from '../context/CartContext'

const CartItems = () => {
  const {cartItems} = useCart();
  
  const checkout = () => {
        console.log("Proceeding to checkout...");
    };

const total = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,0
)

  return (
    <>
    <Header/>
    <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
                            <Typography variant="body1">{item.title}</Typography>
                            <Typography variant="body2">${item.price} x {item.quantity}</Typography>
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
