import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import Header from './header';

const AppLayout = ({ children }) => (
  <div>
    <Header />
    <div />
    {children}
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
