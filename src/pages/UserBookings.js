import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

const bookingsReducer = (state, action) => {
    switch (action.type) {
        case 'BOOKINGS_FETCH_INIT':
            return { ...state, isLoading: true, isError: false };
        case 'BOOKINGS_FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, data: action.payload };
        case 'BOOKINGS_FETCH_FAILURE':
            return { ...state, isLoading: false, isError: true };
        default:
            throw new Error();
    }
};

function UserBookings(props) {

    const [bookings, dispatchBookings] = useReducer(bookingsReducer, {
        data: [],
        isLoading: false,
        isError: false
    });


    async function sendBookingsRequest() {
        let res = await axios.get('http://localhost:3300/api/booking/')
            .catch(err => dispatchBookings({ type: 'BOOKINGS_FETCH_FAILURE' }));

        let data = null;
        if (!res) data = null;
        if (res && res.hasOwnProperty('data')) data = await res.data;

        return data;
    }

    useEffect(() => {
        //Initial Stage: On Page Load
        dispatchBookings({ type: 'BOOKINGS_FETCH_INIT' });

        //Sending Cars Request: 
        sendBookingsRequest().then(data => {
            let filteredData;
            filteredData = data.bookings.filter(entry => { 
                console.log(props.user.data) //Please Check here
                return (entry.user === props.user._id) ? true : false ;
            });
            //console.log(data)
            dispatchBookings({
                type: 'BOOKINGS_FETCH_SUCCESS',
                payload: data.filteredData
            });
        });

    }, []);

    return (
        <div>
        </div>
    )
}

export default UserBookings