import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, TextInput, FlatList,KeyboardAvoidingView, Alert, ScrollView} from 'react-native';
import { addFacture,getFactures ,checkFact,professeur} from '../API/airtable';
import { BlurView } from 'expo-blur';
import {ActivityIndicator } from 'react-native';



function statutFact(etat){
  if(etat == 'Pending'){
    return(
      <View style={{backgroundColor:'#fff7ec',marginTop:33,width: 70, height: 25, borderRadius:5,justifyContent: 'center',
                alignItems: 'center',marginRight:12}}>
            <View>
              <Text style={{fontWeight:'bold', color:'#f79066',fontSize:10}}>Pending</Text>
            </View>
      </View>
    );
  }else if(etat == 'Verified'){
    return(
      <View style={{backgroundColor:'#d8fee5',marginTop:33,width: 70, height: 25, borderRadius:5,justifyContent: 'center',
                alignItems: 'center',marginRight:12}}>
            <View>
              <Text style={{fontWeight:'bold', color:'#00ce90',fontSize:10}}>Verified</Text>
            </View>
      </View>
    );
  }else{
    return(
      <View style={{backgroundColor:'#ffedf2',marginTop:33,width: 70, height: 25, borderRadius:5,justifyContent: 'center',
                alignItems: 'center',marginRight:12}}>
            <View>
              <Text style={{fontWeight:'bold', color:'#f54056',fontSize:10}}>Refused</Text>
            </View>
      </View>
    );
  }
}
//[[id,date,mois,montant,etat]]
let Item = ({ date ,mois,montant,etat} ) => (
  <View style={styles.main_container}>
        <View style={{backgroundColor:'#eef3f6',marginTop:22,width: 45, height: 45, borderRadius:50,margin: 10,justifyContent: 'center',
                alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={require("../assets/images/icon-facture.png")}
          />
        </View>
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{mois}</Text>          
          </View>
          <View style={styles.codeEtage_container}>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>{date}</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          {statutFact(etat)}
          <View style={{backgroundColor:'#EEEEF1',marginTop:33,width: 80, height: 25, borderRadius:5,margin: 10,justifyContent: 'center',
                  alignItems: 'center'}}>
            <View>
                <Text style={{fontWeight:'bold', color:'#5B5C8C'}}>{montant}</Text>
            </View>
          </View>
      </View>

    </View>

);

class Facture extends React.Component {

  state = {
    check: false,
    isLoading: false,
    modalVisible: false,
    opacity: 1,
    nombreHeure: '',
    tarifHorraire: '',
    date: '',
    refresh: false,
    ligneRemu:'4',
    nh1_1:'0', 
    th1_1:'0', 
    nh1_2:'0', 
    th1_2:'0', 
    nh1_3:'0', 
    th1_3:'0',
    nh1_4:'0', 
    th1_4:'0',
    load:false,
  }

  componentDidMount(){
    /* getFactures(professeur.nom);
    this.setState({check: checkFact(professeur.email)});
    this.setState({load: !this.state.load})
    this.setState({load: !this.state.load}) */
    //this.setState({ refresh: !this.state.refresh});
    //getFactures(professeur.nom);
    //this.setState({check: checkFact(professeur.email)})
    //this.setState({check: checkFact(professeur.email)});
    //setTimeout(() => {this.setState({ refresh: !this.state.refresh});},500);
    //this.refFact();
    //setTimeout(() => {this.setState({check: checkFact(professeur.email)});},1500);
    this.refFact();
  }

  

  showAlert = () =>
  Alert.alert(
    "Attention",
    "Votre profil est incomplet",
    [
      {
        text: "Compléter",
        onPress: () =>{ 
          Alert.alert(
            "Rendez-vous dans la section Profil",
            [
              {
                text: "OK",
                onPress: () => {}
              }
            ]
          )},
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setSelectedHeure = (value) => {
    this.setState({ nombreHeure: value});
  }
  btnAddLignRemu(){
    if(this.state.ligneRemu <= 2) {
      return(
        <View style={{justifyContent:'flex-start',flexDirection:'row',zIndex:100,width:280}}>
        <TouchableOpacity
            onPress={() => {
              if(this.state.ligneRemu < 2){
                this.setState({ ligneRemu: 2 })
              }else{
                this.setState({ ligneRemu: 3 })
              }
            }
            }
            style={{
                justifyContent: 'flex-start',
                height:50, 
                padding: 0,
                alignItems: 'center', 
                justifyContent: 'center', 
                borderRadius: 5, 
                marginTop: 15,  
                flexDirection:'row' 
                }}
            >
            <Image source={require("../assets/images/ajouter.png")} style={{ width: 25, height: 25, marginRight:7 }}/>
            <Text style={{ textAlign: 'center', color: 'grey', fontSize: 15,fontWeight:'600' }}> Ajouter une rémunération</Text>
        </TouchableOpacity>
        </View>
      );
    }
  }
  addLigneRemu() {
    if(this.state.ligneRemu >= 2){
        return( 
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}}>
              <Text style={{marginTop: 20,  color:'grey',fontWeight:'600',fontSize: 15,marginBottom:5, justifyContent:'flex-start',flexDirection:'row'}}>Cohort course</Text>
              <TextInput
                keyboardType={'decimal-pad'}
                style={{   
                backgroundColor: '#F1E5FA',
                padding: 10,
                borderRadius: 5, 
                height:40, 
                width: 125,                     
                }}
                placeholder="number"
                placeholderTextColor="#7C808A"
                onChangeText = {(text) => 
                    {
                        this.setState({ nh1_2: text })
                    }
                }
              />
          </View>
          <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}}>
              <Text style={{marginLeft:30,marginTop: 20,  color:'grey',fontWeight:'600',fontSize: 15,marginBottom:5, justifyContent:'flex-start',flexDirection:'row'}}>Tarification</Text>
              <TextInput
                keyboardType={'decimal-pad'}
                style={{ 
                marginLeft:30, 
                backgroundColor: '#F1E5FA',
                padding: 10,
                borderRadius: 5, 
                height:40, 
                width: 125,                     
                }}
                placeholder="price / task"
                placeholderTextColor="#7C808A"
                onChangeText = {(text) => 
                    {
                        this.setState({ th1_2: text })
                    }
                }
              />
          </View>
        </View>
        );
    }
  }
  addLigneRemu2() {
    if(this.state.ligneRemu == 4){
      return( 
        <View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:0}}>
        <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}}>
            <Text style={{marginTop: 20,  color:'grey',fontWeight:'600',fontSize: 15,marginBottom:5, justifyContent:'flex-start',flexDirection:'row'}}>CV / CL</Text>
            <TextInput
              keyboardType={'decimal-pad'}
              style={{   
              backgroundColor: '#F1E5FA',
              padding: 10,
              borderRadius: 5, 
              height:40, 
              width: 125,                     
              }}
              placeholderTextColor="#7C808A"
              placeholder="number"
              onChangeText = {(text) => 
                  {
                      this.setState({ nh1_3: text })
                  }
              }
            />
        </View>
        <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}}>
            <Text style={{marginLeft:30,marginTop: 20,  color:'grey',fontWeight:'600',fontSize: 15,marginBottom:5, justifyContent:'flex-start',flexDirection:'row'}}>Tarification</Text>
            <TextInput
              keyboardType={'decimal-pad'}
              style={{ 
              marginLeft:30, 
              backgroundColor: '#F1E5FA',
              padding: 10,
              borderRadius: 5, 
              height:40, 
              width: 125,                     
              }}
              placeholder="price / task"
              placeholderTextColor="#7C808A"
              onChangeText = {(text) => 
                  {
                      this.setState({ th1_3: text })
                  }
              }
            />
        </View>
      </View>
       <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20}}>
       <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}}>
           <Text style={{marginTop: 20,  color:'grey',fontWeight:'600',fontSize: 15,marginBottom:5, justifyContent:'flex-start',flexDirection:'row'}}>Follow up</Text>
           <TextInput
             keyboardType={'decimal-pad'}
             style={{   
             backgroundColor: '#F1E5FA',
             padding: 10,
             borderRadius: 5, 
             height:40, 
             width: 125,                     
             }}
             placeholderTextColor="#7C808A"
             placeholder="number"
             onChangeText = {(text) => 
                 {
                     this.setState({ nh1_4: text })
                 }
             }
           />
       </View>
       <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}}>
           <Text style={{marginLeft:30,marginTop: 20,  color:'grey',fontWeight:'600',fontSize: 15,marginBottom:5, justifyContent:'flex-start',flexDirection:'row'}}>Tarification</Text>
           <TextInput
             keyboardType={'decimal-pad'}
             style={{ 
             marginLeft:30, 
             backgroundColor: '#F1E5FA',
             padding: 10,
             borderRadius: 5, 
             height:40, 
             width: 125,                     
             }}
             placeholder="price / task"
             placeholderTextColor="#7C808A"
             onChangeText = {(text) => 
                 {
                     this.setState({ th1_4: text })
                 }
             }
           />
       </View>
     </View>
     </View>
      );
    }
  }
  refFact(){
    this.setState({th1_1:'0',nh1_1:'0',th1_2:'0',nh1_2:'0',th1_3:'0',nh1_3:'0',th1_4:'0',nh1_4:'0'}); 
    this.setState({ refresh: !this.state.refresh});
    getFactures(professeur.nom);
    setTimeout(() => {
      this.setState({ refresh: !this.state.refresh});
    },1500);
/*     this.setState({th1_1:'0',nh1_1:'0',th1_2:'0',nh1_2:'0',th1_3:'0',nh1_3:'0',th1_4:'0',nh1_4:'0'});    
    setTimeout(() => {
      this.setState({ refresh: true});
    },500);
    setTimeout(() => {
      this.setState({ refresh: false});
    },1000);
    setTimeout(() => {
      getFactures(professeur.nom);
      this.setState({check: checkFact(professeur.email)});
      //this.setState({ refresh: true});
    },3000); */
  }
  render() {
    
    let { modalVisible } = this.state;
    //[[id,date,mois,montant,etat]]
    let renderItem = ({ item }) => (
        <Item date={item[1]} mois={item[2]} montant={item[3]} etat={item[4]}/>
      );
    
    return (
      <View style={{marginTop:5}}>
      
      <View style={{opacity: this.state.opacity, maxHeight: '90%'}}>
        

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          
            <View style={{flex: 1,justifyContent: "flex-end",alignItems: "center"}}>
            <KeyboardAvoidingView
                    behavior="padding"
                    style={{width:'100%'}}
                  >
               <View style={{    
                marginTop: 20,
                backgroundColor: "white",
                borderTopLeftRadius: 30,
                borderTopRightRadius:30,
                width: '100%',
                alignItems: "center",
                elevation: 5}}>
                  <View style={{flexDirection:'row',alignSelf: 'flex-end'}}>
                    <TouchableOpacity onPress={() => {this.setModalVisible(!modalVisible)
                                                      this.setState({ opacity: 1 })
                                                      }}>
                       <Image style={{flexDirection:'row',width:30,height:30, alignSelf: 'flex-end',marginRight:20,marginTop:15}} source={require("../assets/images/close.png")}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginBottom:15,alignItems: "center",width:65,height:65,borderRadius:150,backgroundColor:'#eef3f6',justifyContent: 'center'}}>
                    <Image
                    style={{width:35,height:35}}
                    source={require("../assets/images/icon-facture.png")}
                    />
                  </View>
                  <Text style={{marginTop: 10,fontWeight: 'bold',  fontSize: 20,}}>New Invoice</Text>
                  
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}}>
                            <Text style={{marginTop: 20,  color:'grey',fontWeight:'600',fontSize: 15,marginBottom:5, justifyContent:'flex-start',flexDirection:'row'}}>Mock</Text>
                            <TextInput
                              keyboardType={'decimal-pad'}
                              style={{   
                              backgroundColor: '#F1E5FA',
                              padding: 10,
                              borderRadius: 5, 
                              height:40, 
                              width: 125,                     
                              }}
                              placeholder="number"
                              placeholderTextColor="#7C808A"
                              onChangeText = {(text) => 
                                  {
                                      this.setState({ nh1_1: text })
                                  }
                              }
                            />
                        </View>
                        <View style={{ justifyContent:'flex-start',flexDirection:'column',zIndex:100}}>
                            <Text style={{marginLeft:30,marginTop: 20,  color:'grey',fontWeight:'600',fontSize: 15,marginBottom:5, justifyContent:'flex-start',flexDirection:'row'}}>Tarification</Text>
                            <TextInput
                              keyboardType={'decimal-pad'}
                              style={{ 
                              marginLeft:30, 
                              backgroundColor: '#F1E5FA',
                              padding: 10,
                              borderRadius: 5, 
                              height:40, 
                              width: 125,                     
                              }}
                              placeholder="price / task"
                              placeholderTextColor="#7C808A"
                              onChangeText = {(text) => 
                                  {
                                      this.setState({ th1_1: text })
                                  }
                              }
                            />
                        </View>
                      </View>
                      <View>
                        {this.addLigneRemu()}
                      </View>
                      <View>
                        {this.btnAddLignRemu()}
                      </View>
                      <View>
                        {this.addLigneRemu2()}
                      </View>
                <TouchableOpacity
                  onPress={() => {
                                  if((this.state.nh1_1 !== '0' && this.state.th1_1 !== '0') || (this.state.nh1_2 !== '0' && this.state.th1_2 !== '0') || (this.state.nh1_3 !== '0' && this.state.th1_3 !== '0') || (this.state.nh1_4 !== '0' && this.state.th1_4 !== '0')){
                                    this.setState({ refresh: !this.state.refresh});
                                    addFacture(professeur.nom, professeur.id, this.state.nh1_1, this.state.th1_1, this.state.nh1_2, this.state.th1_2, this.state.nh1_3, this.state.th1_3, this.state.nh1_4, this.state.th1_4);
                                    this.setModalVisible(!modalVisible);
                                    setTimeout(() => {
                                      getFactures(professeur.nom);
                                      this.setState({ refresh: !this.state.refresh});
                                    },1500);

                                    /* if((professeur.IBAN !== undefined && professeur.SIRET !== undefined && professeur.adresse!== undefined) || (this.state.check)){
                                      this.setState({isLoading: true});
                                      
                                      addFacture(professeur.nom, professeur.id, this.state.nh1_1, this.state.th1_1, this.state.nh1_2, this.state.th1_2, this.state.nh1_3, this.state.th1_3, this.state.nh1_4, this.state.th1_4);
                                      setTimeout(() => {this.setModalVisible(!modalVisible);
                                       // getFactures(professeur.nom)
                                      },1000);
                                      this.setState({
                                                      opacity: 1});
                                      this.refFact();
                                      this.setState({isLoading: false});
                                      setTimeout(() => {this.setState({ refresh: !this.state.refresh});},3500);
                                      setTimeout(() => {this.setState({ refresh: !this.state.refresh});},3600);
                                    }else{
                                      alert("Vous devez d'abord compléter votre profil");
                                      
                                    } */
                                  }else{
                                    alert('You must complete at least one field');
                                  }}}
                  style={{ 
                    width: 280,
                    height:50, 
                    backgroundColor: '#9F54DC', 
                    marginTop: 20,
                    marginBottom:45,
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: 100,    
                    }}
                >
                  <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16,fontWeight:'bold' }}>Submit</Text>
                </TouchableOpacity>

              </View>
             </KeyboardAvoidingView>
            </View>

        </Modal>
 
          <FlatList
          refreshing={this.state.refresh}
          onRefresh={() => {

            this.refFact();

          }} 
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={professeur.factures}
          renderItem={renderItem}
          keyExtractor={item => item[0]}
          />
            
            <View style={{
              alignItems: 'center',
              justifyContent:'flex-end',
              marginBottom:10
             }}>
               
                <TouchableOpacity
                    onPress={()=>{
                        //this.setState({check: checkFact(professeur.email)});
                        this.setModalVisible(!modalVisible);
                    }}
                      
                    style={{ 
                        marginLeft:20,
                        marginRight:20,
                        marginTop:20,
                        width:'75%',
                        height:50, 
                        backgroundColor: '#9F54DC', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: 100,   
                        }}
                    >
                    <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16,fontWeight:'bold' }}>New Invoice</Text>
                </TouchableOpacity>
            </View>
      </View>

      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 90,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 7,
    borderRadius:10,
  },
  image: {
    width: 20,
    height: 20  
  },
  content_container: {
    flex: 1,
    margin: 5,
    marginTop:10

  },
  header_container: {
    flex: 2,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 15,
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
    fontSize:13,
    fontWeight:'500',
    color: '#97a2aa'
  },
  date_value: {
    color: '#2383f6'
  }
})

export default Facture