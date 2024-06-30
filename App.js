import React, {Component} from "react";
import {View, Text, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

  componentDidMount() {
    this.fetchToken();
  }

  fetchToken = async() => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if(storedToken !== null) {
        this.setState({token: storedToken});
      }
    } catch (error) {
      console.error('Error fetching token from AsyncStorage: ', error);
    }
  };

  storeToken = async () => {
    try {
      const userToken = 'mayankHoonMain';
      await AsyncStorage.setItem('userToken', userToken);
    } catch (error) {
      console.error('Error storing token in AsyncStorage: ', error);
    }
  };

  clearToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      this.setState({token: null});
      console.log('Token cleared successfully');
    } catch (error) {
      console.error('Error clearing token from AsyncStorage: ', error);
    }
  };

  render() {
    const {token} = this.state;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Store Token: {token}</Text>
        <Button onPress={this.storeToken} title="Store Token" />
        <Button onPress={this.clearToken} title="Clear Token" />
      </View>
    );
  }


}
export default App;