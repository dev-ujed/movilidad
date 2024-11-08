import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        const response = await axios.post(
            'http://localhost:8000/users/logout/', 
            {},{headers: {'Content-Type': 'application/json',}}
        );

        if (response.status === 200) {
            console.log(response.data.message); // 'success'
            localStorage.removeItem('token');
            navigate("/login");
        }
    } catch (error) {
        console.error('Error durante el cierre de sesión:', error);
    }
};

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
