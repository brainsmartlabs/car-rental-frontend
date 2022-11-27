import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Checkbox, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import DateRangePickerComp from '../components/DateRangePickerComp.js';

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}

function convertToDate(dateString) {
  let dateArray = dateString.split('/');
  let strReConstruct = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

  return new Date(strReConstruct);
}

const carReducer = (state, action) => {
  switch (action.type) {
    case 'CAR_FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'CAR_FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case 'CAR_FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
}


function BookingCar(props) {

  const navigate = useNavigate();
  const carID = useParams().id;


  const [car, dispatchCar] = useReducer(carReducer, {
    data: {},
    isLoading: false,
    isError: false,
  });

  const [errMessage, setErrMessage] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  /*dateRange[0] && console.log(dateRange[0].format('DD/MM/YYYY'));
  (dateRange[0] && dateRange[1]) && console.log(dateRange[1].diff(dateRange[0].format(), "day"))*/
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [driver, setDriver] = useState(false);
  const [dateOverlap, setDateOverlap] = useState(false);

  useEffect(() => {
    (dateRange[0] && dateRange[1]) ?
      setTotalAmount(() => {
        let amt = 0;
        amt = (driver) ? ((dateRange[1].diff(dateRange[0].format(), "day") * car.data.rentPerHour) + 700)
          : dateRange[1].diff(dateRange[0].format(), "day") * car.data.rentPerHour;
        return amt;
      }) : setTotalAmount(0);

    (dateRange[0] && dateRange[1]) ?
      setTotalDays(dateRange[1].diff(dateRange[0].format(), "day")) : setTotalDays(0);
  }, [dateRange, driver])


  async function sendCarRequest() {
    const res = await axios.get(`http://localhost:3300/api/cars/${carID}`, {
      withCredentials: true,
    }).catch(err => {
      let errData = err.response.data;
      errData.errStatus = err.response.status;
      errData.hasAnError = true;
      return errData;
    });

    let data;
    if (!res.hasAnError) {
      data = await res.data;
      data.resStatus = await res.status;
    } else if (res.hasAnError) {
      data = res;
    }
    return data;
  }

  async function sendBookingRequest() {
    const reqObj = {
      user: props.user.data._id,
      car: car.data._id,
      totalAmount: totalAmount,
      totalDays: totalDays,
      driverRequired: driver,
      bookedTimeSlots: {
        from: dateRange[0].format('DD/MM/YYYY'),
        to: dateRange[1].format('DD/MM/YYYY')
      },
    }

    const res = await axios.post(`http://localhost:3300/api/booking/bookACar`, reqObj, {
      withCredentials: true,
    }).catch(err => {
      let errData = err.response.data;
      errData.errStatus = err.response.status;
      errData.hasAnError = true;
      return errData;
    });

    let data;
    if (!res.hasAnError) {
      data = await res.data;
      data.resStatus = await res.status;
    } else if (res.hasAnError) {
      data = res;
    }
    return data;
  }

  async function bookNow() {
    if (!dateOverlap) {
      setErrMessage('');
      sendBookingRequest().then((data) => {
        if (data.hasOwnProperty('resStatus') && (data.resStatus === 200)) {
          navigate('/');
        }
        else if (data.hasOwnProperty('errStatus') && (data.errStatus === 400)) {
          setErrMessage(`${data.message}`)
        }
        else if (data.hasOwnProperty('errStatus') && (data.errStatus === 500)) {
          setErrMessage(`${data.message}`)
        }
      })
    }

  }


  useEffect(() => {
    dispatchCar({ type: 'CAR_FETCH_INIT' });

    sendCarRequest().then(data => {
      if (data.hasOwnProperty('resStatus') && (data.resStatus === 200) && (data.status === true)) {
        dispatchCar({
          type: 'CAR_FETCH_SUCCESS',
          payload: data.car
        });
      }
      else if (data.hasOwnProperty('errStatus') && (data.errStatus === 404) && (data.status === false)) {
        dispatchCar({ type: 'CAR_FETCH_FAILURE' });
        setErrMessage('Sorry, Car Not found');
      }
      else if (data.hasOwnProperty('errStatus') && (data.errStatus === 400) && (data.status === false)) {
        dispatchCar({ type: 'CAR_FETCH_FAILURE' });
        setErrMessage('Sorry, Wrong ID');
      }
    });

  }, []);

  function checkDates() {
    setDateOverlap(false);
    setErrMessage('');
    let selectedFrom = dateRange[0].format('DD/MM/YYYY');
    let selectedTo = dateRange[1].format('DD/MM/YYYY');

    let isOverlap = false;
    for (let booking of car.data.bookedTimeSlots) {
      let a_start = convertToDate(selectedFrom);
      let a_end = convertToDate(selectedTo);
      let b_start = convertToDate(booking.from);
      let b_end = convertToDate(booking.to);

      let checkOverlap = dateRangeOverlaps(a_start, a_end, b_start, b_end);
      if (checkOverlap) isOverlap = true;
    }
    if (isOverlap) setErrMessage('***Dates overlaping. Please Choose Other Dates');
    if (isOverlap) setDateOverlap(true);
  }

  useEffect(() => {
    (dateRange[0] && dateRange[1]) && checkDates();
  }, [dateRange]);


  return (
    <div>
      {(car.isError) &&
        < h1 > {errMessage}</h1>
      }

      {(car.isLoading) ? <CircularProgress /> :
        <Grid container spacing={2} sx={{ 'margin': '25px' }}>

          <Grid item md={6} xs={12} >
            <img src={car.data.image} className="car-image" />
          </Grid>
          <Grid item md={6} xs={12} >
            <Divider> <Chip label="Car Info" /></Divider>
            <div className='text-right'>
              <p>{car.data.name} </p>
              <p>{car.data.rentPerHour} Rent Per Day /-</p>
              <p>Fuel: {car.data.fuelType}</p>
              <p>Max Persons: {car.data.capacity}</p>
            </div>
            <Divider> <Chip label="Select TIme Slots" /></Divider>
            <br />
            <div className='text-right'>
              <DateRangePickerComp
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>
            <br />
            {(errMessage) &&
              < p style={{ 'color': 'red', 'fontStyle': 'oblique', 'fontSize': '25px' }}> {errMessage}</p>
            }
            <br />
            {(dateRange[0] && dateRange[1]) &&
              <div className='text-right'>
                Total Days Selected : {totalDays}
                <br />
                Total Cost: Rs.{totalAmount}
                <br />
                Driver Required ? <Checkbox
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
                  onChange={(e) => {
                    (e.target.checked) ? setDriver(true) : setDriver(false);
                  }} />
                <br /><br />
                {(!dateOverlap) &&
                  <Button
                    variant='contained'
                    color="info"
                    size="large"
                    onClick={bookNow}>Book Now</Button>
                }
              </div>
            }

          </Grid>
        </Grid>
      }
    </div >
  )
}

export default BookingCar;