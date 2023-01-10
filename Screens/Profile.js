import * as React from 'react'
import { View, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView,ScrollView,Modal } from 'react-native'
import {  TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler'
import { professeur} from '../API/airtable'
import {annonces, cleanAnnonces} from '../API/airtable';
import { BlurView } from 'expo-blur';



export default class ProfileScreen extends React.Component{
    state = {
        isLoading: true,
        active:"",
        name: "",
        modalCoursVisible:true,
        profilPic: "../assets/images/icon-eleve.png"
    }
    
    componentDidMount() {
        this.props.navigation.navigate('Perso');
        this.setState({
            name: professeur.nom,
            profilPic: professeur.profilPic,
            isLoading: false
          })       
      }

    render(){
        this.props.navigation.setOptions({
            headerBackTitle: '',
            gestureEnabled: false,
            headerShown: false,
            animationEnabled: false
        })
        
    return(
        <View style={{flex: 1,
                      justifyContent: 'center',
                     alignItems: 'center',backgroundColor: '#f2f4f3' }}>
                <View style={{}}>
                    {/* --- WELCOME SECTION --- */}    
                    <View style={{paddingLeft: 20, marginVertical: 20, marginTop:55 }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold'  }}>Profil</Text>                   
                    </View>
                        
                    {/* --- BLOQUE PROFIL --- */}
                    <View style={styles.main_container}> 
                        <View style={styles.content_container}>
                            <View style={styles.header_container}>                      
                            </View>
                            <View style={styles.description_container}>
                                <Text style={{ color: '#2A2B34', fontWeight: 'bold',marginLeft:20,marginBottom:10, fontSize:17 }}>{this.state.name}</Text>
                                <Text style={{ color: '#5588ff',marginLeft:20,fontWeight:'600' }}>Professeur partenaire</Text>
                            </View>
                        </View>
                        <Image
                        style={styles.image}
                        source={{uri: this.state.profilPic}}
                        />
                    </View>
                </View>
                
                {/* --- 
                <View style={{ paddingLeft: 20, marginVertical: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold'  }}>Mes élèves</Text>                   
                </View>
                --- */}
                  
                {/* --- Sous menu --- */} 

                <ScrollView>
                         
                <View style={{  
                                marginLeft: 20, 
                                marginRight:20,
                                backgroundColor:'#fff',
                                paddingLeft:20,
                                paddingRight:20,
                                borderRadius: 10, 
                                marginTop:15,
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: 90,
                                flexDirection: 'row'
                                }}>
                    <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100,width: '100%'}}>
                        <Text style={{marginTop: 20,  color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:10,paddingLeft:5}}>Nom Prénom</Text>
                        <TextInput
                            style={{ 
                            marginBottom: 20,
                            backgroundColor: '#e7ecff',
                            padding: 10,
                            borderRadius: 5, 
                            height:40, 
                            width: '100%',                     
                            }}
                            placeholder={professeur.nom}
                            placeholderTextColor={'#000'}
                            onChangeText = {(text) => 
                                {
                                    this.setState({ nomEleve: text })
                                }
                            }
                        />
                </View>
                
             </View>   

             <View style={{     marginLeft: 20, 
                                marginRight:20,
                                borderRadius: 10, 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: 90,
                                backgroundColor:'#fff',
                                paddingLeft:20,
                                paddingRight:20,
                                flexDirection: 'row',}}>
                    <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100,width: '100%'}}>
                        <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:10,paddingLeft:5}}>IBAN</Text>
                        <TextInput
                            style={{ 
                            backgroundColor: '#e7ecff',
                            padding: 10,
                            borderRadius: 5, 
                            height:40, 
                            width: '100%',                     
                            }}
                            placeholder={professeur.IBAN}
                            placeholderTextColor={'#000'}
                            onChangeText = {(text) => 
                                {
                                    this.setState({ nomEleve: text })
                                }
                            }
                        />
                </View>
                
             </View> 

             <View style={{     marginLeft: 20, 
                                marginRight:20,
                                borderRadius: 10, 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: 90,
                                backgroundColor:'#fff',
                                paddingLeft:20,
                                paddingRight:20,
                                flexDirection: 'row',}}>
                    <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100,width: '100%'}}>
                        <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:10,paddingLeft:5}}>SIRET</Text>
                        <TextInput
                            style={{ 
                            backgroundColor: '#e7ecff',
                            padding: 10,
                            borderRadius: 5, 
                            height:40, 
                            width: '100%',                     
                            }}
                            placeholder={professeur.SIRET}
                            placeholderTextColor={'#000'}
                            onChangeText = {(text) => 
                                {
                                    this.setState({ nomEleve: text })
                                }
                            }
                        />
                </View>        
             </View> 

             <View style={{     marginLeft: 20, 
                                marginRight:20,
                                borderRadius: 10, 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: 90,
                                backgroundColor:'#fff',
                                paddingLeft:20,
                                paddingRight:20,
                                flexDirection: 'row',}}>
                    <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100,width: '100%'}}>
                        <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:10,paddingLeft:5}}>Adresse Postale</Text>
                        <TextInput
                            style={{ 
                            backgroundColor: '#e7ecff',
                            padding: 10,
                            borderRadius: 5, 
                            height:40, 
                            width: '100%'                    
                            }}
                            placeholder={professeur.adresse}
                            placeholderTextColor={'#000'}
                            onChangeText = {(text) => 
                                {
                                    this.setState({ nomEleve: text })
                                }
                            }
                        />
                </View>
             </View>
             <View style={{     marginLeft: 20, 
                                marginRight:20,
                                borderRadius: 10, 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: 20,
                                backgroundColor:'#fff',
                                paddingLeft:20,
                                paddingRight:20,
                                flexDirection: 'row',}}>

            </View>

            </ScrollView>

                {/*--- MENU ---*/}
                
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                    <View >
             <TouchableOpacity
                    onPress={()=>{}}
                    style={{ 
                        marginLeft:20,
                        marginRight:20,
                        height:50, 
                        backgroundColor: '#456dfa', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: 8, 
                        marginBottom:20  
                        }}
                    >
                    <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16,fontWeight:'bold' }}>Enregistrer</Text>
                </TouchableOpacity>
                </View>
                        <BlurView 
                            intensity={100} 
                            style= {{
                                flexDirection:'row',
                                justifyContent:'space-around',
                                alignItems:'center', 
                                height:78,
                                borderRadius:10,
                                marginBottom:0
                            }}
                        >
                        <TouchableOpacity
                            onPress={()=> this.props.navigation.navigate('Main')}>
                                <Image style={{height:28,width:28,marginBottom:20}} source={require('../assets/images/accueil-inact.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=> { cleanAnnonces(annonces);
                                            this.props.navigation.navigate('Annonces');}}>
                                <Image style={{height:28,width:28,marginBottom:20}} source={require('../assets/images/annonce-inact.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=> {this.props.navigation.navigate('Profil');}}>
                                <Image style={{height:28,width:28,marginBottom:20}} source={require('../assets/images/profile-act.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=> this.props.navigation.navigate('Home')}>
                                <Image style={{height:28,width:28,marginBottom:20}} source={require('../assets/images/logout.png')}/>
                            </TouchableOpacity>
                        </BlurView>
                        <View 
                        style={{ 
                            position:'absolute',
                            paddingBottom: 20, 
                            backgroundColor: '#4b5866', 
                            width: '100%', 
                            height:30,
                            borderRadius:10,
                            zIndex:-1,
                            elevation:-1
                        }}>
                    </View>
                </View>


        
              


            </View>
            

        )
    }
}

const styles = StyleSheet.create({
    main_container: {
      backgroundColor: '#fff', 
      marginLeft: 20, 
      marginBottom:20,
      marginRight:20,
      marginTop:7,
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
      width: 60,
      height: 60,
      borderRadius:100,
      margin: 25,
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