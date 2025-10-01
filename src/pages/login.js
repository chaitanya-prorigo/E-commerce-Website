import React, { useState } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { handleLogin } from '../services/authenticate';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })

    const handleValue = (e) => {
        const { name, value } = e.target
        setCredentials({
            ...credentials,
            [name]: value
        }
        )
    }

    const [error, setError] = useState("")

    const handleChange = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const data = await handleLogin(credentials);
            console.log("Login success: ", data)
            navigate('/product')
        }
        catch (error) {
            console.error("Login error", error.message)
            setError(error.message)
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color='success'>
                    <Toolbar variant="dense" sx={{ alignItems: 'center' }}>
                        <Typography variant="h5" color="inherit" component="div" >
                            E-Commerce
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container maxWidth="false" className="background-image">
                <Container
                    maxWidth="sm"
                    style={{
                        height: "100vh",
                        alignItems: "center",
                        display: "flex",
                        opacity: 1,
                    }}
                >
                    <Card>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "25px",
                            }}
                        >
                            <Typography component="div" variant="h4">
                                SignIn Page
                            </Typography>
                        </CardContent>

                        <CardContent>
                            <form onSubmit={handleChange}>
                                <Box
                                    sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
                                >
                                    <TextField
                                        id="outlined-username-input"
                                        label="User Name"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleValue}

                                    />
                                    <TextField
                                        id="outlined-password-input"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleValue}

                                    />
                                    {error && (<Typography color='error' variant='body2'>{error}</Typography>)}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 2, mb: 1 }}
                                        color='success'
                                    >
                                        Login
                                    </Button>
                                </Box>
                            </form>
                        </CardContent>

                    </Card>
                </Container>
            </Container>
        </>
    )
}

export default Login
