import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import imageOn from './assets/icons/eco-light.png';
import imageOff from './assets/icons/eco-light-off.png';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => {
    setToggle((oldToggle) => !oldToggle); //Toggle de tudo
  }

  useEffect(() => {
    // Liga o Flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  // Chacoalhar 
  useEffect(() => {
    const subscription = RNShake.addListener(()=>{
      handleChangeToggle()
    });

    // Quando desligar o componente
    return () => subscription.remove();
  }, []);

  return (
  <View style={toggle ? style.container : style.containerLight}>
    <TouchableOpacity
     onPress={handleChangeToggle}>
    <Image style={toggle ? style.lightningOff : style.lightningOn} source={toggle ? imageOff : imageOn } />
    </TouchableOpacity>
  </View>
    
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightningOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightningOff: {
    tintColor: 'white',
    width: 150,
    height: 150,
    alignSelf: 'center',
  }
});