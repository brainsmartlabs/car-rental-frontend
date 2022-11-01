import axios from 'axios';

export const getAllCars = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.get('http://localhost:3300/api/cars/getAllCars');
        dispatch({ type: 'GET_ALL_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (err) {
        console.log(err);
        dispatch({ type: 'LOADING', payload: false });
    }
}