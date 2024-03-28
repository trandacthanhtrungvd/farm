import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image, Switch} from 'react-native';
import DeviceItem from '@components/DeviceItem';

const OnOffDevices = () => {
  const [devices, setDevices] = useState([]);

  const handleStatusChange = (deviceName, newStatus) => {
    const updatedDeviceList = devices.map(device => {
      if (device.name === deviceName) {
        return {...device, status: newStatus};
      }
      return device;
    });
    setDevices(updatedDeviceList);
  };

  // const handleIntensityChange = (deviceName, intensity) => {
  //   const updatedDeviceList = devices.map(device => {
  //     if (device.name === deviceName) {
  //       return {...device, intensity: intensity};
  //     }
  //     return device;
  //   });
  //   setDevices(updatedDeviceList);
  // };

  // useEffect(() => {
  //   // Gọi API để lấy dữ liệu về các thiết bị vòi nước
  //   // fetch('https://example.com/api/devices')
  //   //   .then(response => response.json())
  //   //   .then(data => setDevices(data));
  //   setDevices(0);
  // }, []);

  // TODO: Location, Intensity, onIntensityChange
  useEffect(() => {
    fetch('https://io.adafruit.com/api/v2/tdttvd/feeds')
      .then(response => response.json())
      .then(json => {
        data = json.map(device => {
          return {
            name: device.name,
            status: device.last_value,
            key: device.key,
          }
        });
        console.log(data);
        setDevices(data);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <View style={styles.deviceList}>
      {/* <FlatList
      data={devices}
      renderItem={({ item }) => <DeviceItem {...item} />}
      keyExtractor={item => item.id}
    /> */}
      {devices.map(device => (
        <DeviceItem
          key={device.key}
          device_key={device.key}
          name={device.name}
          status={device.status}
          // location={device.location}
          // intensity={device.intensity}
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
  }
});

export default OnOffDevices;
