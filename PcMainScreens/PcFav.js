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
import Feather from 'react-native-vector-icons/Feather';
import {PcHorizontalTile} from './PcHome';
import {H_W} from '../PcFrequentUsage/PcResponsive';

const PcFavourites = (props) => {
  const PcGoToSingleProduct = (item) => {
    props.PcsetCurrentProductAction(item);
    NavigationRef.Navigate('PcSP');
  };

  const PcGoBack = () => NavigationRef.Navigate('PcHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
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
                leftIcon={Feather}
                leftIconName="corner-up-left"
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
    color: colors.primary,
    fontSize: 22,
  },
});
