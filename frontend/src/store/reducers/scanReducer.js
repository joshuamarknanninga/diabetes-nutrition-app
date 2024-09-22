// src/store/reducers/scanReducer.js
const initialState = {
    scans: [],
    loading: false,
    error: null
  };
  
  export const scanReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SCAN_REQUEST':
        return { ...state, loading: true };
      case 'SCAN_SUCCESS':
        return { ...state, loading: false, scans: [action.payload, ...state.scans] };
      case 'SCAN_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'FETCH_SCANS_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SCANS_SUCCESS':
        return { ...state, loading: false, scans: action.payload };
      case 'FETCH_SCANS_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  