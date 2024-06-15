import React from 'react';
import { Container, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const SocialMediaIcons = () => {
  return (
    <Container>
      <Typography variant="h4">Siguenos en nuestras redes:</Typography>
      <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
        <Facebook fontSize="large" style={{ color: '#3b5998', margin: '0 10px' }} />
      </a>
      <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
        <Twitter fontSize="large" style={{ color: '#00acee', margin: '0 10px' }} />
      </a>
      <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
        <Instagram fontSize="large" style={{ color: '#c13584', margin: '0 10px' }} />
      </a>
    </Container>
  );
};

export default SocialMediaIcons;
