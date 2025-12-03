import React, { useEffect } from 'react';
import { CssBaseline, Toolbar, Box } from '@mui/material';
import Header from '../../layouts/headers/Header';
import Footer from '../../layouts/footers/Footer';
import HomeForm from '../../../components/Home/HomeForm';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Call backend swagger endpoint every 10 minutes to keep it alive (Render free tier)
    const keepAliveInterval = setInterval(() => {
      const img = new Image();
      img.src = 'https://user-protection.onrender.com/swagger/index.html?' + new Date().getTime();
      img.onerror = () => console.log('Keep-alive ping sent');
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(keepAliveInterval);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Header */}
      <Header />
      {/* Fixed AppBar spacer */}
      <Toolbar />

      {/* Main Content */}
      <HomeForm />

      {/* Hidden keep-alive iframe - prevents backend from sleeping on Render */}
      <Box sx={{ display: 'none' }}>
        <iframe
          src="https://user-protection.onrender.com/swagger/index.html"
          title="keep-alive"
          style={{ display: 'none', visibility: 'hidden', width: 0, height: 0 }}
        />
      </Box>

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;

