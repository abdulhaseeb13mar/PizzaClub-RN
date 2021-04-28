/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import WrapperScreen from '../PcFrequentUsage/PcWrapperScreen';
import {View, Text, TouchableOpacity} from 'react-native';
import {H_W} from '../PcFrequentUsage/PcResponsive';
import {colors} from '../PcFrequentUsage/PcColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavigationRef from '../PcFrequentUsage/PcRefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PcresetCart} from '../PcStateManagement/PcActions';
import FastImage from 'react-native-fast-image';
import burgerYellow from '../PcAllAssets/Images/burgerYellow.png';
import hamburger from '../PcAllAssets/Images/26.png';

function PcConfirmOrder(props) {
  useEffect(() => {
    getRandomPositions();
  }, []);
  const insets = useSafeAreaInsets();
  const [randomPositions, setRandomPositions] = useState([]);
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const ResetAndGoHome = () => {
    props.PcresetCart();
    NavigationRef.NavigateAndReset('PcHome');
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
              source={burgerYellow}
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
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FastImage
          source={hamburger}
          style={{
            width: H_W.width * 0.9,
            height: HEIGHT * 0.4,
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
        <Text style={{color: colors.primary, fontSize: 40, fontWeight: 'bold'}}>
          Food<Text style={{color: colors.secondary}}>Village</Text>
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 25,
            textAlign: 'center',
            width: H_W.width * 0.9,
            marginTop: 15,
          }}>
          WE HAVE RECEIVED YOUR ORDER
        </Text>
        <TouchableOpacity
          onPress={ResetAndGoHome}
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
            marginTop: HEIGHT * 0.05,
          }}>
          <AntDesign name="arrowright" size={50} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </WrapperScreen>
  );
}

export default connect(null, {PcresetCart})(React.memo(PcConfirmOrder));
