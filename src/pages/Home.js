import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsAction';

function Home() {
  const { cars } = useSelector(state => state.carsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);


  return (
    <div>
      <h1>Home</h1>
      <h1>The length of cars array is {cars.length}</h1>
    </div>
  )
}

export default Home;