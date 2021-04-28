/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {H_W} from '../PcFrequentUsage/PcResponsive';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import {connect} from 'react-redux';
import {colors} from '../PcFrequentUsage/PcColor';
import NavigationRef from '../PcFrequentUsage/PcRefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  PcremoveFavAction,
  PcsetFavAction,
  PcaddCartAction,
  PcremoveCartAction,
  PcsetCurrentProductAction,
} from '../PcStateManagement/PcActions';
import Data from '../PcData';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import PcHeader from '../PcFrequentUsage/PcHeader';
import StarRating from '../starRating';
import burgerYellow from '../PcAllAssets/Images/burgerYellow.png';
import chickenyellow from '../PcAllAssets/Images/chickenyellow.png';
import drinkyellow from '../PcAllAssets/Images/drinkyellow.png';

function SingleProduct(props) {
  useEffect(() => {
    getTheCategory();
    getRandomPositions();
    checkIfFav();
  }, []);
  const PcProduct = props.PcProduct;
  const [fav, setFav] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [randomPositions, setRandomPositions] = useState([]);
  const [backLogo, setBackLogo] = useState(null);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const getTheCategory = () => {
    for (let Pc = 0; Pc < Data.category.length; Pc++) {
      if (Data.category[Pc].id === PcProduct.category) {
        setProductCategory(Data.category[Pc].category);
        Data.category[Pc].id === '1'
          ? setBackLogo(chickenyellow)
          : Data.category[Pc].id === '2'
          ? setBackLogo(burgerYellow)
          : setBackLogo(drinkyellow);
        break;
      }
    }
  };

  function getRandomPositions() {
    let positions = [];
    let marginLeft = 0;
    let rotation = 0;
    for (let fv = 0; fv < 5; fv++) {
      marginLeft = Math.random() * (0.9 - 0.04) + 0.04;
      rotation = Math.random() * (360 - 10) + 10;
      positions.push({marginLeft, rotation});
    }
    setRandomPositions(positions);
  }

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
    getRandomPositions();
    props.PcaddCartAction({...PcProduct});
  };

  const PcRemoveFromCart = () => {
    getRandomPositions();
    props.PcCart[PcProduct.id] !== undefined &&
      props.PcremoveCartAction(PcProduct);
  };

  const PcGotoCart = () => NavigationRef.Navigate('PcContact');
  const PcGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View
        style={{
          position: 'absolute',
          zIndex: -1,
          flex: 1,
        }}>
        {randomPositions.length > 0 &&
          randomPositions.map((pos, index) => (
            <FastImage
              key={index}
              source={backLogo}
              style={{
                width: H_W.width * 0.2,
                height: HEIGHT * 0.1,
                opacity: 0.5,
                marginLeft: H_W.width * pos.marginLeft,
                transform: [{rotate: `${pos.rotation}deg`}],
                marginTop: index !== 0 ? HEIGHT * 0.1 : 0,
              }}
              resizeMode="contain"
            />
          ))}
      </View>

      <ScrollView bounces={false}>
        <PcHeader
          leftIcon={Feather}
          leftIconName="corner-up-left"
          leftIconAction={PcGoBack}
        />
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={PcProduct.image}
            style={{
              width: H_W.width * 0.8,
              height: HEIGHT * 0.35,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
            }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 23,
            marginLeft: H_W.width * 0.04,
            width: H_W.width * 0.8,
            marginTop: HEIGHT * 0.02,
          }}>
          {PcProduct.name}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            color: colors.lightGrey3,
            marginLeft: H_W.width * 0.04,
            width: H_W.width * 0.8,
            marginTop: HEIGHT * 0.01,
          }}>
          {productCategory}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: H_W.width * 0.04,
            marginTop: HEIGHT * 0.01,
          }}>
          <StarRating rating={PcProduct.rating} size={H_W.width * 0.22} />
          <Text
            style={{
              marginLeft: H_W.width * 0.05,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {PcProduct.rating}
          </Text>
        </View>
        <Text
          style={{
            marginLeft: H_W.width * 0.04,
            marginTop: HEIGHT * 0.02,
            fontSize: 15.5,
            width: H_W.width * 0.9,
          }}>
          {PcProduct.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: H_W.width * 0.04,
            marginTop: HEIGHT * 0.02,
          }}>
          <TouchableOpacity
            onPress={toggleFav}
            style={{
              paddingHorizontal: H_W.width * 0.027,
              borderRadius: 15,
              paddingVertical: HEIGHT * 0.015,
              backgroundColor: colors.secondary,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
            <FontAwesome
              name={fav ? 'heart' : 'heart-o'}
              color={colors.primary}
              size={27}
            />
          </TouchableOpacity>
          <View
            style={{
              width: H_W.width * 0.45,
              height: HEIGHT * 0.063,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={PcRemoveFromCart}
              style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: H_W.width * 0.015,
                paddingVertical: HEIGHT * 0.007,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
              }}>
              <AntDesign name="minus" size={22} color={colors.primary} />
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 24, color: 'black'}}>
              {props.PcCart[PcProduct.id] !== undefined
                ? props.PcCart[PcProduct.id].added
                : 0}
            </Text>
            <TouchableOpacity
              onPress={PcAddToCart}
              style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: H_W.width * 0.015,
                paddingVertical: HEIGHT * 0.007,
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
              }}>
              <AntDesign name="plus" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: HEIGHT * 0.03,
            marginBottom: HEIGHT * 0.02,
            overflow: 'visible',
          }}>
          <TouchableOpacity
            onPress={PcAddToCart}
            style={{
              width: H_W.width * 0.28,
              height: H_W.width * 0.28,
              backgroundColor: colors.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: H_W.width * 0.02,
              paddingVertical: HEIGHT * 0.01,
              borderRadius: H_W.width * 0.16,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.primary,
                textAlign: 'center',
                fontSize: 23,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
              }}>
              Add to Cart!
            </Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, {
  PcsetFavAction,
  PcremoveFavAction,
  PcremoveCartAction,
  PcsetCurrentProductAction,
  PcaddCartAction,
})(React.memo(SingleProduct));
