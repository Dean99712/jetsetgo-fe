import './styles/App.scss';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CinemaLanding from "./components/cinema/CinemaLanding";
import BookPage from "./components/book/BookPage";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Flights from "./components/flights/Flights";
import './styles/FlightsOfferComponent.scss'
import ErrorPage from "./components/ErrorPage";
import Root from "./components/Root";
import {AuthProvider} from "./context/AuthProvider";
import Login from "./components/login/Login";
import OrderSummary from "./components/ordersummary/OrderSummary";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import FareOptions from "./components/fareoptions/FareOptions";
import Orders from "./components/Orders";
import AdminRootLayout from "./components/admin/AdminRootLayout";
import Register from "./components/login/Register";
import Swal from "sweetalert2";
import UserOrders from "./components/user/UserOrders";
import {FlightProvider} from "./context/FlightProvider";
import UserUpdate from "./components/user/UserUpdate";
import CreateOrder from "./components/ordercreate/CreateOrder";
import {UserProvider} from "./context/UserProvider";
import About from "./components/About";

// Offline frame-capture stage for scripts/render-clips.js — dev only, lazy so
// it never enters the production bundle's critical path.
const RenderStage = React.lazy(() => import("./components/cinema/render/RenderStage"));

function App() {

    const ROLES = {
        Admin: 'ADMIN',
        User: 'USER'
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: [

                //Public Authentication
                {path: 'login', element: <Login/>},
                {path: 'register', element: <Register/>},
                {path: 'unauthorized', element: <Unauthorized/>},

                //Public Routes
                {path: '/', index: true, element: <CinemaLanding/>},
                {path: 'book', element: <BookPage/>},
                {path: 'flights', element: <Flights/>},
                {path: 'fares', element: <FareOptions/>},
                {path: 'orderSummary', element: <OrderSummary/>},
                {path: 'about', element: <About/>},

                // Authenticated Routes
                {
                    element: <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]}/>,
                    children: [
                        {path: 'createOrder', element: <CreateOrder/>},
                        {path: 'orders', element: <Orders/>},
                        {path: 'orderSummary', element: <OrderSummary/>},
                        {path: 'user/:id/orders', element: <UserOrders/>},
                        {path: 'user/:id', element: <UserUpdate/>},
                    ]
                }
            ]
        },
        ...(process.env.NODE_ENV === 'development' ? [{
            path: '/__render',
            element: <React.Suspense fallback={null}><RenderStage/></React.Suspense>,
        }] : []),
        {
            element: <RequireAuth allowedRoles={[ROLES.Admin]}/>,
            children: [
                {
                    path: "/admin",
                    element: <AdminRootLayout/>,
                    children: [
                        {path: 'orders', element: <Orders/>},
                    ]
                }
            ]
        }
    ])

    return (
        <FlightProvider>
            <UserProvider>
                <AuthProvider>
                    <SkeletonTheme baseColor={"#b4b4b4"} highlightColor={"#e8e8e8"}>
                        <RouterProvider router={router}/>
                    </SkeletonTheme>
                </AuthProvider>
            </UserProvider>
        </FlightProvider>

    );
}

export default App;

export const notification = (title, html, icon, showConfirmButton, timer) => {
    Swal.fire(
        title,
        html,
        icon,
        showConfirmButton,
        timer
    )
}