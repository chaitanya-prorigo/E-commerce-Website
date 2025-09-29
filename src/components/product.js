import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/api';
import { Button, Card, CardMedia } from '@mui/material';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Header from '../layout/Header/header';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useCart } from '../context/CartContext'
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([])
    const { searchTerm } = useSearch();

    const navigate = useNavigate();

    const { cartItems, addToCart, removeSingleItem } = useCart();

    useEffect(() => {
        loadProducts()
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data)
    }

    const getProductQuantity = (productId) => {
        const item = cartItems.find((item) => item.id === productId);
        return item ? item.quantity : 0;
    };

    const filteredProducts = products.filter(
        (product) => product?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    )

    const buttons = (product) => {
        const quantity = getProductQuantity(product.id)
        if (quantity === 0) {
            return (
                <Stack >
                    <Button variant="contained" onClick={() => addToCart(product)} sx={{ width: '450%' }}>
                        Add
                    </Button>
                </Stack>
            )
        }
        else if (quantity === 1) {
            return (
                <Stack spacing={1} >
                    <Button variant="contained" onClick={() => addToCart(product)} sx={{ width: '450%' }} >
                        Add
                    </Button>
                    <Button variant="contained" color='success' onClick={() => navigate('/cart')} sx={{ width: '450%' }} >
                        Cart
                    </Button>
                </Stack>
            )
        }
        else if (quantity > 1) {
            return (
                <Stack spacing={1}>
                    <Button variant="contained" onClick={() => addToCart(product)} sx={{ width: '185%' }} >
                        Add
                    </Button>
                    <Stack direction="row" spacing={1} sx={{ width: '185%' }}>
                        <Button variant="contained" color='success' onClick={() => navigate('/cart')} sx={{ width: '140%' }}>
                            Cart
                        </Button>
                        <Button variant="contained" color='error' onClick={() => removeSingleItem(product)} sx={{ width: '140%' }}>
                            Remove
                        </Button>
                    </Stack>
                </Stack>
            )
        }
    }
    return (
        <>
            <Header />

            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(350px, 100%), 1fr))',
                    gap: 2,
                    margin: '10px',
                    backgroundColor: 'rgba(128, 128, 128, 0.5)'
                }}
            >
                {filteredProducts.length > 0 ? filteredProducts.map((product) =>

                    <Card key={product.id} sx={{ height: '500px' }}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.title}
                                sx={{
                                    width: '100%',
                                    height: 250,
                                    objectFit: 'cover',
                                    marginTop: '5px'
                                }}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                {product.title.length < 50 ? <Typography variant="h6" component="div">
                                    {product.title}
                                </Typography> :
                                    <Typography variant="h6" component="div">
                                        {product.title.slice(0, 49)} ...
                                    </Typography>
                                }
                                <Typography variant="body2" color="text.secondary">
                                    ${product.price}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {getProductQuantity(product.id) > 0 && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="body1">
                                                Qty: {getProductQuantity(product.id)}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: 2,
                                    position: 'absolute',
                                    marginTop: 'auto',
                                }}>
                                    {buttons(product)}
                                </Box>
                            </CardContent>
                        </Card>
                    </Card>
                ) : (
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            width: '200vh'
                        }}
                    >
                        <Typography variant='h4'>No Products Found.</Typography>
                    </Box>)}

            </Box>
        </>
    )
}

export default Product
