import React from 'react'
import {View,Text,StyleSheet,Image,Dimensions,TextInput,ActivityIndicator,Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'


import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import validator  from 'validator'

export default class Auth extends React.Component {
    state = {
        
        register_email:"",
        register_password:'',
        email:'',
        password:'',
        isLoading:false,
        isLoadingRegister:false
        
    }


    Signup = ()=>{
        if(validator.isEmail(this.state.register_email) == false){
            Alert.alert('Invalid Email')
            return false
        }

        if(this.state.register_password.length<5){
            Alert.alert('Password Must Be 5 characters')
            return false
        }

        this.setState({isLoadingRegister:true})
        firestore().collection('users').where("email",'==',this.state.register_email).get()
        .then(res=>{
            if(res.size <1){
             
               
                    firestore().collection('users')
                    .add({
                      
                     
                        email:this.state.register_email,
                        password:this.state.register_password,
                        user_type:'normal'
     
                    })
                    .then(res=>{
                        this.setState({register_email:'',register_password:'',},()=>{
                            this.setState({isLoadingRegister:false})
                        })
                        
                        Alert.alert("Registered Successfully")
                    })
                   
               
              
            }else{
                this.setState({isLoadingRegister:false})

                Alert.alert("Email Already Exist Please Try Another One")
                return false
            }
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }


    SignIn = ()=>{
        this.setState({isLoading:true})
        firestore()
        .collection('users')
        .where('email', '==', this.state.email).get()
        .then(async(res)=>{
            if(res.size>0){
    
            
               
                if(res._docs[0]._data.password == this.state.password){
                    
                    this.setState({isLoading:false,email:'',password:''})
                    const user = {
                       
                        "email":res._docs[0]._data.email,
                        "user_type":res._docs[0]._data.user_type,
                        
                        "password":res._docs[0]._data.password,
                        "id":res._docs[0].id,
                       
    
    
    
                    }
                    
                    await AsyncStorage.setItem('user',JSON.stringify(user))
                    if(res._docs[0]._data.user_type == 'normal'){
                        this.props.navigation.reset({
                            index: 0,
                            routes:[{name:'MainNavigator', screen: 'Nightly Inventories'}],
                        });
                       
                    }else{
                        console.log("Admin Panel")
                        this.props.navigation.reset({
                            index: 0,
                            routes:[{ name: 'Questions'}],
                        });
                       

                    }
                    
                }else{
                this.setState({isLoading:false,})
    
                    Alert.alert("Invalid Email or Password")
                    
                }
           
        }else{
            this.setState({isLoading:false})
    
            Alert.alert("Invalid Email or Password")
           
        }
    
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({isLoading:false})

        })
    }
    render(){
        return(
            <View style={styles.container}>

            <Text style={{color:'black',fontWeight:'bold',marginRight:'55%',fontSize:20,marginTop:20}}>SIGN IN</Text>
            
                             <View style={{ flexDirection: 'row',
                                        borderWidth:1,borderColor:"#DBDBDB",
                                        color:"#BB952D",
            
                                        borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',
                                    
                                        }}>
            
                                <Feather name="mail" color="black" size={25}  style={styles.imageStyle}/>
                                <TextInput 
                                placeholder="Email" placeholderTextColor="black" onChangeText={(val)=>this.setState({email:val})} value={this.state.email} style={{flex:1,color:'black'}}/>
                                </View>
            
            
                                <View style={{ flexDirection: 'row',
                                        borderWidth:1,borderColor:"#DBDBDB",
                                        color:"#BB952D",
            
                                        borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',
                                    
                                        }}>
            
                                <Feather name="lock" color="black" size={25}  style={styles.imageStyle}/>
                                <TextInput 
                                placeholder="Password" secureTextEntry placeholderTextColor="black" onChangeText={(val)=>this.setState({password:val})} value={this.state.password} style={{flex:1,color:'black'}}/>
                                </View>
            
                                <TouchableOpacity onPress={this.SignIn} style={styles.FindShopButton}>
                                {this.state.isLoading?<ActivityIndicator size="small" color="black"/>:null}

                                        <Text style={{color:'white',textAlign:'center'}}>Signin</Text>
                                    </TouchableOpacity>
                            
                            <View style={styles.innerContainer}>
            
                            <ScrollView>
                            <Text style={{color:'black',fontWeight:'bold',marginLeft:40,fontSize:20,top:20}}>Register</Text>
                            <View style={{ flexDirection: 'row',
                                        borderWidth:1,borderColor:"#DBDBDB",
                                        color:"#BB952D",
            
                                        borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:40,alignSelf: 'center',backgroundColor:'white',
                                    
                                        }}>
            
                                <Feather name="mail" color="black" size={25}  style={styles.imageStyle}/>
                                <TextInput 
                                placeholder="Email" onChangeText={(val)=>this.setState({register_email:val})} value={this.state.register_email} placeholderTextColor="black" style={{flex:1,color:'black'}}/>
                                </View>
            
                                <View style={{ flexDirection: 'row',
                                        borderWidth:1,borderColor:"#DBDBDB",
                                        color:"#BB952D",
            
                                        borderRadius:55,height:45,width:Dimensions.get('window').width*2/2.5,marginTop:20,alignSelf: 'center',backgroundColor:'white',
                                    
                                        }}>
            
                                <Feather name="lock" color="black" size={25}  style={styles.imageStyle}/>
                                <TextInput 
                                placeholder="Password" onChangeText={(val)=>this.setState({register_password:val})} value={this.state.register_password} secureTextEntry placeholderTextColor="black" style={{flex:1,color:'black'}}/>
                                </View>
            
                                <TouchableOpacity onPress={this.Signup} style={styles.FindShopButton}>
                                    {this.state.isLoadingRegister?<ActivityIndicator size="small" color="black"/>:null}
                                        <Text style={{color:'white',textAlign:'center'}}>Register</Text>
                                    </TouchableOpacity>
            
            
                                  
            
                                 <View style={{marginTop:300}}></View>       
            
            
                                </ScrollView>
            
                                    </View>
            
                        </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#AAFF00'
    },
    innerContainer:{
        width:'100%',
      
        marginTop:'10%',
        borderColor:'yellow',
        borderWidth:1,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:'100%',
        backgroundColor:'yellow'
    },
    phoneImageStyle:{
        padding: 0,
        marginLeft:7,  
    
      
        alignItems: 'center',
        margin:12,
        marginLeft:20
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
    }
    
  
})