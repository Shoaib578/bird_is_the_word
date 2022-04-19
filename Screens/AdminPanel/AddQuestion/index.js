import React from 'react'
import {View,Text,StyleSheet,Image,Dimensions,TextInput,ActivityIndicator,Alert,TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore'

export default class AddQuestion extends React.Component {
    state = {
        question:'',
        question_type:'',
        option_1:'',
        option_2:'',
        option_3:'',

        is_option_question:false,
        isLoading:false,
    }

    AddingOptionQuestion = ()=>{
        this.setState({isLoading:true})

        firestore().collection('questions')
        .add({
          
         
            question:this.state.question,
            option_1:this.state.option_1,
            option_2:this.state.option_2,
            option_3:this.state.option_3,

            question_type:this.state.question_type

        })
        .then(res=>{
            this.setState({question:'',option_1:'',option_2:'',option_3:'',is_option_question:false,question_type:''},()=>{
                this.setState({isLoading:false})
            })
            
            Alert.alert("Question Added Successfully")
        })
        .catch(err=>{
            this.setState({isLoading:false})
            Alert.alert("Something Went Wrong")
        })
    }

    AddingNormalQuestion = ()=>{
        this.setState({isLoading:true})

        firestore().collection('questions')
        .add({
          
         
            question:this.state.question,
            
            question_type:this.state.question_type

        })
        .then(res=>{
            this.setState({question:'',is_option_question:false,question_type:''},()=>{
                this.setState({isLoading:false})
            })
            
            Alert.alert("Question Added Successfully")
        })
        .catch(err=>{
            this.setState({isLoading:false})
            Alert.alert("Something Went Wrong")
        })
    }

    AddQuestion = ()=>{
        if(this.state.question_type.length<1 || this.state.question.length < 1){
            Alert.alert("All the fields are required");
            return false
        }
        if(this.state.is_option_question){
            this.AddingOptionQuestion()
        }else{
            this.AddingNormalQuestion()
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                   
                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',}}>
                    
                    <TextInput 
                    placeholder="Question" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" onChangeText={(val)=>this.setState({question:val})} value={this.state.question} style={{flex:1,color:'black'}}/>
                </View>


           
            <Picker
             style={{ backgroundColor:'#AAFF00',
             width:'100%',
             height:48,
             fontSize:17,
             borderRadius:55,
             color:'black',

         
             paddingLeft:10,marginTop:20}}
            selectedValue={this.state.question_type}
            onValueChange={(itemValue, itemIndex) =>{
                this.setState({question_type:itemValue})
                if(itemValue == "options_question"){
                    this.setState({is_option_question:true})
                }else{
                    this.setState({is_option_question:false})

                }

            }

               
            }>
                <Picker.Item  label="Question Type" value='' />
                <Picker.Item  label="Rate Question" value='rate_question' />
                <Picker.Item  label="Yes or No Question" value='yes_or_no_question' />
                <Picker.Item  label="Options Question" value='options_question' />
                <Picker.Item  label="Custom Answer Question" value='custom_answer_question' />

            
            </Picker>
                {this.state.is_option_question?
                <View>
                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',}}>
                    
                    <TextInput 
                    placeholder="Option 1" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" onChangeText={(val)=>this.setState({option_1:val})} value={this.state.option_1} style={{color:'black',marginLeft:7}}/>
                </View>


                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',}}>
                    
                    <TextInput 
                    placeholder="Option 2" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" onChangeText={(val)=>this.setState({option_2:val})} value={this.state.option_2} style={{color:'black',marginLeft:7}}/>
                </View>


                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',}}>
                    
                    <TextInput 
                    placeholder="Option 3" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" onChangeText={(val)=>this.setState({option_3:val})} value={this.state.option_3} style={{flex:1,color:'black',marginLeft:7}}/>
                </View>
                </View>
            
            
                :null}
               

            <TouchableOpacity onPress={this.AddQuestion} style={styles.FindShopButton}>
                                    {this.state.isLoading?<ActivityIndicator size="small" color="black"/>:null}
                                        <Text style={{color:'white',textAlign:'center'}}>Add</Text>
                                    </TouchableOpacity>
                </ScrollView>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        backgroundColor:'#AAFF00',
        justifyContent:'center',
        borderRadius:20,
        alignItems: 'center',
        marginTop:20,
        alignSelf: 'center',
    }
})