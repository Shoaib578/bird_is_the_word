import React from 'react'
import {View,Text,StyleSheet,Dimensions,ActivityIndicator,TextInput,Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class ViewGoal extends React.Component {
    state = {
        
        date:'',
        //phone_calls_fields
        phone_call_field1:"",
        phone_call_field2:"",
        phone_call_field3:"",


        //self_care_fields
        self_care_field1:"",
        self_care_field2:"",
        self_care_field3:"",


        //job_fields
        job_field1:"",
        job_field2:"",
        job_field3:"",





        //house_items_fields
        house_items_field1:"",
        house_items_field2:"",
        house_items_field3:"",

        //recovery_tasks_fields
        recovery_tasks_field1:"",
        recovery_tasks_field2:"",
        recovery_tasks_field3:"",

        isLoading:false,
       
    }

  

    SaveGoal = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({isLoading:true})

        firestore().collection("goals").doc(this.props.route.params.id).update({
            phone_call_field1:this.state.phone_call_field1,
            phone_call_field2:this.state.phone_call_field2,
            phone_call_field3:this.state.phone_call_field3,
    
    
           
            self_care_field1:this.state.self_care_field1,
            self_care_field2:this.state.self_care_field2,
            self_care_field3:this.state.self_care_field2,
    
    
           
            job_field1:this.state.job_field1,
            job_field2:this.state.job_field2,
            job_field3:this.state.job_field3,
    
    
    
    
    
          
            house_items_field1:this.state.house_items_field1,
            house_items_field2:this.state.house_items_field2,
            house_items_field3:this.state.house_items_field3,
    
            
            recovery_tasks_field1:this.state.recovery_tasks_field1,
            recovery_tasks_field2:this.state.recovery_tasks_field2,
            recovery_tasks_field3:this.state.recovery_tasks_field3,
            date:this.state.date

        })
        .then(res=>{
            Alert.alert("Saved")
             this.setState({isLoading:false})
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({isLoading:false})
        })
       
    }


    getAllGoals = async()=>{
        const user =await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        firestore().collection("goals").doc(this.props.route.params.id).get()
        .then(res=>{
      
               
                this.setState({
                    //phone_calls_fields
                       phone_call_field1:res.data().phone_call_field1,
                       phone_call_field2:res.data().phone_call_field2,
                       phone_call_field3:res.data().phone_call_field3,
   
   
                       //self_care_fields
                       self_care_field1:res.data().self_care_field1,
                       self_care_field2:res.data().self_care_field2,
                       self_care_field3:res.data().self_care_field3,
   
   
                       //job_fields
                       job_field1:res.data().job_field1,
                       job_field2:res.data().job_field2,
                       job_field3:res.data().job_field3,
   
   
   
   
   
                       //house_items_fields
                       house_items_field1:res.data().house_items_field1,
                       house_items_field2:res.data().house_items_field2,
                       house_items_field3:res.data().house_items_field3,
   
                       //recovery_tasks_fields
                       recovery_tasks_field1:res.data().recovery_tasks_field1,
                       recovery_tasks_field2:res.data().recovery_tasks_field2,
                       recovery_tasks_field3:res.data().recovery_tasks_field3,
                       date:res.data().date,
               })
         
            
        })
    }

    componentDidMount(){
        
        this.getAllGoals()
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
            
                    <Entypo name="calendar" color="black" size={25}  style={styles.imageStyle}/>
                     <TextInput 
                    placeholder="Date" placeholderTextColor="black" onChangeText={(val)=>this.setState({date:val})} value={this.state.date}   style={{flex:1,color:'black'}}/>
            </View>

        
            <View style={{flexDirection:'row',padding:20}}>
                <FontAwesome name="phone" color="black" size={25} style={{marginTop:40}}/>


                <View>
                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                    
                    <TextInput 
                    placeholder="Phone Calls" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" value={this.state.phone_call_field1} onChangeText={(val)=>this.setState({phone_call_field1:val})} style={{flex:1,color:'black'}}/>
                </View>


                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                    
                    <TextInput 
                    placeholder="Phone Calls" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" value={this.state.phone_call_field2}  onChangeText={(val)=>this.setState({phone_call_field2:val})} style={{flex:1,color:'black'}}/>
                </View>




                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                    
                    <TextInput 
                    placeholder="Phone Calls" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" value={this.state.phone_call_field3} onChangeText={(val)=>this.setState({phone_call_field3:val})}  style={{flex:1,color:'black'}}/>
                </View>



                </View>
              

            </View>

            <View style={{borderColor:'yellow',height:1,borderWidth:1}}></View>   




            <View style={{flexDirection:'row',padding:20}}>
                <MaterialIcons name="self-improvement" color="black" size={29} style={{marginTop:40}}/>


                <View>
                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                    
                    <TextInput 
                    placeholder="Self care" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" value={this.state.self_care_field1} onChangeText={(val)=>this.setState({self_care_field1:val})}  style={{flex:1,color:'black'}}/>
                </View>


                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                    
                    <TextInput 
                    placeholder="Self care" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" value={this.state.self_care_field2} onChangeText={(val)=>this.setState({self_care_field2:val})}  style={{flex:1,color:'black'}}/>
                </View>




                <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                    
                    <TextInput 
                    placeholder="Self care" multiline = {true}
                    numberOfLines = {4} placeholderTextColor="black" value={this.state.self_care_field3} onChangeText={(val)=>this.setState({self_care_field3:val})}  style={{flex:1,color:'black'}}/>
                </View>



                </View>
              

            </View>

            <View style={{borderColor:'yellow',height:1,borderWidth:1}}></View>         


           




                <View style={{flexDirection:'row',padding:20}}>
                    <Entypo name="briefcase" color="black" size={29} style={{marginTop:40}}/>


                    <View>
                    <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                        
                        <TextInput 
                        placeholder="Job" multiline = {true}
                        numberOfLines = {4} placeholderTextColor="black" value={this.state.job_field1} onChangeText={(val)=>this.setState({job_field1:val})}  style={{flex:1,color:'black'}}/>
                    </View>


                    <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                        
                        <TextInput 
                        placeholder="Job" multiline = {true}
                        numberOfLines = {4} placeholderTextColor="black" value={this.state.job_field2} onChangeText={(val)=>this.setState({job_field2:val})}  style={{flex:1,color:'black'}}/>
                    </View>




                    <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                        
                        <TextInput 
                        placeholder="Job" multiline = {true}
                        numberOfLines = {4} placeholderTextColor="black" value={this.state.job_field3} onChangeText={(val)=>this.setState({job_field3:val})}  style={{flex:1,color:'black'}}/>
                    </View>



                    </View>
                

                </View>

                <View style={{borderColor:'yellow',height:1,borderWidth:1}}></View>   




                <View style={{flexDirection:'row',padding:20}}>
                    <AntDesign name="home" color="black" size={29} style={{marginTop:40}}/>


                    <View>
                    <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                        
                        <TextInput 
                        placeholder="House items" multiline = {true}
                        numberOfLines = {4} placeholderTextColor="black" onChangeText={(val)=>this.setState({house_items_field1:val})} value={this.state.house_items_field1}  style={{flex:1,color:'black'}}/>
                    </View>


                    <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                        
                        <TextInput 
                        placeholder="House items" multiline = {true}
                        numberOfLines = {4} placeholderTextColor="black" value={this.state.house_items_field2} onChangeText={(val)=>this.setState({house_items_field2:val})}  style={{flex:1,color:'black'}}/>
                    </View>




                    <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                        
                        <TextInput 
                        placeholder="House items" multiline = {true}
                        numberOfLines = {4} placeholderTextColor="black" value={this.state.house_items_field3} onChangeText={(val)=>this.setState({house_items_field3:val})}  style={{flex:1,color:'black'}}/>
                    </View>



                    </View>
                

                </View>

                <View style={{borderColor:'yellow',height:1,borderWidth:1}}></View>         


           




                    <View style={{flexDirection:'row',padding:20}}>
                        <FontAwesome name="tasks" color="black" size={29} style={{marginTop:40}}/>


                        <View>
                        <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                            
                            <TextInput 
                            placeholder="Recovery tasks" multiline = {true}
                            numberOfLines = {4} placeholderTextColor="black" onChangeText={(val)=>this.setState({recovery_tasks_field1:val})} value={this.state.recovery_tasks_field1}  style={{flex:1,color:'black'}}/>
                        </View>


                        <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                            
                            <TextInput 
                            placeholder="Recovery tasks" multiline = {true}
                            numberOfLines = {4} placeholderTextColor="black" onChangeText={(val)=>this.setState({recovery_tasks_field2:val})} value={this.state.recovery_tasks_field2}  style={{flex:1,color:'black'}}/>
                        </View>




                        <View style={{ borderWidth:1,borderColor:"#AAFF00", borderRadius:5,height:65,padding:10,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',left:10}}>
                            
                            <TextInput 
                            placeholder="Recovery tasks" multiline = {true}
                            numberOfLines = {4} placeholderTextColor="black" value={this.state.recovery_tasks_field3} onChangeText={(val)=>this.setState({recovery_tasks_field3:val})}  style={{flex:1,color:'black'}}/>
                        </View>



                        </View>


                    </View>

                    <View style={{borderColor:'yellow',height:1,borderWidth:1}}></View>   



















                    
            <TouchableOpacity onPress={this.SaveGoal} style={styles.FindShopButton}>
                                    {this.state.isLoading?<ActivityIndicator size="small" color="black"/>:null}
                                        <Text style={{color:'white',textAlign:'center'}}>Update</Text>
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