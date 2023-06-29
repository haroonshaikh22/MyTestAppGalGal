/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Button,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../Data/Color';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [color, setColor] = useState(Color.black);
  const [showDataModal, setShowdataModal] = useState(false);
  const [showData, setShowData] = useState({});
  const [getanme, setGetname] = useState('');
  const [getmobile, setGetmobile] = useState('');
  const [getemail, setGetemail] = useState('');
  const [getgender, setGetgender] = useState('');
  const [getpincode, setGetpincode] = useState('');
  const [getcity, setGetcity] = useState('');
  const [getState, setGetstate] = useState('');

  let AllData = {
    name: base64.encode(name),
    email: base64.encode(email),
    mobile: base64.encode(mobile),
    dob: base64.encode(dob),
    gender: base64.encode(gender),
    zip: base64.encode(zip),
    city: base64.encode(city),
    state: base64.encode(state),
    color: base64.encode(color),
  };

  const zipcode_data = [
    {
      zipcode: '110011',
      city: 'Central Delhi',
      state: 'ND',
    },
    {
      zipcode: '400011',
      city: 'Mumbai',
      state: 'MH',
    },
    {
      zipcode: '600001',
      city: 'Chennai',
      state: 'TN',
    },
    {
      zipcode: '700001',
      city: 'Kolkata',
      state: 'WB',
    },
  ];

  const checkPin = (pincode: any) => {
    setZip(pincode);
    if (pincode.length >= 3) {
      let newData = zipcode_data.find(data => data.zipcode.startsWith(pincode));
      if (newData) {
        setCity(newData.city);
        setState(newData.state);
      } else {
        setCity('');
        setState('');
      }
    }
  };

  function isNumberValid(number: any) {
    let numberRegex = /^[6-9]\d{9}$/;
    return numberRegex.test(number);
  }
  function isEmailValid(email) {
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegex.test(email);
  }

  function isDateValid(date) {
    let dateRegex = /^([0-2]\d|3[0-1])-(0\d|1[0-2])-\d{4}$/;
    return dateRegex.test(date);
  }

  const submitHandler = () => {
    if (
      name !== '' &&
      email !== '' &&
      mobile !== '' &&
      dob !== '' &&
      gender !== '' &&
      zip !== '' &&
      city !== '' &&
      state !== ''
    ) {
      if (!isNumberValid(mobile)) {
        Alert.alert('Please enter valid Mobile number');
      } else if (!isEmailValid(email)) {
        Alert.alert('Please enter valid Email address');
      } else if (!isDateValid(dob)) {
        Alert.alert('Please enter valid Dob');
      } else {
        const SubmitData = AllData;
        const _storeData = async () => {
          try {
            await AsyncStorage.setItem(
              'formData',
              JSON.stringify({SubmitData}),
            );
            Alert.alert('Sucessfull, Form Submitted');
            setName('');
            setMobile('');
            setEmail('');
            setGender('');
            setZip('');
          } catch (error) {
            Alert.alert('Error, to submit form');
          }
        };
        _storeData();
      }
    } else {
      ToastAndroid.show('Please Fill form', ToastAndroid.SHORT);
    }
  };

  const ShowDataHandler = () => {
    const getdataFunc = async () => {
      try {
        const getData = await AsyncStorage.getItem('formData');
        if (getData !== null) {
          setShowdataModal(false);
        } else {
        }
      } catch (error) {
        Alert.alert('Failed to get Data');
      }
    };
    getdataFunc();
  };

  const ShowdataView = (data: any) => {
    return (
      <Modal
        visible={showDataModal}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30%',
            width: '80%',
            alignSelf: 'center',
          }}>
          <Text>Form Details</Text>

          <View>
            <Text>{`Name  : `}</Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.body}>
        <Text style={styles.header}>User Form</Text>
        <ShowdataView data={showData} />
        <View style={styles.textInputContainer}>
          <Text style={[styles.inputTitle, {color: color}]}>Name</Text>
          <TextInput
            placeholder="Enter Your Name"
            value={name}
            style={styles.textInputStyle}
            onChangeText={text =>
              setName(text.replace(/[^A-Za-z\s']/g, '').toUpperCase())
            }
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={[styles.inputTitle, {color: color}]}>Email</Text>
          <TextInput
            placeholder="Enter Your Email Id"
            keyboardType="email-address"
            value={email}
            style={styles.textInputStyle}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={[styles.inputTitle, {color: color}]}>Mobile Number</Text>
          <TextInput
            placeholder="Enter Mobile Number"
            keyboardType="number-pad"
            value={mobile}
            style={styles.textInputStyle}
            onChangeText={text => setMobile(text)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={[styles.inputTitle, {color: color}]}>Date Of Birth</Text>
          <TextInput
            placeholder="DOB"
            keyboardType="number-pad"
            value={dob}
            style={styles.textInputStyle}
            onChangeText={text => setDob(text)}
          />
        </View>

        <View>
          <Text style={[styles.inputTitle, {color: color}]}>Select Gender</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: '5%',
            }}>
            <View style={{flexDirection: 'row', marginRight: 20}}>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: gender === 'Male' ? color : 'grey',
                    borderColor: gender === 'Male' ? '#44226E' : 'grey',
                  },
                ]}
                onPress={() => {
                  setGender('Male');
                }}>
                <View
                  style={[
                    styles.innerButton,
                    {backgroundColor: gender === 'Male' ? '#44226E' : 'white'},
                  ]}></View>
              </TouchableOpacity>
              <Text>Male</Text>
            </View>
            <View style={{flexDirection: 'row', marginRight: 20}}>
              <TouchableOpacity
                onPress={() => {
                  setGender('Female');
                }}
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: gender === 'Female' ? color : 'grey',
                    borderColor: gender === 'Female' ? '#44226E' : 'grey',
                  },
                ]}>
                <View
                  style={[
                    styles.innerButton,
                    {
                      backgroundColor:
                        gender === 'Female' ? '#44226E' : 'white',
                    },
                  ]}></View>
              </TouchableOpacity>
              <Text>Female</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setGender('others');
                }}
                style={[
                  styles.selectButton,
                  {
                    backgroundColor: gender === 'others' ? color : 'grey',
                    borderColor: gender === 'others' ? '#44226E' : 'grey',
                  },
                ]}>
                <View
                  style={[
                    styles.innerButton,
                    {
                      backgroundColor:
                        gender === 'others' ? '#44226E' : 'white',
                    },
                  ]}></View>
              </TouchableOpacity>
              <Text>Others</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
            }}>
            <View style={styles.textInputContainer}>
              <Text style={[styles.inputTitle, {color: color}]}>ZIP Code</Text>
              <TextInput
                placeholder="Enter Your ZIP code"
                keyboardType="number-pad"
                value={zip}
                style={styles.textInputStyle}
                onChangeText={text => checkPin(text)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: '45%'}}>
              <Text style={[styles.inputTitle, {color: color}]}>City</Text>
              <TextInput
                placeholder="City"
                value={city}
                style={styles.textInputStyle}
                onChangeText={text => setCity(text)}
              />
            </View>

            <View style={{width: '45%'}}>
              <Text style={[styles.inputTitle, {color: color}]}>State</Text>
              <TextInput
                placeholder="StateP"
                value={state}
                style={styles.textInputStyle}
                onChangeText={text => setState(text)}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '10%',
          }}>
          <Text style={styles.inputTitle}>Select Color</Text>
        </View>
        <View
          style={{
            width: '50%',
            height: 40,
            marginTop: 20,

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => submitHandler()}
            style={{
              backgroundColor: '#4466F2',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
            margin: 20,
          }}>
          <TouchableOpacity
            onPress={() => ShowDataHandler()}
            style={{
              backgroundColor: '#4466F2',
              width: '30%',
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}>
            <Text>Show Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#4466F2',
              width: '30%',
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '700',
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  textInputContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '5%',
  },
  textInputStyle: {
    marginTop: '2%',
    borderWidth: 1,
    width: '90%',
    padding: 10,
    borderRadius: 10,
  },
  selectButton: {
    borderWidth: 2,
    borderRadius: 50,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    marginRight: 5,
  },
  innerButton: {
    borderRadius: 50,
    padding: 5,
  },
});
