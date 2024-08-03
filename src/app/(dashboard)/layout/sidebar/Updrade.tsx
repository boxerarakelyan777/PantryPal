import React from "react";
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';


export const Upgrade = () => {
    // Assuming you have an isAuthenticated variable, if not, you need to define it
    const isAuthenticated = false; // Replace with your authentication logic

    return (
        <>
            {isAuthenticated && (
                <Box
                    display='flex'
                    alignItems="center"
                    gap={2}
                    sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}
                >
                    <Box>
                        <Typography variant="h5" sx={{width:"50px"}} fontSize='16px' mb={1}>
                            Aren&apos;t registered?
                        </Typography>
                        <Button 
                            color="primary" 
                            disableElevation 
                            component={Link} 
                            href="/register" 
                            variant="contained" 
                            aria-label="signup" 
                            size="small"
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};
