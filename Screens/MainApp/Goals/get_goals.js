import React from 'react'
import {View,Text,StyleSheet,Dimensions,ActivityIndicator,TextInput,Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class GetGoals extends React.Component {
    state = {
        
        data:[],
        isLoading:false,
       
    }

  

   


    getAllGoals = async()=>{
        const user =await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        firestore().collection("goals").where('added_by',"==",parse.id).get()
        .then(res=>{
           
            
              
              let goals = []
              res._docs.forEach(data=>{
                  goals.push(data)
              })
              console.log(goals)
              
              this.setState({data: goals})
         
            
        })
    }

    DeleteGoal = (id)=>{
        firestore().collection("goals").doc(id).delete()
        .then(res=>{
            this.getAllGoals()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    componentDidMount(){
        
        this.getAllGoals()
        this.props.navigation.addListener("focus",()=>{
            this.getAllGoals()
            
        })
    }
    render(){
        return(
            <View style={styles.container}>
            <ScrollView>
            
            


            <TouchableOpacity style={{marginLeft:'80%',marginTop:20}} onPress={()=>this.props.navigation.navigate("Add Goals")}>
            <AntDesign name="plus" color="#639beb" size={23}/>

            </TouchableOpacity>


            {this.state.data.map((data,index)=>(
                 <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('viewgoal',{id:data.id})}  style={{borderRadius:5,borderWidth:1,borderColor:'#E6E6E6',backgroundColor:'#E6E6E6',alignSelf:'center',width:Dimensions.get('window').width*2/2.1,padding:10,marginTop:20}}>
                 <View style={{flexDirection:'row'}}>
                 <Text style={{fontSize:17,color:'black',fontWeight:'bold',width:'95%'}}>{data._data.date}</Text>
     
                 <TouchableOpacity onPress={()=>this.DeleteGoal(data.id)} style={{marginRight:30}}>
     
                         <FontAwesome name="trash" color="red" size={18}/>
                 </TouchableOpacity>
                 </View>                    
     
                
                 </TouchableOpacity>
            ))}
                    
           


            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
       
        flex:1,

    },
    imageStyle: {
        padding: 0,
        marginLeft:20,
        margin: 10,
     
        
        alignItems: 'center',
      },
      FindShopButton:{
        width:Dimensions.get('window').width*2/5,
        flexDirection:'row',
        padding:10,
        backgroundColor:'skyblue',
        justifyContent:'center',
        borderRadius:20,
        alignItems: 'center',
        marginTop:20,
        alignSelf: 'center',
        marginBottom:20
    }
})