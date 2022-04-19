import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Questions extends React.Component {


    state = {
        questions:[],
    
    }



    GetAllQuestions = () =>{
        firestore().collection('questions').get()
        .then(res=>{
            console.log(res.docs)
            this.setState({questions:res.docs})
        })
    }

    DeleteQuestion = (id)=>{
        firestore().collection('questions').doc(id).delete()
        .then(res=>{
            this.GetAllQuestions()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    logout = async()=>{
        await AsyncStorage.removeItem("user")
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'AuthNavigator', screen: 'Auth' }]
        });
    }

    componentDidMount(){
        this.GetAllQuestions()
        this.props.navigation.addListener('focus',()=>{
            this.GetAllQuestions()
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <Text style={{textAlign: 'center',marginTop:10,fontSize:15,fontWeight: 'bold'}}>Admin Panel</Text>
                    <View style={{flexDirection:'row',marginLeft:'80%',marginTop:20}}>

                    <TouchableOpacity onPress={() =>this.props.navigation.navigate('Add Question')} >

                    <AntDesign name="plus" color="#639beb" size={23}/>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=>this.logout()} style={{marginLeft:20}}>

                    <AntDesign name="logout" color="red" size={23}/>
                    </TouchableOpacity>
                    </View>



                    {this.state.questions.map((data,index)=>{
                        return(
                            <View key={index} style={{borderRadius:5,borderWidth:1,borderColor:'#E6E6E6',backgroundColor:'#E6E6E6',alignSelf:'center',width:Dimensions.get('window').width*2/2.1,padding:10,marginTop:20}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{fontSize:15,color:'black',fontWeight:'bold',width:'80%'}}>{data._data.question}</Text>

                                <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={()=>this.DeleteQuestion(data.id)} style={{marginRight:30}}>

                                    <FontAwesome name="trash" color="red" size={18}/>
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Edit Question',{id:data.id})}>

                                    <AntDesign name="edit" color="#639beb" size={18}/>
                                    </TouchableOpacity>



                                </View>
                                </View>


                            <Text style={{marginTop:10}}>Question Type : {data._data.question_type}</Text>
                            <View style={{borderColor:'black',height:.5,borderWidth:.2,width:'100%',marginTop:5}}></View>

                             {data._data.question_type == 'options_question'?<View>
                             <Text >Options : </Text>
                            <View style={{borderColor:'black',height:.5,borderWidth:.2,width:'100%',marginTop:5}}></View>
    
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                                <Text style={{color:'black',fontWeight:'bold'}}>{data._data.option_1}</Text>
                                <Text style={{color:'black',fontWeight:'bold'}}>{data._data.option_2}</Text>
                                <Text style={{color:'black',fontWeight:'bold'}}>{data._data.option_3}</Text>
    
                            </View>
                             </View>:null}
                            
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

      }  
})