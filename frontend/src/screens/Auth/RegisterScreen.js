// src/screens/Auth/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/authActions';
import Button from '../../components/Button';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { loading, error } = auth;

  const [name, setName] = useState
