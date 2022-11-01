import React from 'react'
import { useSelector } from 'react-redux';

function Home() {
  const { cars } = useSelector(state => state.carsReducer)
  return (
    <div>
      <h1>Home</h1>
      <h1>The length of cars array is {cars.length}</h1>
    </div>
  )
}

export default Home;