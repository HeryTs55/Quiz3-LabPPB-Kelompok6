import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validUsers = {
    '232310042@student.ibik.ac.id': { name: 'Helena', password: 'Helena@123' },
    '232310030@student.ibik.ac.id': { name: 'Hery', password: 'Hery@123' },
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    const emailRegex = /^[0-9]{9}@student\.ibik\.ac\.id$/;
    if (emailRegex.test(value)) {
      setValidEmail('');
    } else {
      setValidEmail('Email is not valid');
    }
  };

  const handleSignIn = () => {
    setPasswordError('');

    if (validEmail) {
      Alert.alert('Error', validEmail);
      return;
    }

    if (password.length < 3) {
      setPasswordError('Minimum 3 characters');
      return;
    }

    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (!(hasLetter && hasNumber && hasSymbol)) {
      setPasswordError('Must contain letter, number & symbol');
      return;
    }

    const user = validUsers[email];
    if (user && user.password === password) {
      navigation.replace('Home', { name: user.name });
    } else {
      Alert.alert('Error', 'Email or password is incorrect');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

          <Text style={styles.title}>IBIK CANTEEN HUB</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor="#333"
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
          />
          {validEmail ? <Text style={styles.error}>{validEmail}</Text> : null}

          <TextInput
            placeholder="Password"
            placeholderTextColor="#333"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.49)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007a87',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#66c2cc',
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  loginButton: {
    backgroundColor: '#66c2cc',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginTop: 15,
  },
  loginButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
