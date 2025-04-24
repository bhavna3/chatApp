import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography } from '@mui/material';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Real-Time Chat App
          </Typography>
          {!user ? (
            <Login onLogin={setUser} />
          ) : (
            <ChatRoom user={user} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 