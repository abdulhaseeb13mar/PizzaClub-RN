/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PcHeader from '../PcFrequentUsage/PcHeader';

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
      (item) => item.category === tab.id,
    );
    setPcTabProducts(filteredProducts);
  };
  const PcGotoCart = () => RefNavigation.Navigate('PcContact');
  const PcGotoSearch = () => RefNavigation.Navigate('PcSearch');
  const PcGotoFav = () => RefNavigation.Navigate('PcFav');
  const PcGoToSingleProduct = (item) => {
    props.PcsetCurrentProductAction(item);
    RefNavigation.Navigate('PcSP');
  };

  return <WrapperScreen style={{backgroundColor: 'white'}}></WrapperScreen>;
}

export const PcVerticalTile = ({item, PcGoToSingleProduct, PcCart}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  return (
    <TouchableOpacity
      onPress={() => PcGoToSingleProduct(item)}
      style={{width: H_W.width * 0.5, margin: 20}}>
      <View
        style={{
          width: '100%',
          borderRadius: H_W.width * 0.26,
          height: H_W.width * 0.5,
          backgroundColor: `rgba(${colors.rgb_Primary},1)`,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: colors.primary,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.72,
          shadowRadius: 5.46,
        }}>
        <FastImage
          source={item.image}
          style={{
            width: H_W.width * 0.5,
            height: H_W.width * 0.5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
          }}
          resizeMode="contain"
        />
      </View>
      <Text
        numberOfLines={2}
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: HEIGHT * 0.015,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        {item.name}
      </Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: H_W.width * 0.02,
          marginTop: HEIGHT * 0.005,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.primary}}>
          ${item.price}
        </Text>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>
          <AntDesign name="star" color={colors.secondary} /> {item.rating}
        </Text>
      </View>
    </TouchableOpacity>
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
      if (Data.category[Pc].id === item.category) {
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
        marginVertical: HEIGHT * 0.02,
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
                backgroundColor: colors.secondary,
                borderRadius: 8,
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
        <FastImage
          source={item.image}
          style={{
            width: H_W.width * 0.29,
            height: H_W.width * 0.29,
            marginLeft: H_W.width * 0.04,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export const TabList = ({item, PcchangeTab, PccurrentCat}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: H_W.width * 0.03,
        paddingHorizontal: H_W.width * 0.03,
        borderRadius: 20,
        backgroundColor:
          item.category === PccurrentCat.category
            ? colors.primary
            : colors.secondary,
        borderWidth: 1,
        borderColor: colors.lightGrey3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        height: HEIGHT * 0.2,
      }}
      onPress={() => PcchangeTab(item)}>
      <FastImage
        source={item.icon}
        style={{width: H_W.width * 0.15, height: HEIGHT * 0.08}}
        resizeMode="contain"
      />
      <Text
        style={{
          fontWeight: 'bold',
          color: item.category === PccurrentCat.category ? 'white' : 'black',
          fontSize: item.category === PccurrentCat.category ? 22 : 16,
          fontFamily: 'Zapfino',
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
