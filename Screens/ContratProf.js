import * as React from 'react'
import { WebView } from 'react-native-webview';
import { View, Text, Image, ActivityIndicator,FlatList,Alert  } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {annonces, refreshAnnonces, cleanAnnonces,addCandidat,addCandidat2, professeur,delCandidat,refreshcand} from '../API/airtable';


//||

export default class Contrat extends React.Component{
    state = {
    }  
    componentDidMount() {
      }
    render(){
        this.props.navigation.setOptions({
            headerBackTitle: '',
            gestureEnabled: false,
            headerShown: false,
            animationEnabled: false
        })
    return(
       /*  <View style={{}}>
          
      <WebView
                source={{
                uri: 'https://grade-up.fr/wp-content/uploads/2021/12/contrat-prof.pdf'
                }}
                style={{}}
            />
        </View> */

        <View style={{flex:20}}>
        
        <View style={{flex:18}}>
            <WebView
                source={{
                uri: 'https://grade-up.fr/wp-content/uploads/2021/12/contrat-prof.pdf'
                }}
                style={{}}
            />
        </View>
        <View style={{flex:2,backgroundColor:'#575efe',flexDirection:'row',justifyContent:'space-between'}}>
        
        <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Perso')}}
            style={{flexDirection:'row'}}
            >
                <Image style={{width:45,height:45,marginLeft:10,marginTop:10}} source={require("../assets/images/fleche-gauche.png")}/>
                <Text style={{marginTop:22,color:'white',fontSize:16}}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Signature')}}
            style={{flexDirection:'row'}}
            >
                <Text style={{marginTop:22,color:'white',fontSize:16}}>Signer</Text>
                <Image style={{width:45,height:45,marginTop:10}} source={require("../assets/images/fleche-droite.png")}/>         
        </TouchableOpacity>

        </View>
        </View>
        )
    }
}