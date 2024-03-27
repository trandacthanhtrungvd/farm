
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Switch } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';


const DeviceItem = ({ name, status, location, intensity , onStatusChange, onIntensityChange  }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(status === 'Bật');

  const handleSwitchChange = () => {
    const newStatus = isSwitchOn ? 'Tắt' : 'Bật';
    setIsSwitchOn(newStatus === 'Bật') ;
    onStatusChange(name, newStatus);
  };
  const handleIntensityChange = (value) => {
    if (value === 0 && isSwitchOn) handleSwitchChange;
    else {
      if (!isSwitchOn) handleSwitchChange;
      
    }
    onIntensityChange(name, value);
  };
  return (
    <View style={styles.deviceItem}>
      <Image
        source={{uri: 'https://media.istockphoto.com/id/1384267221/vi/vec-to/v%C3%B2i-phun-n%C6%B0%E1%BB%9Bc-t%C6%B0%E1%BB%9Bi-c%E1%BB%8F-h%C3%ACnh-minh-h%E1%BB%8Da-vector.jpg?s=170667a&w=0&k=20&c=9KdZR_6legqnr6glkSiN_9Z0jbwMxZ1knk-w5ov1-LA='}}
        style={styles.imgItem} />
      <View style={styles.displayItemText}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceStatus}>{status}</Text>
        <Text style={styles.deviceLocation}>{location}</Text>
        <View style={styles.swi_and_sli}>
          <View>
          <Switch
          trackColor={{false: '#767577', true: '#04dd28'}}
          thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={toggleSwitch}
          // value={status === 'Bật' ? true : false}
          value={isSwitchOn}
          onValueChange={handleSwitchChange}
          />
          </View>
          <View style={styles.sli}>
            <Slider     
                    maximumTrackTintColor="#d3d3d3"
                    minimumTrackTintColor="#1fb28a"
                    thumbTintColor="#ffffff"
                    
                    value={intensity/100}
                    onValueChange={value => handleIntensityChange(value)}
                />
          </View>
        </View>
      </View>
    </View>
  );
};

const OnOffDevices = () => {
  const [devices,setDevices] = useState([
    {
      name: 'Vòi nước 1',
      status: 'Bật',
      location: 'Khu vườn',
      intensity: 100,
    },
    {
      name: 'Vòi nước 2',
      status: 'Tắt',
      location: 'Nhà kính',
      intensity: 70,
    },
    {
      name: 'Vòi nước 3',
      status: 'Bật',
      location: 'Ao cá',
      intensity: 50,
    },
  ]);
  const handleStatusChange = (deviceName, newStatus) => {
    const updatedDeviceList = devices.map(device => {
      if (device.name === deviceName) {
        return { ...device, status: newStatus };
      }
      return device;
    });
    setDevices(updatedDeviceList);
  };
  const handleIntensityChange = (deviceName, intensity) => {
    const updatedDeviceList = devices.map(device => {
      if (device.name === deviceName) {
        return { ...device, intensity: intensity };
      }
      return device;
    });
    setDevices(updatedDeviceList);
  }

  
  // useEffect(() => {
  //   // Gọi API để lấy dữ liệu về các thiết bị vòi nước
  //   // fetch('https://example.com/api/devices')
  //   //   .then(response => response.json())
  //   //   .then(data => setDevices(data));
  //   setDevices(0);
  // }, []);

  return (
    <View style = {styles.deviceList}>
    {/* <FlatList
      data={devices}
      renderItem={({ item }) => <DeviceItem {...item} />}
      keyExtractor={item => item.id}
    /> */}
    {devices.map(device => (
        <DeviceItem
          key={device.name}
          name={device.name}
          status={device.status}
          location={device.location}
          intensity={device.intensity}
          onStatusChange={handleStatusChange}
        />
      ))}
    </View>
  );
};



const styles = StyleSheet.create({
  deviceList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
  },
  deviceItem: {
    width: 300,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#00aeff',
    marginBottom: 10,
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  displayItemText: {
    paddingLeft: 10,
    width:150,
  },
  imgItem: {
    width: 100,
    height: 100,
  },
  swi_and_sli: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sli: {
    width: 80,
    color: 'white',
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

export default OnOffDevices;

