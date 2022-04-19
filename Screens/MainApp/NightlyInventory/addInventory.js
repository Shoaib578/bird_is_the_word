import React from 'react'
import {View,Text,StyleSheet,Dimensions,ActivityIndicator,Alert} from 'react-native'
import { ScrollView, TouchableOpacity,TextInput } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Entypo from 'react-native-vector-icons/Entypo'
import uuid from 'react-native-uuid';

let from_1_to_10 = [1,2,3,4,5,6,7,8,9,10]
let question_answers=[
    {
        "question_id":"asd",
        "question":"",
        "answer":"",
        "date":"",
        "name":"",
        "all_answers_id":'',
        "added_by":""
        

    }
]

export default class AddInventory extends React.Component {
    state = {
        questions:[],
       
        name:"",
        date:"",
        isLoading:false,
        user_id:'',
        is_uploaded:false,
        showCaseAnswers:[],
         my_uuid:'',
         isDisabledUploadButton:false,
    
    }



    GetAllQuestions = () =>{
        firestore().collection('questions').get()
        .then(res=>{
            // console.log(res.docs)
            this.setState({questions:res.docs})
        })
    }


    

    ChooseOption = (value,id)=>{
        question_answers.forEach(i=>{
            if(i.question_id == id){
                let index = question_answers.indexOf(i)
                question_answers[index] = value
                 const newAnswers = question_answers.filter((val,question_id,array) => array.indexOf(val) == question_id)

                this.setState({showCaseAnswers:newAnswers})
                console.log(question_answers.length)
            }else{
                question_answers.push(value)
                const newAnswers = question_answers.filter((val,question_id,array) => array.indexOf(val) == question_id)

                this.setState({showCaseAnswers:newAnswers})

                console.log(question_answers.length)
             


            }
        })
    }

    getUserID = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({user_id:parse.id})
    }

    uploadAnswers = ()=>{
        if(this.state.date.length<1 || this.state.name.length<1){
            Alert.alert("Name and Date Field is necessary")
            return false
        }
        if(this.state.isDisabledUploadButton == false){
        this.setState({isLoading:true,isDisabledUploadButton:true})
     

        const newAnswers = question_answers.filter((val,question_id,array) => array.indexOf(val) == question_id)
        newAnswers.forEach(i=>{
            if(i.question_id != "asd"){
                firestore().collection('users_answers')
                .add({
                  
                    question_id:i.question_id,
                    question:i.question,
                    answer:i.answer,
                    date:this.state.date,
                    name:this.state.name,
                    question_type:i.question_type,
                    all_answers_id:i.all_answers_id,
                    added_by:this.state.user_id
                   
        
                })
                .then(res=>{
                    if(this.state.is_uploaded == false){
                        this.setState({is_uploaded:true})
                        Alert.alert("Your Answers to the following questions has been stored")
                        question_answers.length = 0
                        question_answers.push({
                            "question_id":"asd",
                            "question":"hello",
                            "answer":"",
                            "date":"",
                            "name":"",
                            "all_answers_id":'',
                            "added_by":""
                        })
                        
                        this.setState({name:'',date:'',isLoading:false,})
                    }
                    
                    
                })
                .catch(err=>{
                    Alert.alert("Something Went Wrong")
                    this.setState({isLoading:false,is_uploaded:false,isDisabledUploadButton:false})
                })

                this.setState({is_uploaded:false,isDisabledUploadButton:false,my_uuid:''},()=>{
                    this.setState({my_uuid:uuid.v4(),showCaseAnswers:[]})
                })
                
            }

        })
       
    }

    }



    componentDidMount(){
        this.setState({my_uuid:uuid.v4()})
        this.getUserID()
        this.GetAllQuestions()
        this.props.navigation.addListener('focus',()=>{
            this.GetAllQuestions()
        })
    }


    
    
    render(){
       
          
        
       


        return(
            <View style={styles.container}>
            <ScrollView>
            <View style={{ flexDirection: 'row',
                                        borderWidth:1,borderColor:"#DBDBDB",
                                        color:"#BB952D",
            
                                        borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',
                                    
                                        }}>
            
                                <Feather name="user" color="black" size={25}  style={styles.imageStyle}/>
                                <TextInput 
                                placeholder="Name" onChangeText={(val)=>this.setState({name:val})} value={this.state.name} placeholderTextColor="black"  style={{flex:1,color:'black'}}/>
                                </View>


            <View style={{ flexDirection: 'row',
                        borderWidth:1,borderColor:"#DBDBDB",
                        color:"#BB952D",
            
                        borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',
                                    
                        }}>
            
                    <Entypo name="calendar" color="black" size={25}  style={styles.imageStyle}/>
                     <TextInput 
                    placeholder="Date" placeholderTextColor="black" onChangeText={(val)=>this.setState({date:val})} value={this.state.date}   style={{flex:1,color:'black'}}/>
            </View>



              



                {this.state.questions.map((data,index)=>{
                    return(
                        <View key={index} style={{borderRadius:5,borderWidth:1,borderColor:'#E6E6E6',backgroundColor:'#E6E6E6',alignSelf:'center',width:Dimensions.get('window').width*2/2.1,padding:10,marginTop:20}}>
                            
                            <Text style={{fontSize:15,color:'black',fontWeight:'bold',width:'80%'}}>{data._data.question}</Text>

                         
                           


                        
                        <View style={{borderColor:'black',height:.5,borderWidth:.2,width:'100%',marginTop:5}}></View>

                         {data._data.question_type == 'options_question'?<View>
                         <Text >Options : </Text>
                         
                        <View style={{borderColor:'black',height:.5,borderWidth:.2,width:'100%',marginTop:5}}></View>

                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>

                            <TouchableOpacity onPress={()=>this.ChooseOption({
                                "question_id":data.id,
                                "question":data._data.question,
                                "answer":data._data.option_1,
                                "date":this.state.date,
                                "name":this.state.name,
                                "question_type":data._data.question_type,
                                "all_answers_id":this.state.my_uuid,
                                "added_by":this.state.user_id
                            },data.id)}>
                            <Text style={{fontWeight:'bold',color:"black"}}>{data._data.option_1}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.ChooseOption({
                                "question_id":data.id,
                                "question":data._data.question,
                                "answer":data._data.option_2,
                                "date":this.state.date,
                                "name":this.state.name,
                                "question_type":data._data.question_type,
                                "all_answers_id":this.state.my_uuid,
                                "added_by":this.state.user_id
                            },data.id)}>
                            <Text style={{color:'black',fontWeight:'bold'}}>{data._data.option_2}</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.ChooseOption({
                                "question_id":data.id,
                                "question":data._data.question,
                                "answer":data._data.option_3,
                                "date":this.state.date,
                                "name":this.state.name,
                                "question_type":data._data.question_type,
                                "all_answers_id":this.state.my_uuid,
                                "added_by":this.state.user_id
                            },data.id)}>
                            <Text style={{color:'black',fontWeight:'bold'}}>{data._data.option_3}</Text>

                            </TouchableOpacity>

                        </View>
                         </View>:null}


                         {data._data.question_type == 'rate_question'?<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>

                             {from_1_to_10.map((count,index)=>{
                                 return(
                                     <TouchableOpacity onPress={()=>this.ChooseOption({
                                        "question_id":data.id,
                                        "question":data._data.question,
                                        "answer":count,
                                        "date":this.state.date,
                                        "name":this.state.name,
                                        "question_type":data._data.question_type,
                                        "all_answers_id":this.state.my_uuid,
                                        "added_by":this.state.user_id
                                    },data.id)} key={index}>
                                         <Text style={{fontWeight:'bold'}}>{count}</Text>
                                     </TouchableOpacity>
                                 )
                             })}
                         </View>:null}



                         {data._data.question_type == 'custom_answer_question'?
                         <View>
                    <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,width:'100%',marginTop:20,backgroundColor:'white',}}>
                        
                        <TextInput 
                        placeholder="Answer of question" 
                        onChangeText={(val)=>this.ChooseOption({
                            "question_id":data.id,
                            "question":data._data.question,
                            "answer":val,
                            "date":this.state.date,
                            "name":this.state.name,
                            "question_type":data._data.question_type,
                            "all_answers_id":this.state.my_uuid,
                            "added_by":this.state.user_id
                        },data.id)}
                        placeholderTextColor="black"   style={{flex:1,color:'black'}}/>
                    </View>
                         </View>
                         
                         :null}



                {data._data.question_type == 'yes_or_no_question'?
                         <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                             <TouchableOpacity onPress={()=>this.ChooseOption({
                                        "question_id":data.id,
                                        "question":data._data.question,
                                        "answer":"Yes",
                                        "date":this.state.date,
                                        "name":this.state.name,
                                        "question_type":data._data.question_type,
                                        "all_answers_id":this.state.my_uuid,
                                        "added_by":this.state.user_id
                                    },data.id)}>
                                 <Text>Yes</Text>
                             </TouchableOpacity>

                             <TouchableOpacity onPress={()=>this.ChooseOption({
                                        "question_id":data.id,
                                        "question":data._data.question,
                                        "answer":"No",
                                        "date":this.state.date,
                                        "name":this.state.name,
                                        "question_type":data._data.question_type,
                                        "all_answers_id":this.state.my_uuid,
                                        "added_by":this.state.user_id
                                    },data.id)}>
                                 <Text>No</Text>
                             </TouchableOpacity>
                         </View>
                         
                         :null}
                        
                        </View>
                    )
                  
                })}

                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,width:'100%',marginTop:20,backgroundColor:'white',padding:10}}>
                    <Text style={{fontWeight:'bold',fontSize:18}}>Check Answers : </Text>
                    <View style={{borderWidth:1,borderColor:"#AAFF00",height:1}}></View>
                    
                    {this.state.showCaseAnswers.map((data,index)=>{
                       
                        if(index != 0){
                            return(
                                <View key={index} style={{marginTop:10}}>
                                    <Text style={{color:'black',fontWeight:'bold'}}>{data.question}  </Text>
                                    <Text style={{color:'black'}}>{data.answer}</Text>
                                    <View style={{borderWidth:.8,borderColor:"#AAFF00",height:1,marginTop:4}}></View>

                                </View>
                            )
                        }
                      
               
                
                })}
                </View>
               
               <TouchableOpacity disabled={this.state.isDisabledUploadButton} onPress={this.uploadAnswers} style={styles.FindShopButton}>
                                    {this.state.isLoading?<ActivityIndicator size="small" color="black"/>:null}
                                        <Text style={{color:'white',textAlign:'center'}}>Add</Text>
                                    </TouchableOpacity>
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