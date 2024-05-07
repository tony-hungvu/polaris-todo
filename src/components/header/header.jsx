import './header.css';

import { Frame } from '@shopify/polaris';
import HeaderContent from './TopBar';
import React from 'react';

const Header = () => {
  const logo = {
    topBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    width: 86,
    url: '#',
    accessibilityLabel: 'Shopify',
  };
  return (
    <div className='header-container'>
      <Frame logo={logo}>
        <HeaderContent />
      </Frame>
    </div>
  );
};

export default Header;
