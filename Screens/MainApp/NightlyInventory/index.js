import React from 'react'
import {View,Text,StyleSheet,Dimensions,ActivityIndicator} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

let answers = []


export default class NightlyInventories extends React.Component {
   state = {
       data:[],
       isLoading: true
       
   }
    logout = async()=>{
        await AsyncStorage.removeItem("user")
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'AuthNavigator', screen: 'Auth' }]
        });
    }

    getAllAnswers = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)

        firestore().collection("users_answers").where("added_by","==",parse.id).get()
        .then(res=>{
            
            res._docs.forEach(d=>{
                answers.push(d._data)
                
                
            })
          
            let uniqueObjArray = [...new Map(answers.map((item) => [item["all_answers_id"], item])).values()];

           

          this.setState({data:uniqueObjArray,isLoading:false})
            

        })


       


    }
    DeleteAnswer = (id)=>{
        this.setState({isLoading:true})
        firestore().collection("users_answers").where("all_answers_id","==",id).get()
        .then(res=>{
            res.docs.forEach(data=>{
               firestore().collection("users_answers").doc(data.id).delete()
               .then(res=>{
                 answers = []
                   
                   this.getAllAnswers()
               })
            })
        })
       
    }
    componentDidMount(){
        this.getAllAnswers()
        this.props.navigation.addListener("focus",()=>{
            this.getAllAnswers()
            
        })
    }


    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                   
                    <View style={{flexDirection:'row',marginLeft:'40%',marginTop:20}}>
                    <TouchableOpacity style={{backgroundColor:"#AAFF00",borderColor:"#AAFF00",borderWith:1,borderRadius:5,padding:5,justifyContent:'center',alignItems: 'center'}} onPress={() =>{
                        this.props.navigation.navigate("Add Question")
                    }} >

                    <Text style={{color:"black"}}>Add  Questions</Text>
                    </TouchableOpacity>


                    <View style={{flexDirection:'row',marginLeft:30}}>
                    <TouchableOpacity onPress={() =>this.props.navigation.navigate('Add Nightly Inventories')} >

                    <AntDesign name="plus" color="#639beb" size={23}/>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>this.logout()} style={{marginLeft:20}}>

                    <AntDesign name="logout" color="red" size={23}/>
                    </TouchableOpacity>
                    </View>
                    
                    </View>



                   
    {this.state.isLoading == false?<View>
        {this.state.data.map((data,index)=>{
       

        return(
            <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('ViewInventory',{id:data.all_answers_id})}  style={{borderRadius:5,borderWidth:1,borderColor:'#E6E6E6',backgroundColor:'#E6E6E6',alignSelf:'center',width:Dimensions.get('window').width*2/2.1,padding:10,marginTop:20}}>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:17,color:'black',fontWeight:'bold',width:'95%'}}>{data.name}</Text>

            <TouchableOpacity onPress={()=>this.DeleteAnswer(data.all_answers_id)} style={{marginRight:30}}>

                    <FontAwesome name="trash" color="red" size={18}/>
            </TouchableOpacity>
            </View>                    

            <View style={{borderWidth:.5,borderColor:'black',height:1,width:'100%',marginTop:10}}></View>
            <Text>Date : {data.date}</Text>
            </TouchableOpacity>
        )
    

    
    
})}

    </View>:  <ActivityIndicator size="large" color="black" style={{alignSelf:'center',marginTop:30}}/>}             

                </ScrollView>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})