import * as React from 'react';
/* import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from 'react'; */
import { View, Text, Image, StyleSheet,Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {professeur, getFactures} from '../API/airtable';
import Eleve from '../Components/MesEleves';
import Facture from '../Components/MesFactures';
import Message from '../Components/Message';
//import ScrollableTabView from 'react-native-scrollable-tab-view';
import {annonces,refreshEleves,delDataLogin,getCoursHisto,triCoursHisto} from '../API/airtable';



function  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
 
function checkAnnonce(){
    if(typeof professeur.annonces == 'undefined'){
        professeur.annonces = [''];
    }
}




export default class MainScreen extends React.Component{
    state = {
        isLoading: true,
        active:"",
        name: "",
        profilPic: "../assets/images/icon-eleve.png"
    }
    
  
      // Background fetch setup (recommend extracting into separate file)
      
    componentDidMount() {
      
        this.singatureContratAlerte();
        //getFactures(professeur.nom);
        //getCoursHisto(professeur.email);
        //refreshEleves(professeur);
        this.setState({
            name: professeur.nom,
            profilPic: professeur.profilPic,
            isLoading: false
          })   
        //setTimeout(()=> {triCoursHisto(professeur.heures);},4000);
        
    }
    createTwoButtonAlert = () =>
    Alert.alert(
      "Attention",
      "Souhaitez-vous vous déconnecter ?",
      [
        {
          text: "Non",
          style: "cancel"
        },
        { text: "Oui", onPress: () => this.props.navigation.navigate('Home') }
      ]
    );
    singatureContratAlerte = () => {
    if(professeur.contrat ){}
    else{
      Alert.alert(
        "Attention",
        "Pour aller plus loin vous devez signer le contrat professeur partenaire",
        [
          { text: "Quitter", onPress: () => this.props.navigation.navigate('Home') },
          { text: "Signer", onPress: () => this.props.navigation.navigate('ContratProf') }
        ]
      );
    };
  }
  
    render(){
        this.props.navigation.setOptions({
            headerBackTitle: '',
            gestureEnabled: false,
            headerShown: false,
            animationEnabled: false 
        })
        const Tab = createMaterialTopTabNavigator();

    return(
        <View style={{flex: 12,backgroundColor: '#fff' }}>
            
                <View style={{marginTop: 60}}>
                    {/* --- WELCOME SECTION --- */}    
                   
                        
                    {/* --- BLOQUE PROFIL --- */}
                    <View style={styles.main_container}> 
                        <View style={{backgroundColor: '#F1E5FA',borderRadius:10,marginVertical:15}}>
                          <Image
                          style={styles.image}
                          source={require("../assets/images/crossPathLogoC.png")}
                          />
                        </View>
                        <View style={styles.content_container}>
                            <View style={styles.header_container}>                      
                            </View>
                            <View style={styles.description_container}>
                                <Text style={{ color: '#59545C', fontWeight: 'bold',marginLeft:10,marginBottom:10, fontSize:17 }}>{this.state.name}</Text>
                                <Text style={{ color: '#776F7B',marginLeft:10,fontWeight:'600' }}>Partner mentor</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
                  
                {/* --- Sous menu --- */} 

                
                    <Tab.Navigator 
                    style={{marginTop:0,}} 
                    tabBarOptions={{labelStyle: { fontSize: 12, fontWeight: 'bold' }}}
                    screenOptions={{
                      tabBarLabelStyle: { fontSize: 14 },
                      tabBarStyle: { backgroundColor: '#fff' },
                      tabBarActiveTintColor: '#923CD7',
                      tabBarInactiveTintColor: '#A966DF',
                      tabBarPressColor: '#923CD7',
                      tabBarIndicatorStyle: {color: '#923CD7'}
                    }}
                    >
                        <Tab.Screen name="Students" component={Eleve} />
                        <Tab.Screen name="Tasks" component={Message} />
                        <Tab.Screen name="Billing" component={Facture} />
                        
                    </Tab.Navigator>
        
            </View>
            

        )
    }
}

const styles = StyleSheet.create({
    main_container: {
      backgroundColor: '#fff', 
      marginLeft: 35, 
      marginBottom:0,
      marginRight:20,
      marginTop:0,
      borderRadius: 10, 
      alignItems: 'center', 
      justifyContent: 'center',
      height: 90,
      flexDirection: 'row'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
    image: {
      width: 25,
      height: 35,
      borderRadius:0,
      margin: 15,
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 3,
      flexDirection: 'row'
    },
    description_container: {
      flex: 9
    },
  })