import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer, getFocusedRouteNameFromRoute} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import MainScreen from './Screens/MainScreen';
import AnnoncesScreen  from './Screens/AnnoncesScreen'
import ProfileScreen  from './Screens/Profile.js'
import PersoScreen  from './Screens/Perso.js'
import InscriptionScreen from './Screens/InscriptionScreen'
import ContratProf from './Screens/ContratProf'
import Signature from './Screens/Signature'
import LogoutS from './Screens/LogoutScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {


  return (
    <Tab.Navigator
      shifting={false}
      activeColor="#9F54DC"
      inactiveColor="#8b8b8b"
      barStyle={{ backgroundColor: "white"}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused ,color}) => (
            focused
            ? 
            <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:80}}>
              {/* <FontAwesomeIcon icon={faStarOfLife} color={color} size={23} /> */}
              <Image
                  source={require("./assets/images/homeMenu.png")}
                  style={{width:25,height:25,marginTop:8}}
                />
              <View style={{ marginTop:0,display:'flex',justifyContent:'center'}}>
                <Text style={{color:'#9F54DC',textAlign:'center',fontWeight:'500'}}>Accueil</Text>
              </View>
              </View>
            : 
            <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:80}}>
              {/* <FontAwesomeIcon icon={faStarOfLife} color={color} size={23} /> */}
              <Image
                  source={require("./assets/images/homeMenuInact.png")}
                  style={{width:25,height:25,marginTop:8}}
                />
              <View style={{ marginTop:0,display:'flex',justifyContent:'center'}}>
                <Text style={{color:'#8b8b8b',textAlign:'center',fontWeight:'500'}}>Accueil</Text>
              </View>
              </View>
)
        }}
        component={MainScreen}
      />
      <Tab.Screen
        name="Annonce"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused ,color}) => (
            focused
            ? 
            <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:80}}>
              {/* <FontAwesomeIcon icon={faStarOfLife} color={color} size={23} /> */}
              <Image
                  source={require("./assets/images/listMenu.png")}
                  style={{width:25,height:25,marginTop:8}}
                />
              <View style={{ marginTop:0,display:'flex',justifyContent:'center'}}>
                <Text style={{color:'#9F54DC',textAlign:'center',fontWeight:'500'}}>Offers</Text>
              </View>
              </View>
            : 
            <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:80}}>
              {/* <FontAwesomeIcon icon={faStarOfLife} color={color} size={23} /> */}
              <Image
                  source={require("./assets/images/listMenuInact.png")}
                  style={{width:25,height:25,marginTop:8}}
                />
              <View style={{ marginTop:0,display:'flex',justifyContent:'center'}}>
                <Text style={{color:'#8b8b8b',textAlign:'center',fontWeight:'500'}}>Offers</Text>
              </View>
              </View>
)
        }}
        component={AnnoncesScreen}
      />
      <Tab.Screen
        name="Perso"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused ,color}) => (
            focused
            ? 
            <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:80}}>
            <Image
                source={require("./assets/images/profilMenu.png")}
                style={{width:25,height:25,marginTop:8}}
              />
            <View style={{ marginTop:0,display:'flex',justifyContent:'center'}}>
              <Text style={{color:'#9F54DC',textAlign:'center',fontWeight:'500'}}>Profile</Text>
            </View>
            </View>
         
          : 
          <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:80}}>
            <Image
                source={require("./assets/images/profilMenuInact.png")}
                style={{width:25,height:25,marginTop:8}}
              />
            <View style={{ marginTop:0,display:'flex',justifyContent:'center'}}>
              <Text style={{color:'#8b8b8b',textAlign:'center',fontWeight:'500'}}>Profile</Text>
            </View>
            </View>
         )
        }}
        component={PersoScreen}
      />
      <Tab.Screen
        name="Logout"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused ,color}) => (
            focused
            ? 
            <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:80}}>
            <Image
                source={require("./assets/images/logOutMenu.png")}
                style={{width:25,height:25,marginTop:8}}
              />
            <View style={{ marginTop:0,display:'flex',justifyContent:'center'}}>
              <Text style={{color:'#9F54DC',textAlign:'center',fontWeight:'500'}}>Logout</Text>
            </View>
            </View>
            : 
            <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:80}}>
            <Image
                source={require("./assets/images/logOutMenuInact.png")}
                style={{width:25,height:25,marginTop:8}}
              />
            <View style={{ marginTop:0,display:'flex',justifyContent:'center'}}>
              <Text style={{color:'#8b8b8b',textAlign:'center',fontWeight:'500'}}>Logout</Text>
            </View>
            </View>
         )
        }}
        component={LogoutS}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  
  
  return (
    <NavigationContainer>
      
      <Stack.Navigator 
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Inscription"
          component={InscriptionScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Home}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Annonces" 
          component={AnnoncesScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Profil" 
          component={ProfileScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Perso" 
          component={PersoScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ContratProf" 
          component={ContratProf} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signature" 
          component={Signature} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LogoutS" 
          component={LogoutS} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

