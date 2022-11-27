import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import CarPreview from '../components/CarPreview';
import DateRangePickerComp from '../components/DateRangePickerComp';

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



const carsReducer = (state, action) => {
  switch (action.type) {
    case 'CARS_FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'CARS_FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case 'CARS_FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};


function Home(props) {

  const [cars, dispatchCars] = useReducer(carsReducer, {
    data: [],
    isLoading: false,
    isError: false
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [totalCars, setTotalCars] = useState({
    data: [],
    isLoading: false,
    isError: false
  });


  async function sendCarsRequest() {
    let res = await axios.get('http://localhost:3300/api/cars/')
      .catch(err => dispatchCars({ type: 'CARS_FETCH_FAILURE' }));

    let data = null;
    if (!res) data = null;
    if (res && res.hasOwnProperty('data')) data = await res.data;

    return data
  }

  useEffect(() => {

    //Initial Stage: On Page Load
    dispatchCars({ type: 'CARS_FETCH_INIT' });

    //Sending Cars Request: 
    sendCarsRequest().then(data => {
      (data) && dispatchCars({
        type: 'CARS_FETCH_SUCCESS',
        payload: data.cars
      });
    });

  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  function setFilter() {
    let selectedFrom = dateRange[0].format('DD/MM/YYYY');
    let selectedTo = dateRange[1].format('DD/MM/YYYY');

    let temp = [];
    for (let car of cars.data) {
      if (car.bookedTimeSlots.length === 0) {
        temp.push(car);
      }
      else {
        let isOverlap = false;
        for (let booking of car.bookedTimeSlots) {
          let a_start = convertToDate(selectedFrom);
          let a_end = convertToDate(selectedTo);
          let b_start = convertToDate(booking.from);
          let b_end = convertToDate(booking.to);

          let checkOverlap = dateRangeOverlaps(a_start, a_end, b_start, b_end);
          if (checkOverlap) isOverlap = true;
        }
        if(!isOverlap) temp.push(car);
      }
    }
    console.log(temp);
    setTotalCars({ data: temp, isLoading: false, isError: false });
  }

  useEffect(() => {
    (dateRange[0] && dateRange[1]) && setFilter();
  }, [dateRange]);


  return (
    <div className="container">
      <h3>Select Dates: </h3>
      <br />
      <DateRangePickerComp
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <br />
      <div className="cars-container">
        {(totalCars.isLoading) ? <h1>Loading..!</h1> :
          totalCars.data.map((car, index) => {
            return (<CarPreview
              className="car-item"
              key={index}
              carID={car._id}
              carName={car.name}
              image={car.image}
              rentPerHour={car.rentPerHour}
              fuelType={car.fuelType}
              capacity={car.capacity}
              isLoggedIn={props.isLoggedIn}
            />);
          })}
      </div>
    </div>
  )
}

export default Home;