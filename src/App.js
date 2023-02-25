import './styles/App.scss';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BookFlight from "./components/booking/BookFlight";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Flights from "./components/flights/Flights";
import './styles/FlightsOfferComponent.scss'
import Error from "./components/Error";
import Root from "./components/Root";
import {AuthProvider} from "./context/AuthProvider";
import Login from "./components/login/Login";
import OrderSummary from "./components/ordersummary/OrderSummary";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import AdminDashboard from "./components/admin/AdminDashboard";
import FareOptions from "./components/fareoptions/FareOptions";
import CreateOrderComponent from "./components/ordercreate/CreateOrderComponent";
import Orders from "./components/Orders";

function App() {

    const ROLES = {
        Admin: 'ADMIN',
        User: 'USER'
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root/>,
            errorElement: <Error/>,
            children: [

                //Public Authentication
                {path: 'login', element: <Login/>},
                {path: 'unauthorized', element: <Unauthorized/>},

                //Public Routes
                {path: '/', index: true, element: <BookFlight/>},
                {path: 'flights', element: <Flights/>},
                {path: 'fares', element: <FareOptions/>},
                {path: 'createOrder', element: <CreateOrderComponent/>},
                {path: 'orderSummary', element: <OrderSummary/>},


                //Authenticated Routes
                {
                    element: <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]}/>,
                    children: [
                        {path: 'orderSummary', element: <OrderSummary/>},
                        {path: 'orders', element: <Orders/>},
                    ]
                },
                {
                    element: <RequireAuth allowedRoles={[ROLES.Admin]}/>,
                    children: [
                        {path: "admin", element: <AdminDashboard/>}
                    ]
                }
            ]
        }
    ])

    return (
        <AuthProvider>
            <SkeletonTheme baseColor={"#b4b4b4"} highlightColor={"#e8e8e8"}>
                <RouterProvider router={router}/>
            </SkeletonTheme>
        </AuthProvider>
    );
}

export default App;
