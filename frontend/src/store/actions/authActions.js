// src/store/actions/authActions.js
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Register User
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await api.post('/auth/register', { name, email, password }, config);

    dispatch({ type: 'AUTH_SUCCESS', payload: data });

    // Save token to AsyncStorage
    await AsyncStorage.setItem('userToken', data.token);
  } catch (error) {
    dispatch({
      type: 'AUTH_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await api.post('/auth/login', { email, password }, config);

    dispatch({ type: 'AUTH_SUCCESS', payload: data });

    // Save token to AsyncStorage
    await AsyncStorage.setItem('userToken', data.token);
  } catch (error) {
    dispatch({
      type: 'AUTH_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('userToken');
  dispatch({ type: 'LOGOUT' });
};
