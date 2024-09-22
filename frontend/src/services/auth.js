// // src/store/actions/authActions.js
// import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';
// import { login, register } from '../../services/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const registerUser = (username, email, password) => async (dispatch) => {
//   try {
//     const data = await register(username, email, password);
//     dispatch({ type: REGISTER_SUCCESS, payload: data });
//     await AsyncStorage.setItem('token', data.token);
//   } catch (error) {
//     dispatch({
//       type: REGISTER_FAIL,
//       payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };

// export const loginUser = (email, password) => async (dispatch) => {
//   try {
//     const data = await login(email, password);
//     dispatch({ type: LOGIN_SUCCESS, payload: data });
//     await AsyncStorage.setItem('token', data.token);
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };

// export const logout = () => async (dispatch) => {
//   await AsyncStorage.removeItem('token');
//   dispatch({ type: LOGOUT });
// };
