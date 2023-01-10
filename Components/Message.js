import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity,Linking, ScrollView,FlatList, RefreshControl } from 'react-native';
import {addMessage, professeur,getCoursHisto,triCoursHisto,mois} from '../API/airtable';

let gains = [0,0,0,0,0,0,0,0,0,0,0,0];
let totH = [0,0,0,0,0,0,0,0,0,0,0,0];
var today = new Date();
var mm = String(today.getMonth() + 1).padStart(2, '0');  //January is 0!


class Message extends React.Component {
  
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.messageText = ""; // Initialisation de notre donnée searchedText en dehors du state
  }
  forceUpdateHandler(){
    this.forceUpdate();
  };
  state = {
    msg:'',
    placeHolder:'Message',
    refresh: false
  }
  _messageTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }
  refreshHisto(){
    this.setState({ refresh: !this.state.refresh});
    getCoursHisto(professeur.email);
    setTimeout(() => {triCoursHisto(professeur.heures)},1000);
    setTimeout(()=>{
      this.calculGains(mois);
      this.setState({ refresh: !this.state.refresh});
    }, 2000 );
    
    /* getCoursHisto(professeur.email);
    triCoursHisto(professeur.heures); */

  }

  componentDidMount(){
    this.refreshHisto()
    
  }

  clickInscrire (){
    return(
        Linking.openURL("mailto: support@grade-up.fr")
    );
  }
  calculGains(mois){
    gains = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(let i=0; i<12; i++){ //janvier,fevrier...
      for(let k=0; k < mois[i].length; k++){ //1,2,3,4,5,6...
        if(typeof mois[i][k][3] !== undefined){
        gains[i] = gains[i] + parseFloat(mois[i][k][3].replace('£',''));
        }
      }
    }
  }
  calculHeures(mois){
    totH = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(let i=0; i<12; i++){ //janvier,fevrier...
      for(let k=0; k < mois[i].length; k++){ //1,2,3,4,5,6...
        if(mois[i][k][2].includes("h30")){
          totH[i] = totH[i] +  parseFloat(mois[i][k][2].replace(/h30/g, ".50")); 
                  
        }else if(mois[i][k][2].includes("h00")){
          totH[i] = totH[i] +  parseFloat(mois[i][k][2].replace(/h00/g, ".00"));
        }
      }
    }
  }
  
  afficheHeureHisto(temps){
    if(temps == '1h00'){
            return(
              <View style={{}}>
                <View>
                    <Text style={{fontWeight:'600',fontSize:13,color: '#97a2aa'}}>{temps}</Text>
                </View>
              </View>
            );
    }else if(temps == '1h30'){
            return(
              <View style={{}}>
                <View>
                    <Text style={{fontWeight:'600',fontSize:13,color: '#97a2aa'}}>{temps}</Text>
                </View>
              </View>
            );
    }else{
      return(
        <View style={{}}>
          <View>
              <Text style={{fontWeight:'600',fontSize:13,color: '#97a2aa'}}>{temps}</Text>
          </View>
        </View>
      );
}
  }  
  render() {
    let onRefresh = () => {
      this.setState({ refresh: !this.state.refresh});
      this.calculGains(mois);
      this.calculHeures(mois);
      setTimeout(() => {this.setState({ refresh: !this.state.refresh});},2000);
    };
    let renderItem = ({ item }) => (
      <Item nom={item[0]} date={item[1]} temps={item[2]} tarif={item[3]} id={item[4]}/>
    );
    let Item = ({ nom ,date,temps,tarif} ) => (
      <View style={{}}>
      <View style={styles.main_container}>
        <View style={{backgroundColor:'#eef3f6',marginTop:20,width: 50, height: 50, borderRadius:50,margin: 10,justifyContent: 'center',
                alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={require("../assets/images/histoCours.png")}
          />
        </View>
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{nom}</Text>          
          </View>
          <View style={styles.codeEtage_container}>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>{date}</Text>
            </View>
          </View>
        </View>
        {this.afficheHeureHisto(temps)}
        <View style={{backgroundColor:'#dffde7',marginTop:25,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'center',
                alignItems: 'center'}}>
          <View>
              <Text style={{fontWeight:'bold', color:'#41ab6b'}}>{typeof tarif === 'string' ? tarif + '£' : 'n.a'}</Text>
          </View>
        </View>   
      </View>
      </View>
    );

    let renderItemNovembre = ({ item }) => (
      <ItemNovembre nom={item[0]} date={item[1]} temps={item[2]} tarif={item[3]} id={item[4]} essai={item[5]}/>
    );
    let ItemNovembre = ({ nom ,date,temps,tarif, essai} ) => (
      <View style={{backgroundColor:'#fff',paddingHorizontal:15,borderRadius:50,marginTop:-20,}}>
        <View style={{height: 90,flexDirection: 'row',backgroundColor: 'white'}}>
          <View style={{backgroundColor:'#fff',marginTop:20,width: 55, height: 55, borderRadius:50,margin: 0,justifyContent: 'center',
                  alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require("../assets/images/histoCours.png")}
            />
          </View>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{nom}</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{this.afficheHeureHisto(temps)}</Text>
                {essai ? 
                (
                  <View
                  style={{ 
                      marginLeft:10,
                      height:20, 
                      backgroundColor: '#d8fee5', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      borderRadius: 3,   
                      }}
                  >
                  <Text style={{ textAlign: 'center', color: '#00ce90', fontSize: 13,fontWeight:'600',paddingHorizontal:5 }}>Cours d'essai</Text>
                </View>
                )
                : <View></View>}
              </View>
            </View>
          </View>
          <View style={{marginTop:25,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end', marginRight:15}}>
            <View>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+{typeof tarif === 'string' ? tarif + '' : 'n.a'}</Text>
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{date}</Text>
              </View>
            </View>
          </View> 
        </View>
      </View>
    );
    return (
    
    <View style={{marginTop:5,borderRadius:10}}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      directionalLockEnabled={false}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refresh}
          onRefresh={()=>{this.refreshHisto()}}
        />
      }
      >

      {/* ---  JANVIER --- */}
      {mm == '01'
      ?<View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[0]}</Text>
                              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
            flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>January</Text>
                </View>
              </View>
            </View>
            {mm == '01'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000); 
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[0].filter(item => item[0] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            /> 
            :<View></View>
              }
      </View>
      : <View></View>
      }
      {/* ---  FEVRIER --- */}
      {mm == '02'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[1]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
                flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>February</Text>
                </View>
              </View>
            </View>
            {mm == '02'
            ? <FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[1].filter(item => item[1] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            />
            :<View></View> 
              }
      </View>
      : <View></View>
      }
      {/* ---  MARS --- */}
      {mm == '03'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[2]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
             flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>March</Text>
                </View>
              </View>
            </View>
            {mm == '03'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[2].filter(item => item[1] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            /> 
            :<View></View>
              }
      </View>
      : <View></View>
      }
      {/* ---  AVRIL --- */}
      {mm == '04'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[3]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
             flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>April</Text>
                </View>
              </View>
            </View>
            {mm == '04'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[3].filter(item => item[1] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            /> 
            :<View></View>
            }
      </View>
      : <View></View>
      }
      {/* ---  MAI --- */}
      {mm == '05'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[4]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
              flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>May</Text>
                </View>
              </View>
            </View>
            {mm == '05'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[4].filter(item => item[1] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            /> 
            :<View></View>
            }
      </View>
      : <View></View>
      }
      {/* ---  JUIN --- */}
      {mm == '06'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[5]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>June</Text>
                </View>
              </View>
            </View>
            {mm == '06'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[5].filter(item => item[1] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            /> 
            :<View></View>
            }
      </View>
      : <View></View>
      }
      {/* ---  JUILLET --- */}
      {mm == '07'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[6]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>July</Text>
                </View>
              </View>
            </View>
            {mm == '07'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[6].filter(item => item[1] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            />
            :<View></View>
            } 
      </View>
      : <View></View>
      }
      {/* ---  AOUT --- */}
      {mm == '08'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[7]}</Text>              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>August</Text>
                </View>
              </View>
            </View>
            {mm == '08'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[7].filter(item => item[1] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            />
            :<View></View>
            } 
      </View>
      : <View></View>
      }
      {/* ---  SEPTEMBRE --- */}
      {mm == '09'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[8]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
                flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>September</Text>
                </View>
              </View>
            </View>
            {mm == '09'
            ? <FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[8].filter(item => item[0] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            /> 
            : <View></View>
              }
      </View>
      : <View></View>
      }
      {/* ---  OCTOBRE --- */}
      {mm == '10'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[9]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
                  flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>October</Text>
                </View>
              </View>
            </View>
            {mm == '10'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[9].filter(item => item[0] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            /> 
            : <View></View>
            }
      </View>
      : <View></View>
      }
      {/* ---  NOVEMBRE --- */}
      {mm == '11'
      ? <View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
             {/*  <Text>{gains[10]}</Text> */}
              <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[10]}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
                flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>November</Text>
                </View>
              </View>
          </View>
          {mm == '11'
          ? <FlatList
              extraData={this.state.refresh}
              refreshing={this.state.refresh}
              //onRefresh={() => this.refEl()}
              onRefresh={() => {
                this.setState({ refresh: !this.state.refresh});
                getCoursHisto(professeur.email);
                triCoursHisto(professeur.heures);
                this.calculGains(mois);
                this.calculHeures(mois);
                setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                }
              }
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={mois[10].filter(item => item[0] !== '').sort(function(a, b) {
                return b[4]-a[4];
              })}
              renderItem={renderItemNovembre}
              keyExtractor={item => item[4]}
          />
          :<View></View> 
          }
      </View>  
      : <View></View>
      }
      {/* ---  DECEMBRE --- */}
      {mm == '12'
      ?<View style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,borderRadius:10,shadowColor: "#233443",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1.5,
      elevation: 5,}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection:'column',flex:2,marginTop:25,marginLeft:20}}>
              {/*  <Text>{gains[10]}</Text> */}
                <Text style={{fontWeight:'bold',fontSize:20}}>£{gains[11]}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:25,width: 80, height: 37, borderRadius:8,margin: 10,justifyContent: 'flex-end',
                  flex:2,marginRight:20}}>
                <View>
                  <Text style={{fontWeight:'500', color:'#923CD7',fontSize:18,marginRight:10}}>December</Text>
                </View>
              </View>
            </View>
            {mm == '12'
            ?<FlatList
                extraData={this.state.refresh}
                refreshing={this.state.refresh}
                //onRefresh={() => this.refEl()}
                onRefresh={() => {
                  this.setState({ refresh: !this.state.refresh});
                  getCoursHisto(professeur.email);
                  triCoursHisto(professeur.heures);
                  this.calculGains(mois);
                  this.calculHeures(mois);
                  setTimeout(() => {this.setState({ refresh: !this.state.refresh});},1000);
                  }
                }
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={mois[11].filter(item => item[0] !== '').sort(function(a, b) {
                  return b[4]-a[4];
                })}
                renderItem={renderItemNovembre}
                keyExtractor={item => item[4]}
            /> 
            :<View></View>
            }
        </View>
      : <View></View>
      }

       {/* RECAPITULATIF */}

      <Text style={{fontSize:21,fontWeight:'600',margin:15}}>History</Text>

      <View style={{backgroundColor:'#fff',margin:10,borderRadius:10,paddingBottom:10}}>
        <View >
       
       {gains[0] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>January</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[0]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[0]}</Text>
            </View>
          </View>
        </View>
       :<View></View>}
        {gains[1] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>February</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[1]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[1]}</Text>
            </View>
          </View>
        </View>
       :<View></View>}
        {gains[2] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>March</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[2]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[2]}</Text>
                
            </View>
          </View>
        </View>
       :<View></View>}
       {gains[3] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>April</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[3]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[3]}</Text>
                
            </View>
          </View>
        </View>
       :<View></View>}
       {gains[4] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>May</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[4]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[4]}</Text>

            </View>
          </View>
        </View>
       :<View></View>}
       {gains[5] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>Jun</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[5]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[5]}</Text>

            </View>
          </View>
        </View>
       :<View></View>}
       {gains[6] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>July</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[6]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[6]}</Text>
            </View>
          </View>
        </View>
       :<View></View>}
       {gains[7] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>August</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[7]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[7]}</Text>
                
            </View>
          </View>
        </View>
       :<View></View>}
       {gains[8] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:15,color:'#923CD7'}}>September</Text>          
            </View>
            <View style={styles.codeEtage_container}>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>{totH[8]}h</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,margin: 10,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[8]}</Text>
            </View>
          </View>
        </View>
       :<View></View>}
       {gains[9] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:10,color:'#923CD7'}}>October</Text>          
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,marginHorizontal: 10,justifyContent: 'center',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[9]}</Text>
            </View>
          </View>
        </View>
       :<View></View>}
       {gains[10] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:10,color:'#923CD7'}}>November</Text>          
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,marginHorizontal: 10,justifyContent: 'center',alignItems: 'flex-end'}}>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[10]}</Text>
            </View>
          </View>
        </View>
       :<View></View>}
       {gains[11] !== 0 
       ?<View style={{flexDirection: 'row',backgroundColor: 'white',paddingHorizontal:15,borderRadius:10}}>
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={{fontWeight: '500',fontSize: 16,flex: 1,flexWrap: 'wrap',paddingRight: 5,paddingTop:10,color:'#923CD7'}}>December</Text>          
            </View>
          </View>
          <View style={{marginTop:15,width: 70, height: 40, borderRadius:8,marginHorizontal: 10,justifyContent: 'center',alignItems: 'flex-end'}}>            <View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'400', color:'black',fontSize:18}}>+£{gains[11]}</Text>
            </View>
          </View>
        </View>
       :<View></View>}
          
        </View>
            {/* {gains[12] == 0
            ?
            :<View></View>
            } */}
        </View>
    
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
    width: 75,
    height: 75 
  },
  content_container: {
    flex: 1,
    margin: 5,
    marginTop: 10,
    marginLeft: 10

  },
  header_container: {
    flex: 2,
    flexDirection: 'row',marginTop:5
  },
  title_text: {
    fontWeight: '500',
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
    fontWeight: '500',
    fontSize:13,
    color: '#97a2aa',
    marginTop: 5
  },
  date_value: {
    color: '#2383f6'
  }
})

export default Message