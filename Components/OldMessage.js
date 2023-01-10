import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity,Linking, ScrollView } from 'react-native';
import {addMessage, professeur} from '../API/airtable';

class Message extends React.Component {
  
  constructor(props) {
    super(props)
    this.messageText = "" // Initialisation de notre donnée searchedText en dehors du state
  }
  state = {
    msg:'',
    placeHolder:'Message'
  }
  _messageTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }

  clickInscrire (){
    return(
        Linking.openURL("mailto: support@grade-up.fr")
    );
  }
  render() {
    
    return (
    <View>

      {/* ---  Message INNPUT --- */}
      <ScrollView>
      <View style={styles.main_message}>
        
        <View style={styles.content_message}>
          <View style={styles.header_message}>
            <Text style={styles.title_message}>👋 Comment pouvons-nous vous aider ?</Text>          
          </View>
          <View style={styles.codeEtage_message}>
            <TextInput
              style={styles.message_input}
              placeholder='Message'
              onChangeText = {(text) => 
                {
                    this.setState({ msg: text })
                }}
                ref={input => { this.textInput = input }}
            />
              <TouchableOpacity           
                style={{ 
                  marginTop:10,
                  backgroundColor: '#e5f0ff', 
                  padding: 10, 
                  width:100, 
                  borderRadius: 10, 
                  height:40, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  flex:1,
                  alignSelf: "flex-end",
                  marginRight:10,
                  marginBottom:5
                }}
                value={this.state.placeHolder}
                placeholder= {this.state.placeHolder}
                onFocus={() => this.setState({placeHolder: ''})}
                onPress={ () => {addMessage(professeur, this.state.msg);
                                 this.setState({msg: '',placeHolder: 'Nouveau message'});
                                 console.log(typeof this.state.msg);
                                 if(this.state.msg == ''){
                                   alert("Champs vide")
                                 }else{
                                  alert("Message envoyé");
                                  this.textInput.clear(); 
                                  }}}>
                <Text style={{ 
                  textAlign: 'center', 
                  color: '#2383f6',
                  fontWeight: 'bold', 
                  fontSize: 15 
                }}>
                  Envoyer
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
      
    {/* --- Mail --- */}

      <View>
        <View style={{
      
        }}>
              <Text style={{ 
                  margin:7,
                  textAlign: 'center', 
                  color: '#97a2aa',
                  fontWeight: 'bold', 
                  fontSize: 15 
                }}>
                  OU
                </Text>
        </View>
      <View style={styles.main_container}>
        <View style={{backgroundColor:'#eef3f6',marginTop:15,width: 50, height: 50, borderRadius:50,margin: 10,justifyContent: 'center',
                alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={require("../assets/images/icon-mail.png")}
          />
        </View>
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>Par mail</Text>          
          </View>
          <View style={styles.codeEtage_container}>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>support@grade-up.fr</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={()=> this.clickInscrire()}> 
        <View style={{backgroundColor:'#e5f0ff',marginTop:25,width: 90, height: 40, borderRadius:10,margin: 10,justifyContent: 'center',
                alignItems: 'center'}}>
          <View>
              <Text style={{fontWeight:'bold', color:'#0063f3'}}>Mail</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
      </View>

    {/* ---  Portable--- */}
    
    
    </ScrollView>
    </View>
      
    )
  }
}

const styles = StyleSheet.create({
  main_message: {
    height: 170,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 7,
    borderRadius:10,
  },
  message_input: {
    backgroundColor:'#e7ecff',
    margin: 10,
    height:40,
    borderRadius: 10,
    paddingLeft:15,
    fontWeight:'bold'
  },
  content_message: {
    flex: 1,
    margin: 5,
  },
  header_message: {
    flex: 2,
    flexDirection: 'row'
  },
  title_message: {
    fontWeight: 'bold',
    color: '#97a2aa',
    margin:10
  },
  codeEtage_message: {
    flex: 5,
  },
  main_container: {
    height: 90,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 7,
    borderRadius:10,
  },
  image: {
    width: 23,
    height: 23  
  },
  content_container: {
    flex: 1,
    margin: 5,

  },
  header_container: {
    flex: 2,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    paddingTop:15
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  codeEtage_container: {
    flex: 2,
  },
  date_container: {
    flex: 2,
    flexDirection: 'row',
  },
  date_text: {
    fontWeight: '600',
    fontSize:13,
    color: '#97a2aa'
  },
  date_value: {
    color: '#2383f6'
  }
})

export default Message