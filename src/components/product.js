import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/api';
import { Button, Card, CardMedia} from '@mui/material';
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from '@mui/material/CardActionArea';
import Header from '../layout/Header/header';
import Box from '@mui/material/Box';
import { useCart } from '../context/CartContext'

const Product = () => {
    const [products, setProducts] = useState([])
    
    const {addToCart} = useCart();

    
    useEffect(() => {
        loadProducts()
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data)
    }

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
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                                <Typography variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${product.price}
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: 2,
                                    marginTop: 'auto'
                                }}>
                                    <Button variant="contained" onClick={()=> addToCart(product)} sx={{ width: '48%' }} >
                                        Add
                                    </Button>
                                    
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}

            </Box>
        </>
    )
}

export default Product
