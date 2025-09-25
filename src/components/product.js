import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/api';
import { Button, Card, CardMedia} from '@mui/material';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Header from '../layout/Header/header';
import Box from '@mui/material/Box';
import { useCart } from '../context/CartContext'

const Product = () => {
    const [products, setProducts] = useState([])
    
    const {cartItems, addToCart, removeSingleItem} = useCart();

    
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

   


    return (
        <>
            <Header />
            
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))',
                    gap: 2,
                    margin: '10px',
                }}
            >
                {products.map((product) =>

                    <Card key={product.id} sx={{ height: '450px' }}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.title}
                                sx={{
                                    width: '100%',
                                    height: 200,
                                    objectFit: 'cover'
                                }}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${product.price}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2}}>
                                    {getProductQuantity(product.id) > 0 && (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignContent:'center' }}>
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
                                    marginTop: 'auto',
                                    position:'absolute'
                                }}>

                                    <Box sx={{ display: 'flex', gap: 2}}>
                                    <Button variant="contained" onClick={()=> addToCart(product)} sx={{ width: '48%' }} >
                                        Add
                                    </Button>
                                    <Button variant="contained" color='error' onClick={()=> removeSingleItem(product)} sx={{ width: '48%' }} >
                                        Delete
                                    </Button>
                                    
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Card>
                )}

            </Box>
        </>
    )
}

export default Product
