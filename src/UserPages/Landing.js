import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion } from 'framer-motion';
import SocialMediaIcons from './SocialMediaIcons';
import NewsLetter from './NewsLetter';

// Global style for body
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background: #121212;
    color: white;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const HeroSection = styled.div`
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  color: #00ffea;
  font-size: 48px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const ProductCard = styled(motion.div)`
  padding: 10px;
  border-radius: 10px;
  background: #222;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const ProductName = styled.h3`
  color: #00ffea;
`;

const ProductPrice = styled.p`
  color: #ccc;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px 0;
  background-color: #0f0c29;
  color: #00ffea;
  border-top: 3px solid #00ffea;
`;

const responsiveCarousel = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Landing = () => {
  const backgroundImages = [
    "https://cdn0.bodas.com.mx/vendor/8165/3_2/960/jpg/dsc-1688_5_168165-158413287213675.jpeg",
    "https://cdn0.bodas.com.mx/vendor/8165/3_2/960/jpg/1498059794.jpeg",
    "https://cdn0.bodas.com.mx/vendor/8165/3_2/960/jpg/dsc-0035_5_168165-158413317680185.jpeg",
    "https://cdn0.bodas.com.mx/vendor/8165/3_2/960/jpg/dsc-1670_5_168165-158413540111669.jpeg"
    // Add more background images here
  ];

  const products = [
    { id: 1, name: 'Paquete 50 personas', price: '$4000', imageUrl: 'https://cdn0.bodas.com.mx/vendor/8165/3_2/960/jpg/dsc-1670_5_168165-158413540111669.jpeg' },
    { id: 2, name: 'Paquete 60 personas', price: '$5000', imageUrl: 'https://cdn0.bodas.com.mx/vendor/8165/3_2/960/jpg/dsc-1688_5_168165-158413287213675.jpeg' },
    { id: 3, name: 'Paquete 80 personas', price: '$6000', imageUrl: 'https://images.squarespace-cdn.com/content/v1/63a06d297c044706137f32ac/672b5324-eb8b-42e6-94fe-5cc078843aab/55b2fde8-d43f-43fd-b46a-f1ee62c0ea70_RA1D_rNw1v-tM-ErWVViy.jpeg' },
    { id: 4, name: 'Paquete 100 personas', price: '$9000', imageUrl: 'https://c8.alamy.com/comp/P2TXEF/moscow-russia-13-june-2018-horizontal-picture-of-mexicans-fans-partying-in-the-streets-of-moscow-for-the-world-cup-russia-P2TXEF.jpg'}
  ];

  return (
    <>
      <GlobalStyle />
      <Carousel
        responsive={responsiveCarousel}
        autoPlay={true}
        autoPlaySpeed={2000}
        infinite={true}
        customTransition="transform 1000ms ease-in-out"
        arrows={false}
        showDots={true}
      >
        {backgroundImages.map((image, index) => (
          <HeroSection key={index} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <HeroTitle
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              
            </HeroTitle>
          </HeroSection>
        ))}
      </Carousel>
      <Container>
        <h2>Featured Products</h2>
        <Carousel responsive={responsiveCarousel} autoPlay={true} autoPlaySpeed={3000} infinite={true}>
          {products.map(product => (
            <ProductCard key={product.id}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}</ProductPrice>
            </ProductCard>
          ))}
        </Carousel>
        <div style={{ marginTop: '50px' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio sit amet odio vehicula, ut tempor elit ultrices. Aliquam porttitor urna vel urna mattis, ut vestibulum odio mollis. Donec nec lectus eget ante eleifend feugiat id at sem. Sed pellentesque velit a lorem cursus, et faucibus elit malesuada. Nam dapibus, mi eget tristique rhoncus, nunc libero scelerisque ipsum, nec posuere libero elit sit amet turpis. Pellentesque fermentum, eros eu fermentum finibus, eros ipsum pretium magna, id consequat lorem eros id justo. Nullam sodales erat nec sapien aliquam, at malesuada mi efficitur. Vestibulum interdum tincidunt turpis, sit amet dictum ex tempus eu.</p>
          <p>Nullam malesuada eros ut urna gravida vulputate. Nulla rhoncus, nunc at fringilla facilisis, velit ligula tempor sapien, id luctus lacus purus nec velit. Curabitur varius justo nec est malesuada, non hendrerit nunc ultrices. Ut at velit nulla. Curabitur sed augue in ex feugiat iaculis. Nam dignissim eros nec urna pulvinar, vel tristique tortor cursus. Suspendisse a consectetur lorem. Curabitur quis ipsum ipsum. Integer in ex turpis.</p>
        </div>
      </Container>
      <Footer>
        © 2024 Terraza del valle, todos los derechos reservados.
        <br/>
        <SocialMediaIcons/>
      </Footer>
      <NewsLetter />
    </>


  );

};

export default Landing;