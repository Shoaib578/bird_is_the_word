import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from 'react-native';
import Loading from './Loading'


class Splash extends React.Component {

    state = {
        isLoggedIn:false,
      
      }

    isLoggedIn = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
      
        if(parse == null){
          this.setState({isLoggedIn:false})
        }else{
          this.setState({isLoggedIn:true})
        }

        if(this.state.isLoggedIn){
          if(parse.user_type == 'normal'){
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'MainNavigator', screen: 'Nightly Inventories' }]
          });
          }else{
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Questions' }]
          });
          }
            
        }else{
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'AuthNavigator', screen: 'Auth' }]
            });
        }

        
        }

componentDidMount(){
    setTimeout(() =>{
      this.isLoggedIn()

    },600)

   
 
   
    
}

render(){
    
        
      return <Loading />
        
    }
    
}


export default Splash