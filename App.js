import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './components/Dashboard';
import ProfesseursContext from './components/ProfesseursContext';
import FilterData from './components/FilterData';
import GraphScreen from './components/GraphScreen';
import FileForm from './components/FileFom';
import PlatformDescription from './components/PlatformDescription';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function App() {
  const [dataP, setDataP] = useState([]);

  const load = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const data = await response.json();
      setDataP(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    load(); 
  }, []);

  return (
    <ProfesseursContext.Provider value={dataP}>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStackScreen} />
          {/*<Drawer.Screen name="Register" component={FileForm} />*/}
          {/* <Drawer.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Drawer.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
          <Drawer.Screen name="About" component={PlatformDescription} /> 
        </Drawer.Navigator>
      </NavigationContainer>
    </ProfesseursContext.Provider>
  );
}
 function HomeStackScreen(){
     return (
      
        <Tab.Navigator initialRouteName="Filter">
          <Tab.Screen name="Filter" component={FilterData} />
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Combine" component={GraphScreen} /> 
        </Tab.Navigator>
  );
 }

export default App;