import './styles/App.scss';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BookFlightComponent from "./components/BookFlightComponent";
import Header from "./components/Header";
import OffersComponent from "./components/OffersComponent";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import OrdersComponent from "./components/OrdersComponent";


function App() {

    return (
        <div>
            <Router>
            <Header/>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<BookFlightComponent/>}></Route>
                        <Route path="/orders" element={<OrdersComponent/>}></Route>
                        <Route path="/offers"  element={<OffersComponent/>}></Route>
                    </Routes>
                </div>
            </Router>

        </div>
    );
}

export default App;
