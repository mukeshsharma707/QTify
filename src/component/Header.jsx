import React from 'react';
import './Header.css'; // Keep this if you're using external CSS
import { Button, TextField } from '@mui/material';

const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 74,
     
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#00BD2B',
        padding: '10px',
      }}
    >
      <div style={{ padding: '5px' }}>
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <div style={{padding: '5px' }}>
        <div class="nav_search">
            
            <input class="search_item" placeholder="Search a album of your choice"/>
            <div class="search_icon"><i class="fa-solid fa-magnifying-glass-location"></i></div>
        </div>
      </div>
      <div style={{ background: '#00BD2B', padding: '5px' }}><Button variant='contained' sx={{background:'black',color:'#00BD2B'}}>give feedback</Button></div>
    </div>
  );
};

export default Header;
