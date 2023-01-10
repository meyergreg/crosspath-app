import * as React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView ,Linking} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getProfesseurData, professeur, refreshAnnonces, cleanAnnonces,annonces,getFactures, utiliseApp} from '../API/airtable'
import * as Animatable from 'react-native-animatable';
import { BlurView } from 'expo-blur';
import { Alert  } from 'react-native'
import { Button } from 'react-native-paper';



export default class Logout extends React.Component {

    constructor(props){
        super(props)
        this.validateInput = React.createRef()
    }
    
    createTwoButtonAlert = () =>
    Alert.alert(
      "Attention",
      "Souhaitez-vous vous déconnecter ?",
      [
        {
          text: "Non",
          style: "cancel",
          onPress: () => this.props.navigation.navigate('Main')
        },
        { text: "Oui", onPress: () => this.props.navigation.navigate('Home') }
      ]
    );

    clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
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
            <View style={styles.container}>
                {/* <View
                        style= {{flex:1, justifyContent:'center', alignItems:'center', width:300,height:50,borderRadius:5,position:'absolute',padding:10}}
                        >
                    <ActivityIndicator  color="#1B58FE"/>
                </View> */}
                 <View style={{backgroundColor: '#F1E5FA',borderRadius:5,marginVertical:5}}>
                          <Image
                          style={{ width: 25,
                            height: 35,
                            borderRadius:0,
                            margin: 15,}}
                          source={require("../assets/images/crossPathLogoC.png")}
                          />
                        </View>
                <View           
                style={{ 
                  marginTop:40,
                  backgroundColor: '#E4E2E7', 
                  padding: 10, 
                  width:150, 
                  borderRadius: 50, 
                  width: 250, 
                  height:50, 
                  justifyContent: 'center', 
                  alignItems: 'center'
                }}>
                <Text style={{ 
                  textAlign: 'center', 
                  color: '#59545C',
                  fontWeight: 'bold', 
                  fontSize: 18 
                }}>
                  Sign out ?
                </Text>
              </View>
                <View style={{flexDirection: 'column', width:250}}>
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <TouchableOpacity  
                        onPress={() => {
                            this.clearAll();
                            this.props.navigation.navigate('HomeScreen')
                        }}          
                        style={{ 
                        marginTop:40,
                        backgroundColor: '#F1E5FA', 
                        padding: 10, 
                        width:80, 
                        borderRadius: 50, 
                        height:50, 
                        justifyContent: 'center', 
                        alignItems: 'center'
                        }}>
                            <Text style={{ 
                            textAlign: 'center', 
                            color: '#A55EDE',
                            fontWeight: 'bold', 
                            fontSize: 18 
                            }}>
                            Yes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity   
                        onPress={() => {this.props.navigation.navigate('Home')}}        
                        style={{ 
                        marginTop:40,
                        backgroundColor: '#F1E5FA', 
                        padding: 10, 
                        width:80, 
                        borderRadius: 50, 
                        height:50, 
                        justifyContent: 'center', 
                        alignItems: 'center'
                        }}>
                            <Text style={{ 
                            textAlign: 'center', 
                            color: '#A55EDE',
                            fontWeight: 'bold', 
                            fontSize: 18 
                            }}>
                            No
                            </Text>
                        </TouchableOpacity>
                        </View>
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