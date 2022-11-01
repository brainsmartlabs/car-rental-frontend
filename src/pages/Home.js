import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarPreview from '../components/CarPreview';


function Home() {

  const [cars, setCars] = useState();

  async function sendRequest() {
    let res = await axios.get('http://localhost:3300/api/cars/')
      .catch(err => console.log(err));
    let data = await res.data;
    return data
  }

  useEffect(() => {
    sendRequest().then(data => {
      setCars(data.cars);
    });
  }, []);


  return (
    <div className="container">
      <div className="cars-container">
        {(cars) && cars.map((car, index) => {
          return (<CarPreview
            className="car-item"
            key={index}
            carID={car._id}
            carName={car.name}
            image={car.image}
            rentPerHour={car.rentPerHour}
            fuelType={car.fuelType}
            capacity={car.capacity}
          />);
        })}
      </div>
    </div>
  )
}

export default Home;