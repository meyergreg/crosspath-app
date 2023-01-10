// Components/FilmItem.js

import React, {Component} from 'react'
import {Platform, StyleSheet, View, Text, Image, TouchableOpacity, Modal, TextInput, FlatList,KeyboardAvoidingView,Alert,ActivityIndicator } from 'react-native';
import { addEleve, refreshEleves,delEleve,professeur,addCE,modifEleve, getCoursHisto, triCoursHisto} from '../API/airtable';
import { TextInputMask } from 'react-native-masked-text'
import SwitchSelector from "react-native-switch-selector";
import DropDownPicker from 'react-native-dropdown-picker';
import { BlurView } from 'expo-blur';


var ladate= new Date(); 
let one2Tow = (n) => {
  if(String(n).length<2){
    n = "0" + String(n);
  }
  return n
}


class Eleve extends React.Component {

    state = {
      uniqueValue: 1,
      modalVisible: false,
      modalCoursVisible: false,
      opacity: 1,
      nomEleve: '',
      etageEleve: '',
      codeEleve: '',
      refresh: false,
      eleveCE: '',
      taskCE:'',
      nombreHeureCE:'1',
      selectElv: 'Sélectioner un élève',
      date: one2Tow(ladate.getDate())+"/"+one2Tow((ladate.getMonth()+1)),
      nomModif: 'nom',
      indiceModif:'',
      codeModif:false,
      indiceModif:false,
      open:false,
      load: false,
      open2:false,
    }

    componentDidMount(){
      //this.refEl()    
    }
    setOpen(open) {
      this.setState({
        open
      });
    }
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }
    setModalCoursVisible = (visible) => {
      this.setState({ modalCoursVisible: visible });
    }
    actualiseList = () => {
      this.setState({ refresh: !this.state.refresh});
    }
    elevePick = () => {
      listF = [];
      for (let x=0;x< professeur.eleves.length;x++) {
        listF.push({label: professeur.eleves[x][0], value: professeur.eleves[x][0]});
      }
      return listF
    }
    forceRemount = () => {
      setTimeout(()=>{
        this.setState(({ uniqueValue }) => ({
          uniqueValue: uniqueValue + 1
        }));
      },1000)
    }
    refEl(){
      /* this.setState({nomEleve: '',
      etageEleve: '',
      codeEleve: ''}); */
      this.setState({ refresh: !this.state.refresh});
      refreshEleves(professeur);
    
      
      setTimeout(() => {this.setState({ refresh: !this.state.refresh});
             },2500); 
             
    }
    
    loadingUpdateEleve() {
      if(this.state.codeModif){
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
    ifCodeModif = (bool) => {
      if(bool){
        //setTimeout(()=> {this.forceRemount();},1000);

        setTimeout(()=> {this.setState({codeModif: false});},4000);
        setTimeout(()=> {this.refEl()},4000);
    
      } 
    }
    checkProfTarif = (l) => {
      return l.includes(this.state.eleveCE); 
  }

    createTwoButtonAlert = () =>
    Alert.alert(
      "Alerte",
      "Would you like to edit this student ?",
      [
        {
          text: "Non",
          style: "cancel"
        },
        { text: "Oui", onPress: () => this.props.navigation.navigate('Home') }
      ]
    );


    render() {

      let { modalVisible } = this.state;
      let { modalCoursVisible } = this.state;
      let renderItem = ({ item }) => (
        <Item nom={item[0]} code={item[1]} etage={item[2]} tarif={item[3]} indice={item[4]}/>
      );
      var lev = this.elevePick();
      let Item = ({ nom ,code,etage,tarif,indice} ) => (
        <View style={{marginTop:4,marginHorizontal:10}}>
          
            <View style={styles.main_container}>
                <View style={{backgroundColor:'#eef3f6',width: 45, height: 45, borderRadius:50,margin: 10,justifyContent: 'center',
                        alignItems: 'center'}}>
                    <Image
                        style={styles.image}
                        source={require("../assets/images/icon-eleve.png")}
                    />
                </View>
                <View style={styles.content_container}>
                         
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{nom}</Text>            
                    </View>
                    <View style={styles.codeEtage_container}>
                        <View style={styles.code_container}>
                            <Text style={styles.code_text}>School : </Text>
                            <Text style={styles.code_value}>{code}</Text>
                        </View>
                        <View style={styles.etage_container}>
                            <Text style={styles.etage_text}>Task : </Text>
                            <Text style={styles.etage_value}>{etage}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
      );

    return (
        
      <View style={{opacity: this.state.opacity, maxHeight: '90%'}} key={this.state.uniqueValue}>
        
        {/* Nouvel Eleve */}
       
        
        {/* Cours effectué */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalCoursVisible}
          onRequestClose={() => {
            this.setModalCoursVisible(!modalCoursVisible);
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
                    <TouchableOpacity onPress={() => {this.setModalCoursVisible(!modalCoursVisible)
                                                      this.setState({ opacity: 1 })}}>
                      <Image style={{flexDirection:'row',width:30,height:30, alignSelf: 'flex-end',marginRight:20,marginTop:55}} source={require("../assets/images/close.png")}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop:10,marginBottom:15,alignItems: "center",width:65,height:65,borderRadius:150,backgroundColor:'#fff',justifyContent: 'center'}}>
                    <Image
                    style={{width:75,height:75}}
                    source={require("../assets/images/check.png")}
                    />
                  </View>
                  <Text style={{marginTop: 10,fontWeight: 'bold',  fontSize: 20,}}>Course finished</Text>
                      <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}} >
                    <Text style={{marginTop: 20,  color:'black',fontWeight:'500',fontSize: 15,marginBottom:10, justifyContent:'flex-start',flexDirection:'row'}}>Name</Text>
                    
                     <DropDownPicker
                          open={this.state.open}
                          setOpen={() => this.setState({open: !this.state.open})}
                          items={lev}
                          value={this.state.selectElv}
                          //defaultValue={this.state.selectElv}
                          //setValue={this.state.eleveCE}
                          //setValue={item => this.setState({eleveCE: item.value})}
                          onSelectItem={(item) => {
                            this.setState({eleveCE: item.value})
                          }}
                          /* onChangeValue={(item) => {
                            this.setState({eleveCE: item.value})
                          }} */
                          //defaultIndex={0}
                          zIndex={100}
                          containerStyle={{height: 40,width:280}}

                          dropDownStyle={{zIndex:100}}
                          style={{paddingVertical: 10,backgroundColor: '#F1E5FA',borderColor:'#F1E5FA'}}
                          placeholder={this.state.eleveCE !== ''? this.state.eleveCE : 'Select a student'}
                          //onChangeItem={item => this.setState({eleveCE: item.value})}

                      /> 
                      
                      </View>
                      <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:80}}>
                      <Text style={{marginTop: 20,  color:'black',fontWeight:'500',fontSize: 15,marginBottom:10, justifyContent:'flex-start',flexDirection:'row'}}>Task</Text>
                      <DropDownPicker
                          open={this.state.open2}
                          setOpen={() => this.setState({open2: !this.state.open2})}
                          items={[{label: 'Cohort course', value: 'Cohort course'},{label: 'CV / CL', value: 'CV / CL'},{label: 'Follow up', value: 'Follow up'},{label: 'Mock', value: 'Mock'}]}
                          //value={this.state.selectElv}
                          //defaultValue={this.state.selectElv}
                          //setValue={this.state.eleveCE}
                          //setValue={item => this.setState({eleveCE: item.value})}
                          onSelectItem={(item) => {
                            this.setState({taskCE: item.value})
                          }}
                          /* onChangeValue={(item) => {
                            this.setState({eleveCE: item.value})
                          }} */
                          //defaultIndex={0}
                          zIndex={100}
                          containerStyle={{height: 40,width:280}}

                          dropDownStyle={{zIndex:100}}
                          style={{paddingVertical: 10,backgroundColor: '#F1E5FA',borderColor:'#F1E5FA'}}
                          placeholder={this.state.taskCE !== ''? this.state.taskCE : 'Select a task'}
                      />
                      </View>
                      <View style={{ justifyContent:'flex-start',flexDirection:'column'}}>
                     
                      <Text style={{marginTop: 20,  color:'black',fontWeight:'500',fontSize: 15,marginBottom:10, justifyContent:'flex-start',flexDirection:'row'}}>Date of the course : DD/MM</Text>
                      <TextInput
                      style={{   
                        backgroundColor: '#F1E5FA',
                        padding: 10,
                        borderRadius: 5, 
                        height:40, 
                        width: 280,                     
                        }}
                        onChangeText={(text) => {
                          this.setState({
                            date: text
                          })
                        }}
                        type={'datetime'}
                        value={this.state.date}
                        options={{
                          format: 'DD/MM'
                        }} 
                        placeholder={this.state.date}
                      />
                      </View>
                <TouchableOpacity
                  onPress={() => { 
                    Alert.alert(
                    "Confirmation",
                    "I confirm the course finished",
                    [
                      {
                        text: "Non",
                      },
                      { text: "Oui",
                      
                      onPress: () => {
                        if(this.state.eleveCE !== ''){

                          setTimeout(() => {this.setModalCoursVisible(!modalCoursVisible);},1000);
                          
                          this.setState({ 
                                          opacity: 1});
                          
                          //console.log(professeur.eleves[professeur.eleves.findIndex(this.checkProfTarif)][3]);
                                          //nom prof, nom elefe, date, heure,id,tarif
                          addCE(professeur.nom,this.state.eleveCE,this.state.date,this.state.taskCE,professeur.id, professeur.eleves[professeur.eleves.findIndex(this.checkProfTarif)][3]);
                          setTimeout(() => {
                            alert('Your task has been recorded');
                            getCoursHisto(professeur.email);
                          },1500);
                          setTimeout(() => {triCoursHisto(professeur.heures)},2500);
                          //this.setState({ nombreHeureCE: '1' });

                          
                        }else{
                          alert('You must select a student');
                        }  
                      }}
                    ] 
                  );      
                                }}
                  style={{ 
                    marginTop:20,
                    width: 280,
                    height:50, 
                    backgroundColor: '#9F54DC', 
                    margin: 10,
                    marginBottom:50,
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: 50,    
                    }}
                >
                  <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16,fontWeight:'bold' }}>Submit</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </View>
          
        </Modal>
          <View style={{flex:1,position:'absolute',marginTop:100,zIndex:100,justifyContent:'center',alignSelf:'center'}}>{this.loadingUpdateEleve()}</View>
          <FlatList
          //extraData={this.state.refresh}
          refreshing={this.state.refresh}
          onRefresh={() => this.refEl()}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={professeur.eleves}
          renderItem={renderItem}
          keyExtractor={item => item[4]}
          />  
            <View style={{
              alignItems: 'center',
              justifyContent:'flex-end',
              marginBottom:10
             }}>
                <TouchableOpacity
                    onPress={()=>{this.setModalCoursVisible(!modalCoursVisible)}}
                    style={{ 
                        marginLeft:20,
                        marginRight:20,
                        marginTop:10,
                        width:'95%',
                        height:50, 
                        backgroundColor: '#9F54DC', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: 100,  
                        width:'70%' 
                        }}
                    >
                    <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16,fontWeight:'bold' }}>Course finished</Text>
                </TouchableOpacity>
                
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  main_container: {
    height: 130,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius:10,
    marginTop:5,
    marginBottom:5,
    shadowColor: "#233443",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 5,
    flexDirection:'row'
  },
  image: {
    width: 20,
    height: 20  
  },
  content_container: {
    flex: 1,
    margin: 5

  },
  header_container: {
    flex: 2,
    flexDirection: 'row',
    
  },
  title_text: {
    color: '#2A2B34',  
    fontSize:16,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    paddingTop: 15
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  codeEtage_container: {
    marginTop:-30,
    flex: 2,
    flexDirection: 'column',
    justifyContent:'space-around',
    maxWidth:'100%'
  },
  code_container: {
    flexDirection: 'row',
    backgroundColor:'#EEEEF1',
    borderRadius:3,
    height: 30,
    maxWidth:'80%',
    alignItems:'center',
    paddingLeft:8,
    paddingRight:8
  },
  code_text: {
    paddingLeft:3,
    fontWeight: '700',
    color: '#5B5C8C',
  },
  code_value: {
    color: '#5B5C8C'
  },
  etage_container: {
    marginTop:10,
    flexDirection: 'row',
    backgroundColor:'#EEEEF1',
    borderRadius:3,
    height: 30,
    maxWidth:'80%',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingLeft:8,
    paddingRight:8,
    marginBottom:10
  },
  etage_text: {
    fontWeight: '700',
    color: '#5B5C8C'
  },
  etage_value: {
    color: '#5B5C8C'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default Eleve