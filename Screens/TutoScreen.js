import * as React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity,Linking,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfesseurData, professeur, refreshAnnonces, cleanAnnonces,annonces,getFactures} from '../API/airtable';
import { BlurView } from 'expo-blur';


export default class HomeScreen extends React.Component {
  
  state = {
    screen: 1,
    urlPic: require('../assets/images/screenDid1.png')
  }


    render(){
        this.props.navigation.setOptions({ 
            headerBackTitle: '',
            headerShown: false,
        })
        return(
          
          <View style={styles.container}>
                
            <ImageBackground source={this.state.urlPic} style={{flex: 1,resizeMode: "cover",justifyContent: "center",width:'100%'}}>
                <View style={{flex:1, flexDirection:'row',alignItems:'flex-end', 
                            justifyContent:'flex-end'}}>
                <TouchableOpacity
                        onPress={() => {
                            if(this.state.screen == 1){
                                this.setState({urlPic:require('../assets/images/screenDid2.png'),screen:2});
                            }else if(this.state.screen == 2){
                                this.setState({urlPic:require('../assets/images/screenDid3.png'),screen:3});
                            }else{
                                this.props.navigation.navigate('Login');
                            }
                        }}
                        style={{
                            width: 100,
                            backgroundColor: '#456dfa',
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 40,
                            marginRight: 50
                         }}
                    >
                        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16, fontWeight:'600'}}>Suivant</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
            
        
      </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})