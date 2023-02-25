import React from 'react';
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    const {auth} = useAuth()

    console.log(auth)

    return (
        <div>
            <h5>Admin Dashboard</h5>
        </div>
    );
};

export default Dashboard;
