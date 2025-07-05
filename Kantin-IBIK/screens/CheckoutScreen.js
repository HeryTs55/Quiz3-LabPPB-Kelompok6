import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';

export default function CheckoutScreen({ route, navigation }) {
  const { cartItems = [], name } = route.params || {};

  const userMap = {
    Helena: { npm: '232310042', fullname: 'Helena Jemima Widjaja' },
    Hery: { npm: '232310030', fullname: 'Hery Tua Sigalingging' },
  };

  const userKey = userMap[name] ? name : 'Helena';

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ImageBackground
      source={require('../assets/background2.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Confirm Your Order</Text>

          <View style={styles.userInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userMap[userKey].fullname}</Text>
            <Text style={styles.label}>NPM:</Text>
            <Text style={styles.value}>{userMap[userKey].npm}</Text>
          </View>

          <View style={styles.separator} />

          {cartItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>Rp {item.price}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home', {
                name: userKey,
                cartItems: cartItems, 
              })
            }
          >
            <Text style={styles.addMore}>+ Add More Items</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>Rp {totalPrice}</Text>
          </View>

          <View style={styles.readyBox}>
            <Text style={styles.readyTitle}>Order Status</Text>
            <Text style={styles.readyText}>Your order will be ready in ~30 minutes.</Text>
            <Text style={styles.readyText}>
              Please bring cash to pay & pick up at the counter.
            </Text>
          </View>
        </ScrollView>
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
    padding: 25,
    paddingTop: 130,
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007a87',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
    color: '#007a87',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
     width: 80, 
     height: 80, 
     borderRadius: 10, 
     marginRight: 12 
    },
  itemInfo: { flex: 1 },
  itemName: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    color: '#007a87',
  },
  itemDetails: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#007a87',
    fontSize: 15,
  },
  addMore: {
    textAlign: 'right',
    color: '#007a87',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#007a87',
  },
  readyBox: {
    backgroundColor: '#e6f7f8',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  readyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#007a87',
    marginBottom: 8,
  },
  readyText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
});
