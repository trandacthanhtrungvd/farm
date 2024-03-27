import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const DeviceItem = ({ name, status, location }) => {
  return (
    <View style={styles.deviceItem}>
      <Text style={styles.deviceName}>{name}</Text>
      <Text style={styles.deviceStatus}>{status}</Text>
      <Text style={styles.deviceLocation}>{location}</Text>
    </View>
  );
};

const DeviceList = () => {
  const [devices] = useState([
    {
      name: 'Vòi nước 1',
      status: 'Bật',
      location: 'Khu vườn',
    },
    {
      name: 'Vòi nước 2',
      status: 'Tắt',
      location: 'Nhà kính',
    },
    {
      name: 'Vòi nước 3',
      status: 'Bật',
      location: 'Ao cá',
    },
  ]);

  // useEffect(() => {
  //   // Gọi API để lấy dữ liệu về các thiết bị vòi nước
  //   // fetch('https://example.com/api/devices')
  //   //   .then(response => response.json())
  //   //   .then(data => setDevices(data));
  //   setDevices(0);
  // }, []);

  return (
    <FlatList
      data={devices}
      renderItem={({ item }) => <DeviceItem {...item} />}
      keyExtractor={item => item.id}
    />
  );
};


const styles = StyleSheet.create({
  deviceItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '',
    marginBottom: 10,
    color: '#000',
  },
  deviceName: {
    fontSize: 18,
  },
  deviceStatus: {
    fontSize: 16,
  },
  deviceLocation: {
    fontSize: 14,
  },
});

export default DeviceList;
