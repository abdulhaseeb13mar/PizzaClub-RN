/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import {H_W} from '../PcFrequentUsage/PcResponsive';
import NavigationRef from '../PcFrequentUsage/PcRefNavigation';
import {colors} from '../PcFrequentUsage/PcColor';
import Data from '../PcData';
import Loop from '../PcFrequentUsage/PcFlatList';
import {connect} from 'react-redux';
import {
  PcsetCurrentProductAction,
  PcsetFavAction,
  PcremoveFavAction,
} from '../PcStateManagement/PcActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PcHeader from '../PcFrequentUsage/PcHeader';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PcHorizontalTile} from './PcHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const PcGoToSingleProduct = (item) => {
    props.PcsetCurrentProductAction(item);
    NavigationRef.Navigate('PcSP');
  };

  const CardRender = (Arr) => {
    return (
      <Loop
        horizontal={false}
        data={Arr}
        renderItem={({item}) => (
          <PcHorizontalTile
            item={item}
            PcGoToSingleProduct={PcGoToSingleProduct}
            PcFavs={props.PcFavs}
            PcsetFav={(Pc) => props.PcsetFavAction(Pc)}
            PcremoveFav={(Pc) => props.PcremoveFavAction(Pc)}
          />
        )}
      />
    );
  };
  const PcGoBack = () => NavigationRef.GoBack();

  const PcchangeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen
      statusColor={`rgba(${colors.rgb_Primary}, 0.15)`}
      style={{backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`}}>
      <PcHeader
        leftIcon={Ionicons}
        leftIconName="arrow-back"
        leftIconColor={colors.primary}
        leftIconAction={PcGoBack}
        Title={<Text style={styles.PcSearch2}>Search</Text>}
      />
      <View style={{paddingHorizontal: H_W.width * 0.06}}>
        <View
          style={{
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            borderRadius: 7,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: HEIGHT * 0.05,
              paddingLeft: H_W.width * 0.03,
              backgroundColor: colors.lightGrey2,
              borderRadius: 7,
            }}>
            <Fontisto name="search" size={18} color={colors.primary} />
            <TextInput
              style={{
                width: '80%',
                fontWeight: 'bold',
                fontSize: 15,
                color: 'black',
                marginLeft: H_W.width * 0.02,
              }}
              placeholderTextColor={colors.darkGray}
              placeholder="Search Here..."
              onChangeText={PcchangeSearchText}
            />
          </View>
        </View>
      </View>
      <View style={{marginTop: HEIGHT * 0.01, flex: 1}}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.product)}
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  PcCart: state.PcCartReducer.items,
  PcFavs: state.PcToggleFav,
});

export default connect(mapStateToProps, {
  PcsetCurrentProductAction,
  PcsetFavAction,
  PcremoveFavAction,
})(Search);

const styles = StyleSheet.create({
  PcSearch2: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  PcSearch3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  PcSearch4: {
    width: '85%',
  },
});
