

  import React, { useState } from 'react';
  import { 
    AppBar, Toolbar, Typography, Container, Grid, Card, CardMedia, 
    CardContent, Menu, MenuItem, IconButton, Modal, Box
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import { useTheme } from '@mui/material/styles';   
import Nav from '../../nav/Nav';

  
  function MainLayout({onModeChange, logout}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
  
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleImageClick = (imageSrc) => setSelectedImage(imageSrc);
    const handleModalClose = () => setSelectedImage(null);
  
    const listData = [
        {
          id: 1,
          photo: '/nopicture.png',
          title: 'Product One',
          description: 'High-performance laptop with latest generation processor.'
        },
        {
          id: 2,
          photo: '/nopicture.png',
          title: 'Product Two',
          description: 'Wireless noise-cancelling headphones with premium sound quality.'
        },
        {
          id: 3,
          photo: '/nopicture.png',
          title: 'Product Three',
          description: '4K Ultra HD Smart TV with HDR support.'
        },
        {
          id: 4,
          photo: '/nopicture.png',
          title: 'Product Four',
          description: 'Professional-grade digital camera with advanced features.'
        },
        {
          id: 5,
          photo: '/nopicture.png',
          title: 'Product Five',
          description: 'Smart home security system with mobile app control.'
        },
        {
          id: 6,
          photo: '/nopicture.png',
          title: 'Product Six',
          description: 'Ergonomic office chair with lumbar support.'
        },
        {
          id: 7,
          photo: '/nopicture.png',
          title: 'Product Seven',
          description: 'Portable bluetooth speaker with 24-hour battery life.'
        },
        {
          id: 8,
          photo: '/nopicture.png',
          title: 'Product Eight',
          description: 'Gaming console with 4K graphics capabilities.'
        },
        {
          id: 9,
          photo: '/nopicture.png',
          title: 'Product Nine',
          description: 'Smart fitness tracker with heart rate monitoring.'
        }
      ];
  
    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 1,
    };

    const [themeMode, setThemeMode] = useState("dark");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const theme = useTheme();
  
    const handleLogin = () => {
      if (username === "admin" && password === "password") {
        setIsAuthenticated(true);
      } else {
        alert("Invalid credentials!");
      }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername("");
        setPassword("");
      };
    
      const handleThemeMode = (value) => {
        setThemeMode(value);
      };
    
  
    return (
      <>
      <Nav onModeChange={onModeChange} logout={logout} />
  
        <Container sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {listData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    width="150"
                    image={item.photo}
                    alt={item.title}
                    sx={{ 
                      objectFit: 'contain',
                      cursor: 'pointer',
                      margin: 'auto'
                    }}
                    onClick={() => handleImageClick(item.photo)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
  
        <Modal open={Boolean(selectedImage)} onClose={handleModalClose}>
          <Box sx={modalStyle}>
            <img 
              src={selectedImage?.replace('150/150', '300/300')} 
              alt="Enlarged view"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          </Box>
        </Modal>
      </>
    );
  }

export default MainLayout;