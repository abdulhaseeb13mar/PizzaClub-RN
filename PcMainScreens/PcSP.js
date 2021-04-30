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
import Loop from '../PcFrequentUsage/PcFlatList';
import {
  PcremoveFavAction,
  PcsetFavAction,
  PcaddCartAction,
  PcremoveCartAction,
  PcsetCurrentProductAction,
} from '../PcStateManagement/PcActions';
import Data from '../PcData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import StarRating from '../starRating';

function SingleProduct(props) {
  useEffect(() => {
    getToppings_Size();
    checkIfFav();
  }, []);
  const PcProduct = props.PcProduct;
  const [fav, setFav] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [currSize, setCurrSize] = useState([]);
  const [currToppings, setCurrToppings] = useState([]);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const getToppings_Size = () => {
    let sizeArr = [];
    let ToppingArr = [];
    Data.topping.map((item) => {
      if (item.productid === PcProduct.id) {
        sizeArr.push(item.size);
        ToppingArr.push(item.topping);
      }
    });
    setSizes(sizeArr);
    setToppings(ToppingArr);
    sizeArr.length > 0 ? setCurrSize(sizeArr[0]) : setCurrSize('NoSize');
  };

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
    props.PcaddCartAction({...PcProduct, size: currSize});
  };

  const PcRemoveFromCart = () => {
    props.PcCart[`${PcProduct.id}_${currSize}`] !== undefined &&
      props.PcremoveCartAction({...PcProduct, size: currSize});
  };

  const toggleTopping = (item) => {
    let copy = [...currToppings];
    let isAdded = true;
    for (let Pc = 0; Pc < copy.length; Pc++) {
      const element = copy[Pc];
      if (element === item) {
        copy[Pc] = '';
        isAdded = false;
        break;
      }
    }
    isAdded && copy.push(item);
    setCurrToppings(copy);
  };

  // const PcGotoCart = () => NavigationRef.Navigate('PcContact');
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
        <TouchableOpacity onPress={PcGoBack}>
          <Entypo
            name="cross"
            color="white"
            size={(H_W.width / HEIGHT) * 60}
            style={{marginTop: HEIGHT * 0.01, marginLeft: H_W.width * 0.02}}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingLeft: H_W.width * 0.03,
          }}>
          <TouchableOpacity
            onPress={toggleFav}
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
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              color={colors.primary}
              size={35}
            />
          </TouchableOpacity>
          <FastImage
            source={PcProduct.image}
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
          {PcProduct.name}
        </Text>
        <View
          style={{
            marginLeft: H_W.width * 0.03,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <StarRating
            rating={PcProduct.rating}
            size={(H_W.width / HEIGHT) * 180}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.primary,
              marginLeft: H_W.width * 0.04,
              fontSize: (H_W.width / HEIGHT) * 35,
            }}>
            {PcProduct.rating}
          </Text>
        </View>
        <Text
          style={{
            paddingHorizontal: H_W.width * 0.03,
            marginTop: HEIGHT * 0.025,
            color: colors.darkGray,
            fontSize: (H_W.width / HEIGHT) * 32,
          }}>
          {PcProduct.discription}
        </Text>
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: HEIGHT * 0.02,
            paddingHorizontal: H_W.width * 0.035,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.primary,
              paddingHorizontal: H_W.width * 0.01,
              paddingVertical: HEIGHT * 0.005,
              borderRadius: (H_W.width / HEIGHT) * 35,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
            <TouchableOpacity
              onPress={PcAddToCart}
              style={{
                backgroundColor: 'white',
                paddingHorizontal: H_W.width * 0.01,
                paddingVertical: HEIGHT * 0.005,
                borderRadius: (H_W.width / HEIGHT) * 30,
              }}>
              <Entypo
                name="plus"
                color={colors.primary}
                size={(H_W.width / HEIGHT) * 40}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                marginHorizontal: H_W.width * 0.05,
                fontSize: (H_W.width / HEIGHT) * 40,
                fontWeight: 'bold',
              }}>
              {props.PcCart[`${PcProduct.id}_${currSize}`] !== undefined
                ? props.PcCart[`${PcProduct.id}_${currSize}`].added
                : 0}
            </Text>
            <TouchableOpacity
              onPress={PcRemoveFromCart}
              style={{
                backgroundColor: 'white',
                paddingHorizontal: H_W.width * 0.01,
                paddingVertical: HEIGHT * 0.005,
                borderRadius: (H_W.width / HEIGHT) * 30,
              }}>
              <Entypo
                name="minus"
                color={colors.primary}
                size={(H_W.width / HEIGHT) * 40}
              />
            </TouchableOpacity>
          </View>
        </View>
        {sizes.length > 0 && (
          <Text
            style={{
              paddingHorizontal: H_W.width * 0.04,
              fontWeight: 'bold',
              fontSize: (H_W.width / HEIGHT) * 40,
            }}>
            Sizes
          </Text>
        )}
        <Loop
          style={{marginLeft: H_W.width * 0.02, marginTop: HEIGHT * 0.01}}
          data={sizes}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setCurrSize(item)}
              style={{
                width: H_W.width * 0.15,
                height: H_W.width * 0.15,
                borderRadius: H_W.width * 0.15,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: H_W.width * 0.02,
                backgroundColor: `rgba(${colors.rgb_Primary},${
                  currSize === item ? '1' : '0.15'
                })`,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}>
              <Text
                style={{
                  color: currSize === item ? 'white' : colors.primary,
                  fontWeight: 'bold',
                  fontSize: (H_W.width / HEIGHT) * 35,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
        {toppings.length > 0 && (
          <Text
            style={{
              paddingHorizontal: H_W.width * 0.04,
              fontWeight: 'bold',
              fontSize: (H_W.width / HEIGHT) * 40,
              marginTop: HEIGHT * 0.02,
            }}>
            Toppings
          </Text>
        )}
        <Loop
          style={{marginLeft: H_W.width * 0.02, marginTop: HEIGHT * 0.01}}
          data={toppings}
          renderItem={({item}) => (
            <ExtraToppings
              item={item}
              currToppings={currToppings}
              toggleTopping={toggleTopping}
            />
          )}
        />
      </ScrollView>
    </WrapperScreen>
  );
}

const ExtraToppings = ({item, currToppings, toggleTopping}) => {
  useEffect(() => {
    checkIfAdded();
  }, []);
  const [isAdded, setIsAdded] = useState(false);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const checkIfAdded = () => {
    for (let i = 0; i < currToppings.length; i++) {
      const element = currToppings[i];
      if (element === item) {
        setIsAdded(true);
        break;
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={() => toggleTopping(item)}
      style={{
        marginHorizontal: H_W.width * 0.035,
        width: H_W.width * 0.18,
        borderRadius: (H_W.width / HEIGHT) * 65,
        paddingHorizontal: H_W.width * 0.02,
        paddingVertical: HEIGHT * 0.01,
        alignItems: 'center',
        backgroundColor: `rgba(${colors.rgb_Primary},${
          isAdded ? '1' : '0.15'
        })`,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}>
      <View
        style={{
          width: '100%',
          borderRadius: (H_W.width / HEIGHT) * 65,
          backgroundColor: 'white',
          height: H_W.width * 0.13,
        }}>
        <FastImage
          source={item}
          resizeMode="contain"
          style={{width: '100%', height: H_W.width * 0.13}}
        />
      </View>
      <View
        style={{
          backgroundColor: `rgba(255,255,255,${isAdded ? '0.4' : '1'})`,
          paddingHorizontal: H_W.width * 0.01,
          paddingVertical: HEIGHT * 0.005,
          borderRadius: (H_W.width / HEIGHT) * 30,
          marginTop: HEIGHT * 0.02,
        }}>
        <Entypo
          name={isAdded ? 'check' : 'plus'}
          color={isAdded ? 'white' : colors.primary}
          size={(H_W.width / HEIGHT) * 40}
        />
      </View>
    </TouchableOpacity>
  );
};

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
