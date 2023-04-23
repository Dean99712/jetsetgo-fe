import React from 'react';
import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
    const {auth} = useAuth()

    console.log(auth)

    return (
        <div>
            <h5>Admin Dashboard</h5>
        </div>
    );
};

export default AdminDashboard;
