import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders');
      
      const mappedOrders = data.map(order => ({
        id: order._id,
        customer: {
          fullName: order.shippingAddress.fullName || 'Customer',
          phone: order.shippingAddress.phoneNumber || '',
          address: order.shippingAddress.address || '',
          pincode: order.shippingAddress.pincode || '',
          notes: order.shippingAddress.notes || '',
        },
        items: order.orderItems.map(item => ({
          id: item.product,
          name: item.name,
          quantity: item.quantity || item.qty,
          price: item.price,
          image: item.image,
        })),
        total: order.totalPrice,
        status: order.isDelivered ? 'Delivered' : (order.orderStatus || 'Pending'),
        createdAt: order.createdAt,
        isGuest: !order.user,
        registeredUser: order.user ? { name: order.user.name, email: order.user.email } : null,
      }));

      setOrders(mappedOrders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      // Don't toast error here because guests checking track-order shouldn't see "unauthorized" if they aren't admin.
      // Admin will see it if they are logged in.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch all orders if the user is an admin
    if (user && user.role === 'admin') {
      fetchOrders();
    } else {
      // If not admin, just stop loading and don't fetch all orders
      setLoading(false);
    }
  }, [user]);

  const createOrder = async (orderData) => {
    try {
      const orderPayload = {
        orderItems: orderData.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          qty: item.quantity, // kept for backward compatibility if any backend code uses it
          image: item.image,
          price: item.price,
          product: item.id // Ensure items have proper IDs when fetching from backend
        })),
        shippingAddress: {
          fullName: orderData.customer.fullName,
          address: orderData.customer.address,
          pincode: orderData.customer.pincode,
          phoneNumber: orderData.customer.phone,
          landmark: orderData.customer.landmark || '',
          notes: orderData.customer.notes,
        },
        paymentMethod: 'Cash on Delivery', // Defaulting to COD for now
        itemsPrice: orderData.subtotal,
        taxPrice: 0,
        shippingPrice: orderData.shipping,
        totalPrice: orderData.total,
      };

      const { data } = await api.post('/orders', orderPayload);
      
      const newOrder = {
        id: data._id,
        customer: orderData.customer,
        items: orderData.items,
        total: orderData.total,
        status: 'Pending',
        createdAt: data.createdAt || new Date().toISOString(),
      };

      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (error) {
      console.error("Order creation failed", error);
      toast.error('Failed to create order');
      return null;
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      // Hit the real backend endpoint to update the status
      await api.put(`/orders/${id}/status`, { status: newStatus });
      
      setOrders(prev => prev.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      ));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, loading, refreshOrders: fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
