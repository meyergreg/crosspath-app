import * as React from 'react'
import { View, Image, TouchableOpacity} from 'react-native'

import { WebView } from 'react-native-webview';



export default class Inscription extends React.Component {
  render() {
    this.props.navigation.setOptions({
        headerBackTitle: '',
        gestureEnabled: true,
        headerShown: false,
    })
    return (

        <View style={{flex:20}}>
        <View style={{flex:2,backgroundColor:'#575efe'}}>
        <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Login')}}
            >
            <Image style={{width:45,height:45,marginLeft:20,marginTop:30}} source={require("../assets/images/close.png")}/>
            </TouchableOpacity>
        </View>
        <View style={{flex:18}}>
            <WebView
                source={{
                uri: 'https://airtable.com/shr6t3GtSO9yVRmYr'
                }}
                style={{}}
            />
        </View>
        </View>
    );
  }
}