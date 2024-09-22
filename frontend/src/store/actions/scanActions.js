// src/store/actions/scanActions.js
import api from '../../services/api';

// Create a new scan
export const createScan = (upc) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'SCAN_REQUEST' });

    const { auth: { user } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    };

    const { data } = await api.post('/scans', { upc }, config);

    dispatch({ type: 'SCAN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'SCAN_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

// Fetch all scans
export const fetchScans = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'FETCH_SCANS_REQUEST' });

    const { auth: { user } } = getState();

    const config = {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    };

    const { data } = await api.get('/scans', config);

    dispatch({ type: 'FETCH_SCANS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'FETCH_SCANS_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
