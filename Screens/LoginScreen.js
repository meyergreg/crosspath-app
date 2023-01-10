import * as React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView ,Linking,Modal} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { getProfesseurData, professeur, refreshAnnonces, cleanAnnonces,annonces,getFactures, utiliseApp} from '../API/airtable'
import * as Animatable from 'react-native-animatable';
import { BlurView } from 'expo-blur';
import { WebView } from 'react-native-webview';


export default class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.validateInput = React.createRef()
    }

    state = {
        username: "",
        password: "",
        errMsg: "",
        isLoading: false,
        modalWebView: false,
    }   
    onLogin = (user) => {
        getProfesseurData(user);
        //refreshAnnonces();
        //cleanAnnonces(annonces);
        setTimeout(() => {return this.onLogin2()},3000);
    }
    
    onLogin2 = async () => {
        //console.log(professeur);
        if(professeur.nom != '' && professeur.nom !== null){
            if(this.state.username.toLowerCase() === professeur.email && this.state.password === professeur.motDePasse){
                let jsonValueMail = professeur.email;
                let jsonValueMdp = professeur.motDePasse;
                await AsyncStorage.setItem("usernameStk",jsonValueMail);
                await AsyncStorage.setItem("passwordStk",jsonValueMdp);
                await AsyncStorage.setItem("firstLogStk",'1');
                utiliseApp(professeur);
                /*this.props.navigation.navigate('Main', { username: this.state.username })*/
                this.props.navigation.navigate('Main');
                //this.props.navigation.navigate('Backgrd');
                this.setState({
                    isLoading: false})
            }else{
                this.validateInput.current.shake(800);
                this.setState({
                    isLoading: false,
                    errMsg: 'Mot de passe incorrect'})
            }              
        }else{
            this.validateInput.current.shake(800);
            this.setState({
                isLoading: false,
                errMsg: 'Identifiant incorrect'})
        }
    }
    loadingIndic() {
        if(this.state.isLoading){
            return( 
                <View
                        style= {{flex:1, justifyContent:'center', alignItems:'center', width:300,height:50,borderRadius:5,position:'absolute',padding:10}}
                        >
                    <ActivityIndicator  color="#fff"/>
                </View>
            );
        }else{
            return(
            <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16, fontWeight:'600'}}>Connect</Text>
            );
        }
    }
    clickInscrire (url){
        return(
            Linking.openURL(url)
        );
      }

      setModalWebView = (visible) => {
        this.setState({ modalWebView: visible });
      }
    render(){
        this.props.navigation.setOptions({
            headerBackTitle: '',
            headerShown: false
        })


        return(
            <View style={styles.container}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalWebView}
                onRequestClose={() => {
                    this.setModalWebView(!this.state.modalWebView);
                }}
                
                >
                    
                    <View style={{flex: 1,justifyContent: "flex-start",alignItems: "center"}}>
                    <KeyboardAvoidingView
                            behavior="padding"
                            style={{width:'100%',flex:1}}
                        >
                    <View style={{  
                        marginTop: 10,
                        backgroundColor: "white",
                        borderTopLeftRadius: 30,
                        borderTopRightRadius:30,
                        width: '100%',
                        alignItems: "center",
                        elevation: 5}}>
                        <View style={{flexDirection:'row',alignSelf: 'flex-end'}}>
                            <TouchableOpacity onPress={() => {this.setModalWebView(!this.state.modalWebView);
                                                            this.setState({ opacity: 1 })}}>
                            <Image style={{flexDirection:'row',width:30,height:30, alignSelf: 'flex-end',marginRight:20,marginTop:55}} source={require("../assets/images/close.png")}/>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={{height:'100%',width:'100%'}}>
                        <WebView source={{uri: "https://airtable.com/shr6t3GtSO9yVRmYr"}}/>
                        </View>
                        
                    </View>
                    </KeyboardAvoidingView>
                    </View>
          
                </Modal>

                <Image
              style={{ width:45, height: 55, marginTop: 5}}
              source={require('../assets/images/crossPathLogoC.png')}
              
            />
                <View           
                style={{ 
                  marginTop:40,
                  backgroundColor: '#E4E2E7', 
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
                  color: '#59545C',
                  fontWeight: 'bold', 
                  fontSize: 18 
                }}>
                  Mentor Space
                </Text>
              </View>
             
              <KeyboardAvoidingView
                    behavior="padding"
                  >
                <Text style={{ fontSize: 22, fontWeight: '600',marginTop: 60 }} >Login</Text>
                <Animatable.View
                    ref={this.validateInput}
                >
                <TextInput
                    style={{ 
                    marginTop: 20,  
                    backgroundColor: '#F1E5FA',
                    padding: 10,
                    borderRadius: 5, 
                    height:40, 
                    width: 300,                     
                   }}
                    placeholder="Email"
                    onChangeText = {(text) => 
                        {
                            this.setState({errMsg: ''}),
                            this.setState({ username: text })
                        }
                    }
                />

                <TextInput
                    style={{ 
                    marginTop: 20,  
                    backgroundColor: '#F1E5FA',
                    padding: 10,
                    borderRadius: 5, 
                    height:40, 
                    width: 300}}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText = {(text) => 
                        {
                            this.setState({errMsg: ''}),
                            this.setState({ password: text })}
                        }

                />
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{this.state.errMsg}</Text>
                
                </Animatable.View>

                

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20,width:'90%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.onLogin(this.state.username.toLowerCase());
                            this.setState({isLoading: true});
                        }}
                        style={{ 
                            width: 300,
                            height:50, 
                            backgroundColor: '#A55EDE', 
                            padding: 10, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            borderRadius: 100,              
                         }}
                    >
                        {this.loadingIndic()}
                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => {this.clickInscrire("https://airtable.com/shrpoaDfUHNj2IRMx")}} >
                    <Text style={{ marginTop: 20 }}>Password forgot ?</Text>
                    </TouchableOpacity>


                    

                    <View style={{ flexDirection: 'row',marginTop: 40 }}>
                    <Text style={{ color: 'gray' }}>You don't have an account ?</Text>
                    <TouchableOpacity onPress={ () => {this.setModalWebView(!this.state.modalWebView)}}>
                    <Text style={{ fontWeight: 'bold' }}> Register</Text>
                    </TouchableOpacity>
                    </View>
                </View> 
                </KeyboardAvoidingView>
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