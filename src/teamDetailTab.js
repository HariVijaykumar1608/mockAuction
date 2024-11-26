import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';

export default function TeamDetailTab(props) {
  const {teams, drawerOpen , toggleDrawer} = props

  const renderTableContent = () => (
    <Box
      sx={{
        width: '100%',
        height: '70vh',
        padding: 2,
        backgroundColor: '#f5f5f5',
        overflowY: 'auto',
      }}
    >
      <Grid container spacing={2}>
        {/* Row for Team Names */}
        <Grid container item spacing={1}>
          {teams.map((team, index) => (
            <Grid item xs={1.2} key={`name-${index}`}>
              <Box
                sx={{
                  backgroundColor: 'lightgray',
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  border: '1px solid #ccc',
                }}
              >
                {team.name}
              </Box>
            </Grid>
          ))}
        </Grid>
  
        {/* Row for Players */}
        <Grid container item spacing={1}>
          {teams.map((team, index) => (
            <Grid item xs={1.2} key={`players-${index}`}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  height: 'auto',
                  minHeight: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 1,
                  border: '1px solid #ccc',
                }}
              >
                {team.players.length > 0 ? (
                  team.players.map((player, idx) => (
                    <div key={`${team.name}-player-${idx}`}>
                      {/* Ensure you render the player's name or a property */}
                      {player.name || 'No Name'}
                    </div>
                  ))
                ) : (
                  <div>No Players</div>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
  
        {/* Row for Purse */}
        <Grid container item spacing={1}>
          {teams.map((team, index) => (
            <Grid item xs={1.2} key={`purse-${index}`}>
              <Box
                sx={{
                  backgroundColor: 'lightblue',
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  border: '1px solid #ccc',
                }}
              >
                ₹{team.purse}L
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
  

  return (
    <div>
      {/* Hamburger Menu Button */}
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>

      {/* Drawer */}
      <SwipeableDrawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {renderTableContent()}
      </SwipeableDrawer>
    </div>
  );
}
