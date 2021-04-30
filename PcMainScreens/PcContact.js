/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../PcFrequentUsage/PcResponsive';
import {colors} from '../PcFrequentUsage/PcColor';
import {Button, Overlay} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {isFormValid} from '../PcFrequentUsage/Pcvalidation';
import NavPointer from '../PcFrequentUsage/PcRefNavigation';
import {
  PcUserAction,
  PcresetCart,
  PcsetCurrentProductAction,
} from '../PcStateManagement/PcActions';
import UseHeader from '../PcFrequentUsage/PcHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConfirmOrder = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');

  const PcConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowModal(true);
      }, 2000);
      props.PcUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  // const CallApi = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       'https://reactnativeapps.herokuapp.com/customers',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           firstname: firstName,
  //           address: address,
  //           phonenumber: phone,
  //           email: email,
  //           appname: 'BountiFul Bags',
  //         }),
  //       },
  //     );
  //     const response = await res.json();
  //     setLoading(false);
  //     response.status ? setShowModal(true) : ShowToast('Some error occurred');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  // const MoveToConfirmOrder = () => {
  //   props.PcresetCart();
  //   NavPointer.Push('PcConfirmOrder');
  // };

  const closeModal = () => {
    setShowModal(false);
    props.PcresetCart();
    NavPointer.NavigateAndReset('PcHome');
  };
  // const PcGoToSingleProduct = (item) => {
  //   props.PcsetCurrentProductAction(item);
  //   NavPointer.Navigate('PcSP');
  // };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const PcGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen
      statusColor={colors.primary}
      barStyle="light-content"
      style={{backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`}}>
      <View
        style={{
          width: H_W.width * 1.5,
          height: HEIGHT * 0.35,
          marginLeft: -H_W.width * 0.2,
          marginTop: -HEIGHT * 0.08,
          backgroundColor: colors.primary,
          zIndex: -1,
          position: 'absolute',
          transform: [{rotate: '13deg'}],
        }}
      />
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={Ionicons}
          leftIconName="arrow-back"
          leftIconColor="white"
          leftIconAction={PcGoBack}
          Title={<Text style={styles.PcContact2}>Checkout</Text>}
        />
        <View
          style={{
            paddingHorizontal: H_W.width * 0.035,
            paddingTop: HEIGHT * 0.03,
            marginBottom: HEIGHT * 0.04,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
              Total Price
            </Text>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
              $ {props.total}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: HEIGHT * 0.01,
              paddingBottom: HEIGHT * 0.03,
              borderBottomWidth: 3,
              borderBottomColor: 'white',
            }}>
            <Text style={{color: 'white'}}>Payment Method</Text>
            <Text style={{color: 'white'}}>Cash on Delivery</Text>
          </View>
        </View>
        <View style={styles.PcPersonalInfoWrapper}>
          <View style={styles.PcSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.PcPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.PcPersonalInfoInputWrapper}>
              <Ionicons name="person" size={20} color={colors.primary} />
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.PcSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.PcPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.PcPersonalInfoInputWrapper}>
              <Ionicons name="mail" size={20} color={colors.primary} />
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.PcSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.PcPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              CONTACT NUMBER<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.PcPersonalInfoInputWrapper}>
              <Ionicons
                name="md-phone-portrait-sharp"
                size={20}
                color={colors.primary}
              />
              <TextInput
                placeholder="Contact Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
          <View style={styles.PcSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.PcPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.PcPersonalInfoInputWrapper}>
              <Ionicons
                name="location-sharp"
                size={20}
                color={colors.primary}
              />
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeAddress}
                placeholderTextColor={colors.darkGray}
              />
            </View>
          </View>
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.PcModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <FontAwesome5
              name="hamburger"
              size={H_W.width * 0.25}
              color="white"
            />
            <Text style={styles.PcModalHeadText}>
              YOUR ORDER HAS BEEN CONFIRMED!
            </Text>
          </View>
        </Overlay>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20,
          }}>
          <Button
            raised
            loading={loading}
            onPress={PcConfirm}
            disabled={props.PcTotalItems === 0}
            title="CONFIRM ORDER"
            titleStyle={{fontWeight: 'bold', fontSize: 20}}
            containerStyle={{width: '95%'}}
            buttonStyle={{
              paddingVertical: HEIGHT * 0.02,
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.46,
              shadowRadius: 11.14,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.PcCartReducer.totalAmount,
    PcCart: state.PcCartReducer.items,
    PcTotalItems: state.PcCartReducer.totalItems,
  };
};

export default connect(mapStateToProps, {
  PcUserAction,
  PcresetCart,
  PcsetCurrentProductAction,
})(React.memo(ConfirmOrder));

const styles = StyleSheet.create({
  PcContact2: {
    color: 'white',
    fontSize: 22,
  },
  PcModalHeadText: {
    fontSize: H_W.width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  PcModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
  Input: {
    width: H_W.width * 0.81,
    color: colors.primary,
    fontWeight: 'bold',
  },
  PcInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  PcPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1.5,
    backgroundColor: 'white',
  },
  PcPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  PcSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  PcPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
