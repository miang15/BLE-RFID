import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Index from './src/navigation/Index';
import {MenuProvider} from 'react-native-popup-menu';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import AppLoader from './src/components/AppLoader';
import FlashMessage from 'react-native-flash-message';
import Theme from './src/utils/Theme';

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <Index />
        <AppLoader />
        <FlashMessage
          titleStyle={styles.title}
          textStyle={styles.desc}
          position="bottom"
        />
      </MenuProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    color: Theme.white,
  },
  desc: {
    fontSize: 14,
    color: Theme.white,
  },
});
