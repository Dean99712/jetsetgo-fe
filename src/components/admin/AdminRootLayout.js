import React from 'react';
import NavigationMenu from "./AdminNavigationMenu";
import {Outlet} from "react-router-dom";

const AdminRootLayout = () => {
    return (
        <>
            <NavigationMenu/>
            <main>
                <Outlet/>
            </main>
        </>
    );
};

export default AdminRootLayout;
