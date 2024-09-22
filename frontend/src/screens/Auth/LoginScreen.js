// src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authActions';
import Button from '../../components/Button';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { loading, error } = auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    dispatch(login(email, password));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {loading ? <ActivityIndicator size="large" color="#2196F3" /> :
        <Button title="Login" onPress={handleLogin} />
      }
      <Text style={styles.registerText}>
        Don't have an account?{' '}
        <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10
  },
  error: {
    color: 'red',
    textAlign: 'center'
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center'
  },
  registerLink: {
    color: '#2196F3',
    fontWeight: 'bold'
  }
});

export default LoginScreen;
