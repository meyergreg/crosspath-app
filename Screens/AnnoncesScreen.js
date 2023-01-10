import * as React from 'react'
import { View, Text, Image, ActivityIndicator,FlatList,Alert  } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {annonces, refreshAnnonces, cleanAnnonces,addCandidat,addCandidat2, professeur,delCandidat,refreshcand} from '../API/airtable';
import { BlurView } from 'expo-blur';

//||

function checkAnnonce(){
    if(typeof professeur.annonces == 'undefined'){
        professeur.annonces = [''];
    }
}

export default class Annonces extends React.Component{
    state = {
        refresh: false,
        refreshAn : false,
        jeCandid : false,
        isLoading: false
    }
    
    componentDidMount() {
        //professeur.annonces.split(',');
        this.setState({ refreshAn: !this.state.refreshAn});
        refreshcand(professeur);
        refreshAnnonces();
        checkAnnonce();
        setTimeout(() => {this.setState({ refreshAn: !this.state.refreshAn});},1500);

        /* this.setState({ refreshAn: !this.state.refreshAn});
        this.actualiseAnnonces();
        setTimeout(() => {this.setState({ refreshAn: !this.state.refreshAn});},1500); */
      }

   

    actualiseList = () => {
        
        setTimeout(() => {this.setState({
            isLoading:false});},2000);
      }

    actualiseAnnonces(){
        
        setTimeout(() => {this.componentDidMount();},1500);
        this.setState({isLoading: false})
  
    }
    loadingPostul() {
        if(this.state.isLoading){
            return( 
                <BlurView 
                        intensity={98} 
                        style= {{flex:1, justifyContent:'center', alignItems:'center', width:100,height:100,color:'#fff',borderRadius:25}}
                        >
                    <ActivityIndicator size="large"/>
                </BlurView>
            );
        }
    }
    newAnnonce(task){
        if(task=="CV / CL"){
                return(
                    <View style={{backgroundColor:'#CFDEFF',borderRadius:5,margin:10,height:30,minWidth:75}}>
                        <Text style={{color:'black',fontWeight:'600',margin:7,textAlign:'center'}}>CV / CL</Text>
                    </View>
                );
        }if(task=="Cohort course"){
                return(
                    <View style={{backgroundColor:'#FEE2D5',borderRadius:5,margin:10,height:30,minWidth:75}}>
                        <Text style={{color:'black',fontWeight:'600',margin:7,textAlign:'center'}}>Cohort</Text>
                    </View>         
            );
        }if(task=="Follow up"){
            return(
                <View style={{backgroundColor:'#C1F5E9',borderRadius:5,margin:10,height:30,minWidth:75}}>
                    <Text style={{color:'black',fontWeight:'600',margin:7,textAlign:'center'}}>Follow up</Text>
                </View>         
        );
        }if(task=="Mock interview"){
            return(
                <View style={{backgroundColor:'#D0F7C3',borderRadius:5,margin:10,height:30,minWidth:75}}>
                    <Text style={{color:'black',fontWeight:'600',margin:7,textAlign:'center'}}>Mock</Text>
                </View>         
        );
        }
    }  

    btnCandidate(id){
        /* if(professeur.annonces.includes(id) === true ){ */
        if(professeur.annonces.includes(id) === true ){
            return(
                <View>
                    <TouchableOpacity
                        
                        style={{
                            marginTop:5,
                            marginBottom:15,
                            width:'85%',
                            height:37, 
                            backgroundColor: '#F1E5FA', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            borderRadius: 8,   
                            }}
                    >
                        <Text style={{textAlign: 'center', color: '#A55EDE', fontSize: 16,fontWeight:'bold'}}>Sent</Text>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return(
                <View>
                    {this.state.isLoading?
                    <TouchableOpacity
                    onPress={() => {
                        this.setState({isLoading: true});
                        addCandidat(professeur,id);
                        setTimeout(() => {this.actualiseAnnonces()},2000);
                     }}
                    style={{
                        marginTop:5,
                        marginBottom:15,
                        width:'85%',
                        height:37,
                        backgroundColor: '#F1E5FA', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: 8,   
                        }}
                >
                    
                    <ActivityIndicator size="small" color={'#A55EDE'}/>
                </TouchableOpacity>
                :
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({isLoading: true});
                            addCandidat(professeur,id);
                            setTimeout(() => {this.actualiseAnnonces()},2000);
                         }}
                        style={{
                            marginTop:5,
                            marginBottom:15,
                            width:'85%',
                            height:37,
                            backgroundColor: '#A55EDE', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            borderRadius: 8,   
                            }}
                    >
                        
                        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16,fontWeight:'bold' }}>Apply</Text>
                    </TouchableOpacity>
                }
                </View>
            );
        }
    }
    ifJour(jour){
        if(typeof jour !== 'undefined'){
            return(
                <View style={{marginBottom:5}}>
                    <Text style={{color:'#838483',fontWeight:'600'}}>{jour}</Text>
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
    
    render(){
        this.props.navigation.setOptions({
            headerBackTitle: '',
            gestureEnabled: false,
            headerShown: false,
            animationEnabled: false

        })

        let renderItem = ({ item }) => (
            //annonces = [id,send,titre,classe,ville,jour1,jour2,jour3,jour4,jour5,jour6,jour7]
            <Item id={item[0]} titre={item[2]} classe={item[3]} ville={item[4]} jour1={item[5]} 
            jour2={item[6]} jour3={item[7]} jour4={item[8]} jour5={item[9]} jour6={item[10]} jour7={item[11]} jour8={item[12]} jour9={item[13]} jour10={item[14]} recId={item[15]}/>
          );
        let Item = ({id,titre,classe,ville,jour1,jour2,jour3,jour4,jour5,jour6,jour7,recId,jour9,jour8,jour10} ) => (
            <View style={{flexDirection: 'row', backgroundColor:'#fff',borderRadius:10,margin:15}}>
                {this.newAnnonce(jour1)}
                <View style={{flexDirection:'column',flex:1}}>
                    <View style={{flexDirection:'row',marginTop:15}}>
                        <Text style={{fontWeight:'bold',fontSize:16}} >{titre}</Text>
                        <View style={{flexDirection:'column',alignItems:'flex-end',flex:1, marginRight:10 }}>
                            <Text style={{fontWeight:'bold',fontSize:16,color:'#A55EDE'}}>{id}</Text>
                        </View>        
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{backgroundColor:'#EEEEF1',borderRadius:3,marginTop:10,height:30}}>
                            <Text style={{color:'#5B5C8C',fontWeight:'bold',margin:7}}>{ville}</Text>
                        </View>
                        <View style={{backgroundColor:'#edefff',borderRadius:3,marginTop:10,height:30,marginLeft:15}}>
                            <Text style={{color:'#545eff',fontWeight:'bold',margin:7}}>{classe}</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                            {this.ifJour(jour2)}                    
                            {this.ifJour(jour3)}                    
                            {this.ifJour(jour4)}             
                            {this.ifJour(jour5)}
                            {this.ifJour(jour6)}
                            {this.ifJour(jour7)}
                            {this.ifJour(jour8)}
                            {this.ifJour(jour9)}
                            {this.ifJour(jour10)}

                    </View>
                    {this.btnCandidate(id)}
                </View>
        
            </View>
          );
    return(
        <View style={{flex: 6,backgroundColor: '#f2f4f3',marginTop:20 }}>
            <View style={{paddingLeft: 20, marginVertical: 20, marginTop:45, flexDirection:'row' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold',width:'85%'}}>Job Board</Text>  
                {/* <TouchableOpacity onPress={() => {
                            setTimeout(() => {
                                this.setState({ refreshAn: !this.state.refreshAn});
                                this.actualiseAnnonces();
                                setTimeout(() => {this.setState({ refreshAn: !this.state.refreshAn});},2500);
                              },2000);}} style={{zIndex:10,elevation:10}}>
                      <Image style={{width:25,height:25,marginRight:2,marginTop:10,marginRight:7}} source={require("../assets/images/refresh.png")}/>
                </TouchableOpacity>  */}                
            </View>
            {/* <View style={{position:'absolute',zIndex:100, justifyContent:'center',alignSelf:'center',marginTop:250}}>
                {this.loadingPostul()}
            </View> */}
            

            
            <View  style={{flex:6}}>
                <FlatList
                    extraData={this.state.refreshAn}
                    refreshing={this.state.refreshAn}
                    onRefresh={() => {
                        /* this.setState({ refreshAn: !this.state.refreshAn});
                        this.actualiseAnnonces();
                        setTimeout(() => {this.setState({ refreshAn: !this.state.refreshAn});},1500); */
                        this.setState({ refreshAn: !this.state.refreshAn});
                        refreshcand(professeur);
                        refreshAnnonces();
                        checkAnnonce();
                        setTimeout(() => {this.setState({ refreshAn: !this.state.refreshAn});},1500);
                      }
                    }
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={annonces.reverse()}
                    renderItem={renderItem}
                    keyExtractor={item => item[0]}
                />
            </View >
           
        </View>
        )
    }
}