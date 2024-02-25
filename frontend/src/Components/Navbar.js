import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo.png';
import {Link, useNavigate} from "react-router-dom";

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
    borderRadius: '999px',
};

function Navbar({mode}) {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = useState(sessionStorage.getItem("token"))
    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
    }, [sessionStorage.getItem("token")])

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleLogout = () => {

        sessionStorage.clear();
        navigate("/")
    }

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({behavior: 'smooth'});
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <img
                                src={logo} // Use the imported logo
                                style={logoStyle}
                                alt="logo of Scrap"
                            />

                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <Link to={"/quiz"}>
                                    <MenuItem
                                        sx={{py: '6px', px: '12px'}}
                                    >
                                        <Typography variant="body2" color="text.primary">
                                            Quiz
                                        </Typography>
                                    </MenuItem>
                                </Link>
                                {/*<MenuItem*/}
                                {/*  onClick={() => scrollToSection('highlights')}*/}
                                {/*  sx={{ py: '6px', px: '12px' }}*/}
                                {/*>*/}
                                {/*  <Typography variant="body2" color="text.primary">*/}
                                {/*    Features*/}
                                {/*  </Typography>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem*/}
                                {/*  onClick={() => scrollToSection('path')}*/}
                                {/*  sx={{ py: '6px', px: '12px' }}*/}
                                {/*>*/}
                                {/*  <Typography variant="body2" color="text.primary">*/}
                                {/*    Scrap AI*/}
                                {/*  </Typography>*/}
                                {/*</MenuItem>*/}
                            </Box>
                        </Box>
                        {!token &&
                            <Box
                                sx={{
                                    display: {xs: 'none', md: 'flex'},
                                    gap: 0.5,
                                    alignItems: 'center',
                                }}
                            >
                                <Link to={"/signin"}>
                                    <Button
                                        color="primary"
                                        variant="text"
                                        size="medium"
                                        sx={{
                                            borderRadius: 2, // Adjust the border radius for curved edges
                                            color: 'black', // Text color
                                        }}
                                    >
                                        <Typography variant="body2"
                                                    sx={{fontFamily: 'area-normal,-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif'}}>Sign
                                            IN</Typography>
                                    </Button>
                                </Link>
                                <Link to={"/signup"}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="medium"
                                        sx={{
                                            borderRadius: 2, // Adjust the border radius for curved edges
                                            color: 'black', // Text color
                                            backgroundColor: 'white', // Grey color, you can adjust this to your desired shade of grey
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5', // Darker shade of grey on hover
                                            },
                                        }}
                                    >
                                        <Typography variant="body2"
                                                    sx={{fontFamily: 'area-normal,-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif'}}>Sign
                                            UP</Typography>
                                    </Button>
                                </Link>
                            </Box>
                        }{
                        token &&
                        <Box
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                size="medium"
                                onClick={handleLogout}


                                sx={{
                                    borderRadius: 2, // Adjust the border radius for curved edges
                                    color: 'black', // Text color
                                    backgroundColor: 'white', // Grey color, you can adjust this to your desired shade of grey
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5', // Darker shade of grey on hover
                                    },
                                }}
                            >
                                <Typography variant="body2"
                                            sx={{fontFamily: 'area-normal,-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif'}}>Log
                                    Out</Typography>
                            </Button>
                        </Box>
                    }
                        <Box sx={{display: {sm: '', md: 'none'}}}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{minWidth: '30px', p: '4px'}}
                            >
                                <MenuIcon/>
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                {!token ?
                                    <Box
                                        sx={{
                                            minWidth: '60dvw',
                                            p: 2,
                                            backgroundColor: 'background.paper',
                                            flexGrow: 1,
                                        }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'end',
                                                flexGrow: 1,
                                            }}
                                        >

                                        </Box>

                                        <MenuItem>
                                            <Link to={"/signup"}>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    sx={{width: '100%'}}
                                                    onClick={toggleDrawer(false)}

                                                >
                                                    Sign up
                                                </Button>
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to={"/signin"}>
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{width: '100%'}}
                                                    onClick={toggleDrawer(false)}
                                                >
                                                    Sign in
                                                </Button>
                                            </Link>
                                        </MenuItem>

                                    </Box>
                                    : <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            sx={{width: '100%'}}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </MenuItem>
                                }
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}


export default Navbar;