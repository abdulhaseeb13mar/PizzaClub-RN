/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {H_W} from '../PcFrequentUsage/PcResponsive';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../PcFrequentUsage/PcColor';
import NavigationRef from '../PcFrequentUsage/PcRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  PcremoveFavAction,
  PcsetFavAction,
  PcaddCartAction,
  PcremoveCartAction,
  PcsetCurrentProductAction,
} from '../PcStateManagement/PcActions';
import Data from '../PcData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import PcHeader from '../PcFrequentUsage/PcHeader';
import Ps from '../PcAllAssets/Images/Pasta5.png';
import StarRating from '../starRating';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const PcProduct = props.PcProduct;
  const [fav, setFav] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const checkIfFav = () => {
    for (let Pc = 0; Pc < props.PcFavs.length; Pc++) {
      if (props.PcFavs[Pc].id === PcProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.PcremoveFavAction(PcProduct.id)
      : props.PcsetFavAction(PcProduct);
    setFav(!fav);
  };

  const PcAddToCart = () => {
    props.PcaddCartAction({...PcProduct});
  };

  const PcRemoveFromCart = () => {
    props.PcCart[PcProduct.id] !== undefined &&
      props.PcremoveCartAction(PcProduct);
  };

  const PcGotoCart = () => NavigationRef.Navigate('PcContact');
  const PcGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      statusBar={colors.primary}
      style={{backgroundColor: 'white'}}
      barStyle="light-content">
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
      <ScrollView bounces={false}>
        <Entypo
          name="cross"
          color="white"
          size={(H_W.width / HEIGHT) * 60}
          style={{marginTop: HEIGHT * 0.01, marginLeft: H_W.width * 0.02}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingLeft: H_W.width * 0.03,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              paddingHorizontal: H_W.width * 0.02,
              paddingVertical: HEIGHT * 0.008,
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
            }}>
            <Ionicons name="heart-outline" color={colors.primary} size={35} />
          </TouchableOpacity>
          <FastImage
            source={Ps}
            resizeMode="contain"
            style={{
              width: H_W.width * 0.8,
              height: HEIGHT * 0.42,
              marginRight: -H_W.width * 0.08,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 10.27,
              overflow: 'visible',
            }}
          />
        </View>
        <Text
          style={{
            color: colors.primary,
            fontWeight: 'bold',
            fontSize: (H_W.width / HEIGHT) * 65,
            paddingHorizontal: H_W.width * 0.03,
            marginTop: HEIGHT * 0.01,
          }}>
          Super Supreme
        </Text>
        <View
          style={{
            marginLeft: H_W.width * 0.03,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <StarRating rating={3.5} size={(H_W.width / HEIGHT) * 180} />
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.primary,
              marginLeft: H_W.width * 0.04,
              fontSize: (H_W.width / HEIGHT) * 35,
            }}>
            3.5
          </Text>
        </View>
        <Text
          style={{
            paddingHorizontal: H_W.width * 0.03,
            marginTop: HEIGHT * 0.025,
            color: colors.darkGray,
            fontSize: (H_W.width / HEIGHT) * 32,
          }}>
          Beef with Pepperoni, Sausage, Smoked Chicken, Onion, Green Pepper,
          Mushrooms & Black Olives
        </Text>
      </ScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    PcProduct: state.PcCrntPrdtReducer,
    PcFavs: state.PcToggleFav,
    totalItems: state.PcCartReducer.totalItems,
    PcCart: state.PcCartReducer.items,
  };
};

const border = {
  borderColor: 'red',
  borderWidth: 1,
};

export default connect(mapStateToProps, {
  PcsetFavAction,
  PcremoveFavAction,
  PcremoveCartAction,
  PcsetCurrentProductAction,
  PcaddCartAction,
})(React.memo(SingleProduct));
