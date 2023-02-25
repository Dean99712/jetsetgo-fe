import React, {useEffect, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useMutation} from "@tanstack/react-query";
import './UserOrders.scss'
import {cancelUserOrder, deleteUserOrder} from "../../services/OrderService";
import {Modal, Typography} from "@mui/material";
import {notification} from "../../App";
import useAuth from "../../hooks/useAuth";
import {motion as m} from 'framer-motion';

const UserOrders = () => {

    const [itemId, setItemId] = useState('');
    const {auth} = useAuth()
    const {user: {orders}} = auth;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        backgroundColor: '#FFFFFF',
        padding: "1.5em",
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
    };

    const [openModal, setOpenModal] = useState(false);

    const {mutate: cancel, isError, error: e} = useMutation(
        cancelUserOrder,
        {
            onError: (error) => {
                if (error.response.status === 500) {
                    setOpenModal(false)
                    notification("Failed", "Oops... Something went wrong", 'error')
                }
            },
            onSuccess: () => {
                setOpenModal(false)
                notification('Success', 'Order has been cancelled successfully!', 'success')
            }
        }
    )

    const {mutate} = useMutation(deleteUserOrder)

    const [modalText, setModalText] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const handleItemChanges = (id) => {
        setModalTitle("Are you sure?")
        setModalText("You're about to Cancel this order")
        setOpenModal(true)
        setItemId(id)
    }

    const handleCancel = (id) => {
        cancel({
            order_id: id,
            token: auth?.accessToken
        })
    }
    const handleDelete = (id) => {
        mutate({
            order_id: id
        })
    }

    const columns = [
        {field: 'order_id', headerName: 'ID', width: 100},
        {
            field: 'owner', headerName: 'Owner', width: 100, renderCell: (params) => {
                return (
                    <div style={{display: "flex"}}>
                        <img style={{height: "30px", width: "30px"}} src={`${params.row.owner?.logo_symbol_url}`}
                             alt="owner logo"/>
                        <p>{params.row.owner.iata_code}</p>
                    </div>
                )
            },
        },

        {field: 'booking_reference', headerName: 'Booking Reference', width: 170},
        {
            field: 'origin_city_name', headerName: 'Origin City name', width: 300, renderCell: (params) =>
                `${params.row.slices[0].origin?.city_name || ''} ,${params.row.slices[0].origin?.name}`
        },
        {
            field: 'destination_city_name', headerName: 'Destination City name', width: 340, renderCell: (params) =>
                `${params.row.slices[0].destination?.city_name || ''} ,${params.row.slices[0].destination?.name}`
        },
        {field: 'status', headerName: 'Status', width: 120},
        {
            field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
                return (
                    params.row.status === "CANCELLED"
                        ?
                        <button className="action_button delete" onClick={() => handleItemChanges(params.row.id)}>Delete
                            Order</button>
                        :
                        <button onClick={() => handleItemChanges(params.row.id)} className="action_button cancel">Cancel
                            Order</button>)
            }}
    ,];

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <div className='user-page' style={{width: "100%", height: '100vh'}}>
            <div className="grid" style={{
                background: "white"
            }}>
                <h3 className="orders-title">Your orders</h3>
                {openModal &&
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                    >
                        <m.Box style={style} >
                            <Typography id="modal-modal-title" variant="h5" component="h1">
                                {modalTitle}
                            </Typography>
                            <Typography id="modal-modal-description" component="p" sx={{mt: 1, mb: 7}}>
                                {modalText}
                            </Typography>
                            <button onClick={() => handleCancel(itemId)} className="action_button delete">Cancel Order
                            </button>
                        </m.Box>
                    </Modal>}
                <DataGrid
                    rowHeight={70}
                    columnHeaderHeight={50}
                    disableRowSelectionOnClick
                    loading={!orders}
                    className="data-grid"
                    rows={!orders ? [] : orders}
                    pageSize={5}
                    sx={{
                        borderRadius: "20px",
                        color: "#334a60",
                        fontFamily: "Poppins, sans-serif",
                    }}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    columns={columns}/>
            </div>
        </div>
    )
};

export default UserOrders;
