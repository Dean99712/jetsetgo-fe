import './styles/App.scss';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BookFlight from "./components/booking/BookFlight";
import Header from "./components/Header";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import OrdersComponent from "./components/OrdersComponent";
import {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FlightsComponent from "./components/FlightsComponent";
import './styles/FlightsOfferComponent.scss'
import FareOptionsComponent from "./components/fareoptions/FareOptionsComponent";
import Login from "./components/login/Login";
import Footer from "./components/Footer";
import CreateOrderComponent from "./components/ordercreate/CreateOrderComponent";

function App() {

    return (
        <div>
            <SkeletonTheme baseColor={"#b4b4b4"} highlightColor={"#e8e8e8"}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<BookFlight/>}></Route>
                        <Route path="/orders" element={<OrdersComponent/>}></Route>
                        <Route path="booking/flights" element={<FlightsComponent/>}></Route>
                        <Route path="/fare_options" element={<FareOptionsComponent/>}></Route>
                        <Route path="/flight_checkout" element={<CreateOrderComponent/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                    </Routes>
                    <Footer/>\
                </Router>
            </SkeletonTheme>
        </div>
    );
}

export default App;
