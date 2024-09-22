// src/store/actions/scanActions.js
import { FETCH_SCANS_SUCCESS, FETCH_SCANS_FAIL, CREATE_SCAN_SUCCESS, CREATE_SCAN_FAIL, DELETE_SCAN_SUCCESS, DELETE_SCAN_FAIL } from '../types';
import api from '../../services/api';

export const fetchScans = () =>
