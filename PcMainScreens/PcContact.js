/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../PcFrequentUsage/PcResponsive';
import {colors} from '../PcFrequentUsage/PcColor';
import {Button, Overlay} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isFormValid} from '../PcFrequentUsage/Pcvalidation';
import NavPointer from '../PcFrequentUsage/PcRefNavigation';
import {
  PcUserAction,
  PcresetCart,
  PcsetCurrentProductAction,
} from '../PcStateManagement/PcActions';
import UseHeader from '../PcFrequentUsage/PcHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Loop from '../PcFrequentUsage/PcFlatList';
import ItemCounterWrapper from '../PcFrequentUsage/PcItemCounterWrapper';
import {PcVerticalTile} from './PcHome';

const ConfirmOrder = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.PcCart]);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);
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

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.PcCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.PcCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const PcConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        MoveToConfirmOrder();
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

  const MoveToConfirmOrder = () => {
    props.PcresetCart();
    NavPointer.Push('PcConfirmOrder');
  };

  const closeModal = () => {
    setShowModal(false);
    props.PcresetCart();
    NavPointer.NavigateAndReset('PcHome');
  };
  const PcGoToSingleProduct = (item) => {
    props.PcsetCurrentProductAction(item);
    NavPointer.Navigate('PcSP');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const PcGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={Feather}
          leftIconName="corner-up-left"
          leftIconColor={colors.primary}
          leftIconAction={PcGoBack}
          Title={<Text style={styles.PcContact2}>Checkout</Text>}
        />
        <Loop
          data={HorizontalCartArray}
          renderItem={({item}) => (
            <ItemCounterWrapper
              style={{marginVertical: HEIGHT * 0.025}}
              counterColor={colors.secondary}
              counterContentColor={colors.primary}
              item={item}
              position="top"
              Counterlength={H_W.width * 0.2}>
              <PcVerticalTile
                item={item}
                PcGoToSingleProduct={PcGoToSingleProduct}
              />
            </ItemCounterWrapper>
          )}
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
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
              Total Price
            </Text>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
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
              borderBottomWidth: 1,
            }}>
            <Text style={{color: 'black'}}>Payment Method</Text>
            <Text style={{color: 'black'}}>Cash on Delivery</Text>
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
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.13}}
                onChangeText={changeAddress}
                multiline
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
            <MaterialCommunityIcons
              name="bottle-tonic-outline"
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
    color: colors.primary,
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
    borderRadius: 10,
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
    backgroundColor: colors.secondary,
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
