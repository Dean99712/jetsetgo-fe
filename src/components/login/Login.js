import React from 'react';
import '../../styles/login/Login.scss'
import background from '../../assets/images/AdobeStock_89260265.png'
import {Button} from "react-bootstrap";
import {Input} from "@mui/material";

const Login = () => {

    return (
        <div className='login-container'>
            <div
                style={
                    {
                        background: background,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }} className="right-columnContainer">

                <div style={{
                    position: "absolute",
                    left: '34em',
                    top: '20em',
                    width: '700px',
                    height: '400px',
                    background: "white",
                    borderRadius: '20px'
                }}>

                    <form style={{
                        padding:'1em'
                    }}>
                        <div style={{
                            height: '100px',
                            width: '100%',
                            borderBottom: '1px solid black',
                            paddingBottom:'1em',
                        }}></div>

                        <div style={{
                            paddingTop:'1em',
                            display: "grid",
                            justifyItems:"center",
                        }}>
                            <Input style={{
                                width:'200px',
                                outline:'1px solid grey',
                                borderRadius:'5px',
                                padding: '0.5em'
                            }} placeholder="user name" type="text"/>
                            <Input placeholder='password' type="text"/>
                        </div>
                        <Button className='mt-5 btn-dark'>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
