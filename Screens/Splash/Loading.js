import React from 'react';
import {View,Text,StyleSheet,ImageBackground,Image,Dimensions} from 'react-native';

class Loading extends React.Component {
    render(){
        return (
           
            

          <View style={styles.container}>
             <Image source={require('../../Assets/images/logo.jpg')} style={{ width:170,height:170,borderRadius:10,borderColor:'yellow',borderWidth:2 }}/>
          </View>
            
        )
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:"#AAFF00",
        justifyContent:'center',
        alignItems: 'center',
        flex:1,

    },
    LoadingText:{
        color:"yellow",
        fontWeight:"bold",
        fontSize:17
    }
})
export default Loading