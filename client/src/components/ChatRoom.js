import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';

const socket = io('http://localhost:5000');

function ChatRoom({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    socket.on('load-messages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on('new-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('load-messages');
      socket.off('new-message');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('send-message', {
        user,
        content: newMessage.trim(),
      });
      setNewMessage('');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          mb: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          p: 2,
        }}
      >
        <List>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      color={message.user === user ? 'primary' : 'textPrimary'}
                    >
                      {message.user}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {message.content}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                        sx={{ display: 'block' }}
                      >
                        {format(new Date(message.timestamp), 'HH:mm')}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
}

export default ChatRoom; 