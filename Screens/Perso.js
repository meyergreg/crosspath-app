import * as React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView ,ScrollView,Linking,Alert} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getProfesseurData, professeur,deleteMentor, refreshAnnonces, cleanAnnonces,annonces,getFactures,changeInfo,signOffLine} from '../API/airtable'
import * as Animatable from 'react-native-animatable';
import { BlurView } from 'expo-blur';
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.validateInput = React.createRef()
    }

    state = {
        profSiret:professeur.SIRET,
        profIban:professeur.IBAN,
        adressePostale: professeur.adresse,
        isLoading: false,
        active:"",
        name: "",
        modalCoursVisible:true,
        profilPic: "../assets/images/icon-eleve.png",
        laguage:"english"
    }   
    componentDidMount() {
        this.props.navigation.navigate('Perso');
        getProfesseurData(professeur.email);
        this.setState({
            name: professeur.nom,
            profilPic: professeur.profilPic,
            isLoading: false
        })   
         
      }
      clickInscrire (url){
        return(
            Linking.openURL(url)
        );
      }
    signatureDone(){
            setTimeout(() => {
                getProfesseurData(professeur.email)},3000);
    }
      
    loadingIndic() {
        if(this.state.isLoading){
            return( 
                <BlurView 
                        intensity={98} 
                        style= {{flex:1, justifyContent:'center', alignItems:'center', width:100,height:100,backgroundColor:'#fff',borderRadius:25}}
                        >
                    <ActivityIndicator size="large"/>
                </BlurView>
            );
        }
    }
     isSign(){
        /* console.log('last',signOffLine[signOffLine.length - 1]);
        console.log('all',signOffLine); */
        
        /* setTimeout(() => {getProfesseurData(professeur.email)},2000); */
        //let ifSignatureContrat = await AsyncStorage.getItem("signatureContrat");
        if(professeur.contrat  /* || ifSignatureContrat  */){
            return(
                <View>
                    <TouchableOpacity style={{marginTop:3,marginLeft:10,backgroundColor:'#e7ecff',borderRadius:3}}>
                        <Image style={{width:20,height:20,margin:1}} source={require("../assets/images/task-done.png")}/> 
                    </TouchableOpacity>
                </View>
            );
        }else{
            return(
                <View>
                    <TouchableOpacity style={{marginTop:3,marginLeft:20,borderRadius:3}} onPress={()=> {this.props.navigation.navigate('ContratProf')}}>
                        <Text style={{margin:3,borderRadius:3,marginRight:10,color: '#5588ff',fontWeight:'600'}}>Signer</Text>
                    </TouchableOpacity>
                </View>
            );
        }
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

    clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      }

    alertDeleteAccount = () =>
    Alert.alert(
      "Confirmation",
      "Do you want to delete your account ?",
      [
        {
          text: "Non",
          style: "cancel"
        },
        { text: "Oui", onPress: () => {
            this.clearAll();
            this.props.navigation.navigate('HomeScreen');
            deleteMentor(professeur);}}
      ]
    );

    render(){
        this.props.navigation.setOptions({
            headerBackTitle: '',
            gestureEnabled: false,
            headerShown: false,
            animationEnabled: false
        })


        return(

            <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={{width:'100%',marginTop:25}}>
                    {/* --- WELCOME SECTION --- */}    
                   
                        
                    {/* --- BLOQUE PROFIL --- */}
                    <View style={styles.main_container}> 
                        <View style={styles.content_container}>
                            <View style={styles.header_container}>                      
                            </View>
                            <View style={styles.description_container}>
                                <Text style={{ color: '#59545C', fontWeight: 'bold',marginLeft:20,marginBottom:10, fontSize:17 }}>{this.state.name}</Text>
                                <Text style={{ color: '#A55EDE',marginLeft:20,fontWeight:'600' }}>Partner mentor</Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: '#F1E5FA',borderRadius:10,marginVertical:15,marginRight:15}}>
                          <Image
                          style={{ width: 25,
                            height: 35,
                            borderRadius:0,
                            margin: 15,}}
                          source={require("../assets/images/crossPathLogoC.png")}
                          />
                        </View>
                    </View>
                </View>
              <View style={{position:'absolute', zIndex:100}}>
                  {this.loadingIndic()}
              </View>
              
              <KeyboardAvoidingView
                    behavior="padding"
                  >
                <View style={{borderRadius: 10,backgroundColor:'#fff',paddingLeft: 20, 
                                paddingRight:20}}>

                <Animatable.View
                    ref={this.validateInput}
                >
                    <SwitchSelector
                        style={{ width:300,marginTop:20}}
                        buttonColor={'#A55EDE'}
                        borderColor={'#e7ecff'}
                        initial={0}
                        onPress={value => this.setState({ laguage: value })}
                        borderRadius={5}
                        hasPadding
                        options={[
                            { label: "English", value: "english" },
                          { label: "French", value: "french" } //images.feminino = require('./path_to/assets/img/feminino.png')
                          
                        ]}
                      />
                    {this.state.laguage=="french" ?
                       <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:5,marginTop: 20,}}>SIRET</Text>
                       :
                       <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:5,marginTop: 20,}}>Account Number</Text>
                    }

               
                <TextInput
                    style={{   
                    backgroundColor: '#F1E5FA',
                    padding: 10,
                    borderRadius: 5, 
                    height:40, 
                    width: 300,                     
                   }}
                   placeholder={professeur.SIRET}
                   placeholderTextColor={'#000'}
                   onChangeText = {(text) => 
                       {
                           this.setState({ profSiret: text })
                       }
                    }
                />
               {/*  <TouchableOpacity style={{marginTop:5}} onPress={()=> {this.clickInscrire("https://grade-up.fr/statut-auto-entrepreneur/")}}>
                    <Text style={{ color:'grey',fontWeight: '300',fontStyle:'italic' }}>Devenir auto-entrepreneur</Text>
                    </TouchableOpacity> */}
                {this.state.laguage=="french" ?
                       <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:5,marginTop: 20,}}>IBAN</Text>
                       :
                       <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:5,marginTop: 20,}}>Sort Code</Text>
                }
                <TextInput
                    style={{  
                    backgroundColor: '#F1E5FA',
                    padding: 10,
                    borderRadius: 5, 
                    height:40, 
                    width: 300,                     
                   }}
                   placeholder={professeur.IBAN}
                   placeholderTextColor={'#000'}
                   onChangeText = {(text) => 
                       {
                           this.setState({ profIban: text })
                       }
                    }
                />
                {this.state.laguage=="french" ?
                       <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:5,marginTop: 20,}}>Adresse Postale</Text>
                       :
                       <Text style={{color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:5,marginTop: 20,}}>Name on Card</Text>
                }
                <TextInput
                    style={{ 
                    backgroundColor: '#F1E5FA',
                    padding: 10,
                    borderRadius: 5, 
                    height:40, 
                    width: 300}}
                    placeholder={professeur.adresse}
                   placeholderTextColor={'#000'}
                   onChangeText = {(text) => 
                       {
                           this.setState({ adressePostale: text })
                       }
                   }
                />
                <Text style={{ color: 'red', textAlign: 'center'}}>{this.state.errMsg}</Text>
                <View style={{flexDirection:'row'}}>
                    {/* <TouchableOpacity style={{marginTop:5}} onPress={()=> {this.clickInscrire("https://grade-up.fr/wp-content/uploads/2021/12/contrat-prof.pdf")}}>
                        <Text style={{ color: 'grey', fontSize: 15,fontWeight:'600',marginBottom:10}}>Contrat Professeur</Text>
                    </TouchableOpacity>
                    {this.isSign()} */}
                    {/* <TouchableOpacity style={{marginTop:3,marginLeft:20,backgroundColor:'#e7ecff',borderRadius:3}} onPress={()=> {this.props.navigation.navigate('ContratProf')}}>
                        <Image style={{width:20,height:20,margin:1}} source={require("../assets/images/task-done.png")}/> 
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:3,marginLeft:20,backgroundColor:'#e7ecff',borderRadius:3}} onPress={()=> {this.props.navigation.navigate('ContratProf')}}>
                        <Text style={{textDecorationLine: 'underline',margin:3,borderRadius:3,marginLeft:10,marginRight:10,color:'red'}}>Signer</Text>
                    </TouchableOpacity> */}
                </View>
                </Animatable.View>

                

                <View style={{flexDirection:'column', alignItems: 'center', justifyContent: 'center', marginTop: 10,marginBottom:10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({isLoading: true});
                            changeInfo(professeur,this.state.profSiret,this.state.profIban,this.state.adressePostale);
                            setTimeout(() => {
                                this.setState({isLoading: false});
                                getProfesseurData(professeur.email)},3000);
                        }}
                        style={{ 
                            width: 300,
                            height:50, 
                            backgroundColor: '#A55EDE', 
                            padding: 10, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            borderRadius: 50,              
                         }}
                    >
                        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16, fontWeight:'600'}}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.alertDeleteAccount()
                        }}
                        style={{ 
                            width: 300,
                            marginTop:10,
                            alignItems: 'center', 
                            justifyContent: 'center',              
                         }}
                    >
                        <Text style={{ textAlign: 'center', color: '#59545C', fontSize: 16, fontWeight:'400',textDecorationLine:'underline'}}>Delete my account</Text>
                    </TouchableOpacity>
                    
                    {/* <TouchableOpacity style={{marginBottom:10}} onPress={()=> {this.props.navigation.navigate('Backgrd')}}>
                        <Text style={{ fontWeight: 'bold',marginTop:15}}>Gérer les notifications </Text>
                    </TouchableOpacity> */}
                    
                </View>
                </View>
                </KeyboardAvoidingView>
                </View>


                {/* <View style={{justifyContent:'flex-end'}}>
                    
                <View style={{justifyContent:'flex-end', backgroundColor:'#e5f0ff'}}>
                <View  
                    style= {{
                        flexDirection:'row',
                        justifyContent:'space-around',
                        alignItems:'center', 
                        height:70,
                        borderRadius:10,
                        marginBottom:0
                    }}
                >
                            <TouchableOpacity
                            hitSlop={{top: 20, bottom: 20, left: 30, right: 30}}
                            onPress={()=> this.props.navigation.navigate('Main')}>
                                <Image style={{height:28,width:28,marginBottom:10}} source={require('../assets/images/accueil-inact.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            hitSlop={{top: 20, bottom: 20, left: 30, right: 30}}
                            onPress={()=> { 
                                            this.props.navigation.navigate('Annonces');}}>
                                <Image style={{height:28,width:28,marginBottom:10}} source={require('../assets/images/annonce-inact.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            hitSlop={{top: 20, bottom: 20, left: 30, right: 30}}
                            onPress={()=> {this.props.navigation.navigate('Perso');}}>
                                <Image style={{height:28,width:28,marginBottom:10}} source={require('../assets/images/profile-act.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                            hitSlop={{top: 20, bottom: 20, left: 30, right: 30}}
                            onPress={()=> this.createTwoButtonAlert()}>
                                <Image style={{height:28,width:28,marginBottom:10}} source={require('../assets/images/logout.png')}/>
                            </TouchableOpacity>
                    </View>
                
                </View>
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
                </View> */}


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f3',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
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
      }
    
})
