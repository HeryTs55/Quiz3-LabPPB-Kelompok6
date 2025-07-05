import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground
} from 'react-native';
import { products } from '../data/products';

export default function HomeScreen({ route, navigation }) {
  const { name } = route.params;

  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (route.params?.cartItems) {
      setCartItems(route.params.cartItems);
    }
  }, [route.params?.cartItems]);


  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

  const addToCart = () => {
    const existing = cartItems.find(item => item.id === selectedProduct.id);
    if (existing) {
      const updated = cartItems.map(item =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...selectedProduct, quantity }]);
    }
    setModalVisible(false);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const filterItems = (type) => {
    return products
      .filter(p => p.type === type)
      .filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  const renderCategory = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => openModal(item)}
            style={styles.itemCard}
          >
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.price}>Rp {item.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/background2.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.welcome}>Welcome, {name}!</Text>

          <TextInput
            placeholder="🔍︎ What do you want to eat today?"
            placeholderTextColor="#555"
            style={styles.searchBar}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {renderCategory('Food', filterItems('Makanan'))}
          {renderCategory('Drinks', filterItems('Minuman'))}
          {renderCategory('Snacks', filterItems('Snack'))}
        </ScrollView>

        {totalCount > 0 && (
          <View style={styles.cartBar}>
            <View style={styles.cartLeft}>
              <Text style={styles.cartIcon}>🛒</Text>
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalCount}</Text>
              </View>
              <Text style={styles.cartTotal}>Rp {totalPrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                navigation.navigate('Checkout', { 
                  cartItems: cartItems,
                  name: name, })
              }
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={selectedProduct?.image} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <Text style={styles.modalPrice}>Rp {selectedProduct?.price}</Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <Text style={styles.qtyButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => setQuantity(q => q + 1)}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addToCart}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    padding: 20,
    paddingTop: 120,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007a87',
    marginBottom: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#66c2cc',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 25,
    backgroundColor: '#f7f7f7',
  },
  section: { marginBottom: 30 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007a87',
    marginBottom: 10,
  },
  itemCard: {
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  itemImage: { 
    width: 90, 
    height: 90, 
    borderRadius: 10, 
    marginBottom: 8 
  },
  itemName: { 
    fontWeight: '600', 
    fontSize: 14, 
    marginBottom: 4 
  },
  price: { 
    fontWeight: 'bold', 
    color: '#007a87' },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: { 
    width: 180, 
    height: 180, 
    borderRadius: 12, 
    marginBottom: 10 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  modalPrice: { 
    fontSize: 18, 
    color: '#007a87', 
    fontWeight: 'bold' 
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  qtyButton: {
    backgroundColor: '#66c2cc',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  qtyButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' },
  qtyText: { 
    marginHorizontal: 25, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  addButton: {
    backgroundColor: '#007a87',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 50,
  },
  addButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 }
    ,
  cartBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cartLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  cartIcon: { fontSize: 26 },
  cartBadge: {
    backgroundColor: '#007a87',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: -10,
    marginRight: 10,
  },
  cartBadgeText: { 
    color: '#fff', 
    fontSize: 12 
  },
  cartTotal: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  checkoutButton: {
    backgroundColor: '#66c2cc',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});
