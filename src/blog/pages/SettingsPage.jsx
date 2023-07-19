import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Concatenate old and new passwords with a separator
    const password = `${oldPassword}|${newPassword}`;

    try {
      // Send the password change request using Axios
      const response = await axios.post('/api/updatePassword', { Password: password });

      // Update the message state with the response data
      setMessage(response.data.message);
    } catch (error) {
      // Handle errors, if any
      setMessage('An error occurred while changing the password.');
    }
  };

  return (
    <Box flex={4} p={2}>
    <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
      <TextField
        label="Old Password"
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
        className='py-2'
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        className='py-2'

      />
      <Button type="submit" variant="contained" color="primary">
        Change Password
      </Button>
      <p>{message}</p>
    </form>
    </Box>
  );
};

export default SettingsPage;
