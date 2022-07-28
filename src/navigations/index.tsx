import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { routes } from 'src/constants/routes';

import LoginScreen from 'src/screens/auth/LoginScreen';
import RegisterScreen from 'src/screens/auth/RegisterScreen';
import SearchScreen from 'src/screens/search';
import HomeScreen from 'src/screens/home';
import ProfileScreen from 'src/screens/profile';

import useCheckAuth from 'src/hooks/auth.hook';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { isLoggedIn } = useCheckAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name={routes.login} component={LoginScreen} />
            <Stack.Screen name={routes.register} component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name={routes.home} component={HomeScreen} />
            <Stack.Screen name={routes.search} component={SearchScreen} />
            <Stack.Screen name={routes.profile} component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
