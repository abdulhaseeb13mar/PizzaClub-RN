/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  PcremoveCartAction,
  PcaddCartAction,
  PcsetCurrentProductAction,
  PcsetFavAction,
  PcremoveFavAction,
  PcresetCart,
} from '../PcStateManagement/PcActions';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../PcFrequentUsage/PcColor';
import {H_W} from '../PcFrequentUsage/PcResponsive';
import RefNavigation from '../PcFrequentUsage/PcRefNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import Loop from '../PcFrequentUsage/PcFlatList';
import PcHeader from '../PcFrequentUsage/PcHeader';
import {PcVerticalTile} from './PcHome';
import ItemCounterWrapper from '../PcFrequentUsage/PcItemCounterWrapper';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.PcCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.PcCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.PcCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const PcGoBack = () => RefNavigation.GoBack();

  const PcGoToSingleProduct = (item) => {
    props.PcsetCurrentProductAction(item);
    RefNavigation.Navigate('PcSP');
  };

  const PcinfoScreen = () => RefNavigation.Navigate('PcContact');

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
      <PcHeader
        leftIcon={Ionicons}
        leftIconName="arrow-back"
        leftIconColor="white"
        leftIconAction={PcGoBack}
        Title={<Text style={{fontSize: 22, color: 'white'}}>Cart</Text>}
      />
      <Loop
        horizontal={false}
        data={HorizontalCartArray}
        renderItem={({item}) => (
          <ItemCounterWrapper
            style={{marginVertical: HEIGHT * 0.025}}
            counterColor={colors.primary}
            counterContentColor="white"
            item={item}
            position="bottom"
            Counterlength={H_W.width * 0.2}>
            <PcVerticalTile
              item={item}
              PcGoToSingleProduct={PcGoToSingleProduct}
              PcCart={props.PcCart}
              isCart={true}
            />
          </ItemCounterWrapper>
        )}
      />
      <View
        style={{
          backgroundColor: colors.primary,
          marginBottom: -insets.bottom,
          paddingBottom: insets.bottom,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: H_W.width * 0.05,
            paddingVertical: HEIGHT * 0.01,
            marginBottom: HEIGHT * 0.015,
            borderTopWidth: 1,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: H_W.width * 0.02,
              paddingVertical: HEIGHT * 0.008,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Total Price
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: H_W.width * 0.02,
              paddingVertical: HEIGHT * 0.008,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              ${props.PcTotal}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={PcinfoScreen}
            disabled={props.PcTotalItems === 0}
            title="Checkout"
            titleStyle={{color: colors.primary, fontWeight: 'bold'}}
            buttonStyle={{
              backgroundColor: 'white',
              paddingVertical: HEIGHT * 0.015,
              borderRadius: 10,
            }}
            containerStyle={{width: '92%', borderRadius: 10}}
          />
        </View>
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  PcCart: state.PcCartReducer.items,
  PcTotal: state.PcCartReducer.totalAmount,
  PcFavs: state.PcToggleFav,
  PcTotalItems: state.PcCartReducer.totalItems,
});

export default connect(mapStateToProps, {
  PcremoveCartAction,
  PcaddCartAction,
  PcsetCurrentProductAction,
  PcsetFavAction,
  PcremoveFavAction,
  PcresetCart,
})(Cart);
