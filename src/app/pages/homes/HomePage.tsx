import React from 'react';
import { CssBaseline, Toolbar } from '@mui/material';
import Header from '../../layouts/headers/Header';
import Footer from '../../layouts/footers/Footer';
import HomeForm from '../../../components/Home/HomeForm';

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Header */}
      <Header />
      {/* Fixed AppBar spacer */}
      <Toolbar />

      {/* Main Content */}
      <HomeForm />

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;

