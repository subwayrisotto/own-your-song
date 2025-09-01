import React from 'react';
import styles from './LogoutButton.module.scss';
import { useUser } from '../../context/UserContext'; 
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const { logout } = useUser(); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };
    
    return (
        <div>
            <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default LogoutButton
