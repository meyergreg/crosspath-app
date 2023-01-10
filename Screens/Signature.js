import SignatureScreen from "react-native-signature-canvas";
import * as React from 'react'
import { WebView } from 'react-native-webview';
import { View, Text, Image, ActivityIndicator,FlatList,Alert  } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {annonces, refreshAnnonces,signOffLine, cleanAnnonces,addCandidat,addCandidat2, professeur,delCandidat,refreshcand,addSignature,getProfesseurData} from '../API/airtable';

//||

export default class Signature extends React.Component{
    state = {
        signature: null,
        sign: false
    }  
    componentDidMount() {
      }
    ifSign(){
        if(this.state.sign){
            return(
                <View style={{flex:1}}>
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('Main');
                        }}
                        style={{flexDirection:'row',justifyContent:'flex-end'}}
                        >
                            <Text style={{marginTop:22,color:'white',fontSize:16}}>Terminer</Text>
                            <Image style={{width:45,height:45,marginTop:10}} source={require("../assets/images/fleche-droite.png")}/>         
                    </TouchableOpacity>
                </View>
            );
        }else{
            return(
                <View>
                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('Perso')}}
                        style={{flexDirection:'row'}}
                        >
                            <Image style={{width:45,height:45,marginLeft:10,marginTop:10}} source={require("../assets/images/fleche-gauche.png")}/>
                            <Text style={{marginTop:22,color:'white',fontSize:16}}>Retour</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    
    
    render(){
        this.props.navigation.setOptions({
            headerBackTitle: '',
            gestureEnabled: false,
            headerShown: false,
            animationEnabled: false
        })
        //let signOffLine = false;

    return(


        <View style={{flex:20}}>
        
        <View style={{flex:18,marginTop:50}}>
        <View style={{width: 335,
            height: '30%',
            width:'100%',
            backgroundColor: "#F8F8F8",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,}}
        >
        {this.state.signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: 335, height: 114 }}
            source={{ uri: this.state.signature }}
          />
          
        ) : null}
        
      </View>
            <SignatureScreen
                clearText={'Effacer'}
                confirmText={'Enregistrer'}
                descriptionText={'Signature'}
                imageType={"image/png"}
                webStyle={`.m-signature-pad--footer
                    .button {
                    background-color: #575efe;
                    color: #FFF;
                    }`}
                onOK={(signature)=>{
                    getProfesseurData(professeur.email);
                    this.setState({signature: signature, sign: true});
                    addSignature(professeur, signature);
                    /* signOffLine.push(true);
                    console.log(signOffLine) */
                    }}
            />

        </View>
        <View style={{flex:2,backgroundColor:'#575efe',flexDirection:'row',justifyContent:'space-between'}}>
        {this.ifSign()}
        {/* <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Perso')}}
            style={{flexDirection:'row'}}
            >
                <Image style={{width:45,height:45,marginLeft:10,marginTop:10}} source={require("../assets/images/fleche-gauche.png")}/>
                <Text style={{marginTop:22,color:'white',fontSize:16}}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Perso')}}
            style={{flexDirection:'row'}}
            >
                <Text style={{marginTop:22,color:'white',fontSize:16}}>Signer</Text>
                <Image style={{width:45,height:45,marginTop:10}} source={require("../assets/images/fleche-droite.png")}/>         
        </TouchableOpacity> */}

        </View>
        </View>
        )
    }
}