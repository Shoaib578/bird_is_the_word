import React,{useRef} from 'react'
import {Text,Animated,View,Dimensions,Platform,TouchableOpacity,Image} from 'react-native'
import { createStackNavigator ,CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NightlyInventories from '../Screens/MainApp/NightlyInventory'
import AddInventory from '../Screens/MainApp/NightlyInventory/addInventory'
import Goals from '../Screens/MainApp/Goals'
import Auth from '../Screens/Auth'
import Splash from '../Screens/Splash'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AddQuestion from '../Screens/AdminPanel/AddQuestion'
import Questions from '../Screens/AdminPanel/Questions'
import EditQuestion from '../Screens/AdminPanel/EditQuestion';
import ViewInventory from '../Screens/MainApp/NightlyInventory/viewinventory';
import ViewGoal from '../Screens/MainApp/Goals/view_goal';
import GetGoals from '../Screens/MainApp/Goals/get_goals';
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
function getWidth() {
    let width = Dimensions.get("window").width
  
    // Horizontal Padding = 20...
    width = width - 80
  
    // Total five Tabs...
    return width / 5
  }

export default function  RootNavigator (){
    return(
     
    <Stack.Navigator initialRouteName="SplashNavigator" screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen name="MainNavigator" component={MainNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="SplashNavigator" component={SplashNavigator} options={{headerShown:false}}/>
        
        {/* Admin Routes */}
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="Add Question" component={AddQuestion} />
        <Stack.Screen name="Edit Question" component={EditQuestion} />

    </Stack.Navigator>
    )
    }




const NightlyInventorStack = ()=>(
    <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen name="All Nightly Inventories" options={{headerTitle:"Nightly Inventories"}} component={NightlyInventories}/>
        <Stack.Screen name="Add Nightly Inventories" component={AddInventory}/>

        <Stack.Screen name="ViewInventory" component={ViewInventory} options={{headerTitle:"Inventory"}}/>
    </Stack.Navigator>
)

const GoalsStack = ()=>{
    return(
        <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen name="Goals" component={GetGoals} options={{headerTitle:"Goals"}}/>
        
        <Stack.Screen name="Add Goals" component={Goals} options={{headerTitle:"Add Goals"}}/>
        <Stack.Screen name="viewgoal" component={ViewGoal} options={{headerTitle:"Goal"}}/>
    </Stack.Navigator>
    )
  
}





const AuthNavigator = ()=>(
    <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen name="Auth" options={{headerShown:false}} component={Auth}/>

    </Stack.Navigator>
)

const MainNavigator = ()=>{
    const tabOffsetValue = useRef(new Animated.Value(0)).current;

    return(
    <Tab.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Tab.Screen name="Nightly Inventories" component={NightlyInventorStack} options={{
                 headerShown:false,
               
                 tabBarInactiveTintColor:'black',
                 tabBarIcon: ({ focused }) => (
                 <View style={{
                 // centring Tab Button...
                 position: 'absolute',
                
                 }}>
                 <MaterialIcons

                     name="inventory"
                     size={22}
                     color={focused ? '#AAFF00' : 'orange'}
                 ></MaterialIcons>
                 </View>
             )
             }} listeners={({ navigation, route }) => ({
             // Onpress Update....
             tabPress: e => {
                 Animated.spring(tabOffsetValue, {
                 toValue: getWidth(),
                 useNativeDriver: true
                 }).start();
             }
             })}/>





        <Tab.Screen name="Goals" component={GoalsStack}  options={{
                 headerShown:false,
                
                 tabBarInactiveTintColor:'black',
                 tabBarIcon: ({ focused }) => (
                 <View style={{
                 // centring Tab Button...
                 position: 'absolute',
                
                 }}>
                 <Entypo

                     name="briefcase"
                     size={22}
                     color={focused ? '#AAFF00' : 'orange'}
                 ></Entypo>
                 </View>
             )
             }} listeners={({ navigation, route }) => ({
             // Onpress Update....
             tabPress: e => {
                 Animated.spring(tabOffsetValue, {
                 toValue: getWidth(),
                 useNativeDriver: true
                 }).start();
             }
             })}/>
       

    </Tab.Navigator>
)
}

const SplashNavigator = ()=>(
    <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen name="Splash" options={{headerShown:false}} component={Splash}/>

    </Stack.Navigator>
)

