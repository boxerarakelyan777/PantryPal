import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../../firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to landing page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src=""
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>

  
        <Box mt={1} py={1} px={2}>


          {isAuthenticated ? (
          <Button 

          variant="outlined"
          color="primary"
          
          fullWidth
          onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button            
            color="primary"
            variant="outlined"
            fullWidth 
            onClick={() => router.push('/register')}>
              Register
            </Button>
            <Button
            variant="outlined"
            color="primary"
            
            fullWidth
            onClick={() => router.push('/login')}
            >
              Login
            </Button>
          </>
        )}
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
