/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import {colors} from '../PcFrequentUsage/PcColor';
import {H_W} from '../PcFrequentUsage/PcResponsive';
import Data from '../PcData';
import Loop from '../PcFrequentUsage/PcFlatList';
import RefNavigation from '../PcFrequentUsage/PcRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  PcsetCurrentProductAction,
  PcremoveFavAction,
  PcsetFavAction,
} from '../PcStateManagement/PcActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Badge} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

function PcHome(props) {
  useEffect(() => {
    PcchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Pccategories, setPccategories] = useState(Data.category);
  const [PccurrentCat, setPcCurrentCat] = useState(Data.category[0]);
  const [PctabProducts, setPcTabProducts] = useState([]);

  const PcchangeTab = (tab) => {
    setPcCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryid === tab.id,
    );
    setPcTabProducts(filteredProducts);
  };
  const PcGotoCart = () => RefNavigation.Navigate('PcCart');
  const PcGotoSearch = () => RefNavigation.Navigate('PcSearch');
  const PcGotoFav = () => RefNavigation.Navigate('PcFav');
  const PcGoToSingleProduct = (item) => {
    props.PcsetCurrentProductAction(item);
    RefNavigation.Navigate('PcSP');
  };

  return (
    <WrapperScreen
      statusColor={colors.primary}
      barStyle="light-content"
      style={{backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'stretch',
        }}>
        <View
          style={{
            marginTop: -insets.top,
            paddingTop: insets.top,
            marginBottom: -insets.bottom,
            paddingBottom: insets.bottom,
            width: H_W.width * 0.2,
            backgroundColor: colors.primary,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: HEIGHT * 0.35,
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity onPress={PcGotoSearch}>
              <Ionicons
                name="search"
                color="white"
                size={35}
                style={{marginTop: HEIGHT * 0.01}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={PcGotoFav}>
              <Ionicons
                name="heart"
                color="white"
                size={35}
                style={{marginTop: HEIGHT * 0.04}}
              />
            </TouchableOpacity>
          </View>
          <Loop
            style={{flex: 1, maxHeight: HEIGHT * 0.65}}
            horizontal={false}
            data={Pccategories}
            renderItem={({item}) => (
              <TabList item={item} PcchangeTab={PcchangeTab} />
            )}
          />
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: colors.primary,
              paddingVertical: HEIGHT * 0.015,
              paddingHorizontal: H_W.width * 0.025,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: (H_W.width / HEIGHT) * 80,
                marginRight: H_W.width * 0.03,
              }}>
              {PccurrentCat.category}
            </Text>
            {PccurrentCat.id === '1' ? (
              <FontAwesome5
                name="hamburger"
                color="white"
                size={(H_W.width / HEIGHT) * 80}
              />
            ) : PccurrentCat.id === '2' ? (
              <MaterialCommunityIcons
                name="pasta"
                color="white"
                size={(H_W.width / HEIGHT) * 90}
              />
            ) : PccurrentCat.id === '3' ? (
              <FontAwesome5
                name="pizza-slice"
                color="white"
                size={(H_W.width / HEIGHT) * 90}
              />
            ) : (
              <Entypo
                name="drink"
                color="white"
                size={(H_W.width / HEIGHT) * 90}
              />
            )}
          </View>
          <Loop
            style={{paddingBottom: HEIGHT * 0.02}}
            horizontal={false}
            data={PctabProducts}
            renderItem={({item}) => (
              <PcVerticalTile
                item={item}
                PcGoToSingleProduct={PcGoToSingleProduct}
              />
            )}
          />
          <TouchableOpacity
            onPress={PcGotoCart}
            style={{
              width: H_W.width * 0.15,
              height: HEIGHT * 0.08,
              borderRadius: (H_W.width / HEIGHT) * 70,
              backgroundColor: colors.primary,
              position: 'absolute',
              bottom: HEIGHT * 0.04,
              right: H_W.width * 0.05,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: colors.primary,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 1,
              shadowRadius: 4.65,
            }}>
            <View>
              <Ionicons
                name="ios-cart-outline"
                color="white"
                size={(H_W.width / HEIGHT) * 90}
              />
              {props.PctotalItems > 0 && (
                <Badge
                  value={props.PctotalItems}
                  containerStyle={{position: 'absolute', top: 0, right: 0}}
                  badgeStyle={{
                    backgroundColor: 'red',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperScreen>
  );
}

export const PcVerticalTile = ({item, PcGoToSingleProduct, PcCart}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  return (
    <View style={{alignItems: 'center', marginTop: HEIGHT * 0.14}}>
      <TouchableOpacity
        onPress={() => PcGoToSingleProduct(item)}
        style={{
          backgroundColor: 'white',
          width: H_W.width * 0.55,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
        }}>
        <FastImage
          source={item.image}
          style={{
            width: H_W.width * 0.45,
            height: HEIGHT * 0.22,
            marginLeft: -H_W.width * 0.05,
            marginTop: -HEIGHT * 0.13,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
          }}
          resizeMode="contain"
        />
        <Text
          numberOfLines={2}
          style={{
            marginTop: HEIGHT * 0.015,
            fontWeight: 'bold',
            color: colors.primary,
            fontSize: (H_W.width / HEIGHT) * 45,
            paddingHorizontal: H_W.width * 0.02,
          }}>
          {item.name}
        </Text>
        {!PcCart && (
          <Text
            numberOfLines={5}
            style={{
              paddingHorizontal: H_W.width * 0.02,
              marginTop: HEIGHT * 0.01,
              color: colors.darkGray,
              fontSize: (H_W.width / HEIGHT) * 28,
            }}>
            {item.discription}
          </Text>
        )}
        {PcCart && item.size !== 'NoSize' && (
          <Text
            numberOfLines={5}
            style={{
              paddingHorizontal: H_W.width * 0.02,
              marginTop: HEIGHT * 0.01,
              color: colors.darkGray,
              fontSize: (H_W.width / HEIGHT) * 28,
              fontWeight: 'bold',
            }}>
            {item.size}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: H_W.width * 0.02,
            marginVertical: HEIGHT * 0.02,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign
              name="star"
              color="#FDCA19"
              size={(H_W.width / HEIGHT) * 30}
            />
            <Text
              style={{
                textAlign: 'right',
                fontWeight: 'bold',
                color: colors.primary,
                fontSize: (H_W.width / HEIGHT) * 30,
                marginLeft: H_W.width * 0.01,
                fontFamily: 'Avenir-Black',
              }}>
              {item.rating}
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'right',
              fontWeight: 'bold',
              color: colors.primary,
              fontSize: (H_W.width / HEIGHT) * 45,
              fontFamily: 'Avenir-Black',
            }}>
            ${item.price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const PcHorizontalTile = ({
  item,
  PcGoToSingleProduct,
  PcFavs,
  PcremoveFav,
  PcsetFav,
}) => {
  useEffect(() => {
    getTheCategory();
    checkIfFav();
  }, []);
  const [productCategory, setProductCategory] = useState('');
  const [fav, setFav] = useState(false);

  const getTheCategory = () => {
    for (let Pc = 0; Pc < Data.category.length; Pc++) {
      if (Data.category[Pc].id === item.categoryid) {
        setProductCategory(Data.category[Pc].category);
        break;
      }
    }
  };

  const checkIfFav = () => {
    for (let Pc = 0; Pc < PcFavs.length; Pc++) {
      if (PcFavs[Pc].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? PcremoveFav(item.id) : PcsetFav(item);
    setFav(!fav);
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: HEIGHT * 0.02,
      }}>
      <TouchableOpacity
        onPress={() => PcGoToSingleProduct(item)}
        style={{
          overflow: 'visible',
          borderRadius: 17,
          backgroundColor: 'white',
          width: H_W.width * 0.9,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: HEIGHT * 0.004,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: H_W.width * 0.6,
            alignSelf: 'stretch',
            paddingTop: HEIGHT * 0.01,
            paddingLeft: H_W.width * 0.03,
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15.5}} numberOfLines={2}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.darkGray,
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              {productCategory}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginLeft: H_W.width * 0.02,
              }}>
              <AntDesign name="star" color={colors.secondary} />
              {item.rating}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={toggleFav}
              style={{
                paddingHorizontal: H_W.width * 0.02,
                paddingVertical: HEIGHT * 0.008,
                borderRadius: 8,
                borderWidth: 1.5,
                borderColor: colors.primary,
              }}>
              <FontAwesome
                name={fav ? 'heart' : 'heart-o'}
                color={colors.primary}
                size={16}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: H_W.width * 0.05,
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'flex-end',
              }}>
              ${item.price}
            </Text>
          </View>
        </View>
        <View style={{overflow: 'hidden'}}>
          <View
            style={{
              width: H_W.width * 0.22,
              height: HEIGHT * 0.25,
              backgroundColor: colors.primary,
              position: 'absolute',
              transform: [{rotate: '30deg'}],
              marginTop: -HEIGHT * 0.03,
            }}
          />
          <FastImage
            source={item.image}
            style={{
              width: H_W.width * 0.29,
              height: H_W.width * 0.29,
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const TabList = ({item, PcchangeTab, PccurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => PcchangeTab(item)}
      style={{
        transform: [{rotate: '-90deg'}],
        height: HEIGHT * 0.045,
        width: '106%',
        marginVertical: HEIGHT * 0.05,
      }}>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: (H_W.width / HEIGHT) * 40,
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    PctotalItems: state.PcCartReducer.totalItems,
    PcCart: state.PcCartReducer.items,
    PcFavs: state.PcToggleFav,
  };
};

export default connect(mapStateToProps, {
  PcsetCurrentProductAction,
  PcremoveFavAction,
  PcsetFavAction,
})(PcHome);
