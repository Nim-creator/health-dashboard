import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

/**
 * Main application layout component
 * Wraps all pages with consistent navigation and container styling
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.children] - Optional children (alternative to Outlet)
 * @returns {JSX.Element} The layout structure
 */
const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container
        fluid="xxl"
        className="flex-grow-1 py-4 main-content"
        as="main"
      >
        {children || <Outlet />}
      </Container>
      <footer className="bg-light py-3 mt-auto">
        <Container fluid="xxl">
          <p className="text-center text-muted mb-0">
            &copy; {new Date().getFullYear()} Health Dashboard
          </p>
        </Container>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;



