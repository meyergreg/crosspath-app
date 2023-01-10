import * as React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity,Linking,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfesseurData, professeur, refreshAnnonces, cleanAnnonces,annonces,getFactures,getCoursHisto} from '../API/airtable';
import { BlurView } from 'expo-blur';

export default class HomeScreen extends React.Component {
  
  state = {
    isLoading: false
  }
  componentDidMount(){
    this.autoLogin();
  }

  autoLogin = async () => {
    let username = await AsyncStorage.getItem("usernameStk");
    let password = await AsyncStorage.getItem("passwordStk");
    if(username && password){
      this.setState({isLoading: true});
      getProfesseurData(username);
      //refreshAnnonces();
      //cleanAnnonces(annonces);
      //getCoursHisto(username);
      setTimeout(() => {this.props.navigation.navigate('Main');
                        this.setState({isLoading: false});},4500);
    }
  }

  loadingIndic() {
    if(this.state.isLoading){
        return( 
            <BlurView 
                    intensity={98} 
                    style= {{margin:20, justifyContent:'center', alignItems:'center', width:100,height:100,backgroundColor:'#fff',borderRadius:25}}
                    >
                <ActivityIndicator size="large"/>
            </BlurView>
        );
    }else{
      return(
        <View style={{}}>
          {/*--  
        <View style={{ flexDirection: 'row', marginTop: 20, paddingVertical: 20 }}>
            <TouchableOpacity
            onPress={()=> alert('Bientot disponible')}
            style={{ 
              backgroundColor: '#fbedff' ,
              padding: 10, 
              width:150, 
              borderRadius: 5, 
              width: 250, 
              height:50, 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
              <Text style={{ 
                textAlign: 'center', 
                color: '#6e4cff',
                fontWeight: 'bold', 
                fontSize: 18 
              }}>
                Espace Elève
              </Text>
            </TouchableOpacity>
          </View>

          --*/}
          <View style={{ flexDirection: 'row',marginTop:50 }}>
          <TouchableOpacity
            onPress={ async () => {
              //let firstLog = await AsyncStorage.getItem("firstLogStk");
              //if(firstLog !== '1'){
                //this.props.navigation.navigate('Tuto');
              //}else{
                this.props.navigation.navigate('Login');
              //}
            }
             }
            style={{ 
              backgroundColor: '#A55EDE', 
              padding: 10, 
              width:150, 
              borderRadius: 100, 
              width: 250, 
              height:50, 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
            <Text style={{ 
              textAlign: 'center', 
              color: '#fff',
              fontWeight: 'bold', 
              fontSize: 18 
            }}>
              Mentor Space
            </Text>
          </TouchableOpacity>    
        </View>
      </View>
      );
    }
  }

  clickInscrire (url){
      return(
          Linking.openURL(url)
      );
    }

    render(){
        this.props.navigation.setOptions({ 
            headerBackTitle: '',
            headerShown: false ,
        })
        return(
          
          <View style={styles.container}>
                <Image
                  style={{ width:'60%', height: 50, marginTop: 5}}
                  source={require('../assets/images/crossLogo.png')}
                />
            {/* <Text style={{ fontSize: 31, fontWeight: 'bold',marginTop: 20 }} >Bienvenue !</Text> */}
            <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center', marginHorizontal: 20,marginTop: 20 }} >Connect to your espace</Text>   
            
            <View style={{position:'relative'}}>
            {this.loadingIndic()}
            </View>
            
        <Text style={{ fontSize: 16, marginTop: 100, color: 'gray' }}>Find us on social networks</Text>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
       
          <TouchableOpacity onPress={()=> this.clickInscrire("https://www.facebook.com/profile.php?id=100082900786991")}>
          <Image style={{ width:42, height: 42, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}}
              source={require('../assets/images/facebook.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.clickInscrire("https://www.instagram.com/crosspathnetwork/")}>
          <Image style={{ width:35, height: 35,marginTop:4, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}}
              source={require('../assets/images/insta.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.clickInscrire("https://www.linkedin.com/company/crosspath/")}>
          <Image style={{ width:42, height: 42, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center'}}
              source={require('../assets/images/linkedin.png')} />
          </TouchableOpacity>
          
        </View>
      </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
})