/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {
  PcremoveFavAction,
  PcsetFavAction,
  PcsetCurrentProductAction,
} from '../PcStateManagement/PcActions';
import PcHeader from '../PcFrequentUsage/PcHeader';
import {colors} from '../PcFrequentUsage/PcColor';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import Loop from '../PcFrequentUsage/PcFlatList';
import NavigationRef from '../PcFrequentUsage/PcRefNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PcHorizontalTile} from './PcHome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {H_W} from '../PcFrequentUsage/PcResponsive';

const PcFavourites = (props) => {
  const PcGoToSingleProduct = (item) => {
    props.PcsetCurrentProductAction(item);
    NavigationRef.Navigate('PcSP');
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const PcGoBack = () => NavigationRef.Navigate('PcHome');

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
      <View style={{flex: 1}}>
        <Loop
          horizontal={false}
          data={props.PcFavs}
          renderItem={({item}) => (
            <PcHorizontalTile
              item={item}
              PcGoToSingleProduct={PcGoToSingleProduct}
              PcFavs={props.PcFavs}
              PcsetFav={(Pc) => props.PcsetFavAction(Pc)}
              PcremoveFav={(Pc) => props.PcremoveFavAction(Pc)}
            />
          )}
          ListHeaderComponent={
            <>
              <PcHeader
                leftIcon={Ionicons}
                leftIconName="arrow-back"
                leftIconColor="white"
                leftIconAction={PcGoBack}
                Title={<Text style={styles.PcFav2}>Favourites</Text>}
              />
              {props.PcFavs.length === 0 && (
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: H_W.height * 0.05,
                    color: 'white',
                  }}>
                  Sorry No Favorites yet!
                </Text>
              )}
            </>
          }
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    PcCart: state.PcCartReducer.items,
    PcFavs: state.PcToggleFav,
  };
};

export default connect(mapStateToProps, {
  PcsetFavAction,
  PcsetCurrentProductAction,
  PcremoveFavAction,
})(PcFavourites);

const styles = StyleSheet.create({
  PcFav2: {
    color: 'white',
    fontSize: 22,
  },
});
