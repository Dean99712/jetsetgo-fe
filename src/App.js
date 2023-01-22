import './styles/App.css';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import OrdersComponent from "./components/OrdersComponent";
import BookFlightComponent from "./components/BookFlightComponent";
import Header from "./components/Header";
import OffersComponent from "./components/OffersComponent";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import DateRangeComponent from "./components/DateRangeComponent";

function App() {

    return (
        <div>
            <Header/>
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<OrdersComponent/>}></Route>
                        <Route path="/book_flight" element={<BookFlightComponent/>}></Route>
                        <Route path="/offers"  element={<OffersComponent/>}></Route>
                    </Routes>
                </div>
            </Router>

        </div>
    );
}

export default App;
