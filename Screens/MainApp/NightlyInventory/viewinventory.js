import React from 'react'
import {View,Text,StyleSheet,Dimensions,ActivityIndicator,Alert} from 'react-native'
import { ScrollView, TouchableOpacity,TextInput } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Entypo from 'react-native-vector-icons/Entypo'
import uuid from 'react-native-uuid';



export default class ViewInventory extends React.Component {
    state = {
        answers:[],
        user_id:''
       
       
       
    
    }



   

    getAnswers = ()=>{
        firestore().collection("users_answers").where("all_answers_id","==",this.props.route.params.id).get()
        .then(res=>{
            console.log(res.docs)
            this.setState({answers: res.docs})
        })
    }
    

   
    getUserID = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({user_id:parse.id})
    }

    



    componentDidMount(){
      
        this.getUserID()
        this.getAnswers()
     
    }


    
    
    render(){
       
          
        
       


        return(
            <View style={styles.container}>
            <ScrollView>
            


           



              



                {this.state.answers.map((data,index)=>{
                    return(
                        <View key={index} style={{borderRadius:5,borderWidth:1,borderColor:'#E6E6E6',backgroundColor:'#E6E6E6',alignSelf:'center',width:Dimensions.get('window').width*2/2.1,padding:10,marginTop:20}}>
                            
                            <Text style={{fontSize:15,color:'black',fontWeight:'bold',width:'80%'}}>{data._data.question}</Text>

                         
                           


                        
                        <View style={{borderColor:'black',height:.5,borderWidth:.2,width:'100%',marginTop:5}}></View>
                        
                            <View style={{flexDirection:'row'}}>
                            <Text>Answer : </Text>
                            <Text style={{fontSize:15,color:'black',fontWeight:'bold',}}>{ data._data.answer }</Text>

                            </View>


                       


                       



            
                        
                        </View>
                    )
                  
                })}
               
             
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