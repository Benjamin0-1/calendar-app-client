import React from "react";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

function Logout() {

    const handleLogout = () => {
        localStorage.clear('accessToken');
        localStorage.clear('refreshToken');
        window.location.href = '/login';
    };

    return (
        <div>
            <IconButton onClick={handleLogout} color="inherit">
                <LogoutIcon />
            </IconButton>
        </div>
    );
}

export default Logout;
