import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function NavbarAdmin() {
    const [username, setUserName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
          if(storedUsername) {
              setUserName(storedUsername);
          } else {
              navigate('/adminDAF');
          }
      }, [navigate])
  
      const handleLogout = () => {
          localStorage.removeItem(username);
          navigate('/adminDAF');
      }
  return (
    <div>
      Welcome {username}
      <button onClick={handleLogout}> Log Out </button>
    </div>
  )
}

export default NavbarAdmin
