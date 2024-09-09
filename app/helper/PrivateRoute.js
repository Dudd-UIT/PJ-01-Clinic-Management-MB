// import React from 'react';
// import { useSelector } from 'react-redux';
// // import { selectIsLoggedIn } from './app/redux/authSlice';
// import { createStackNavigator } from '@react-navigation/stack';
// // import HomeTabsScreen from './HomeTabsScreen';
// import LoginScreen from '../screens/auth/LoginScreen';

// const Stack = createStackNavigator();
// function HomeTabsScreen() {
//     return (
//       <Home.Navigator
//         initialRouteName="Home"
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             let iconName = '';
  
//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Notification') {
//               iconName = focused ? 'notifications' : 'notifications-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             } else if (route.name === 'Information') {
//               iconName = focused ? 'documents' : 'documents-outline';
//             }
//             return <Icon name={iconName} type="ionicon" color={color} />;
//           },
//           headerShown: false,
//         })}>
//         <Home.Screen name="Home" component={HomeScreen} />
//         <Home.Screen name="Notification" component={NotificationScreen} />
//         <Home.Screen name="Profile" component={ProfileScreen} />
//         <Home.Screen name="Information" component={InformationScreen} />
//       </Home.Navigator>
//     );
//   }
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {isLoggedIn ? (
//         <Stack.Screen name="HomeTabs" component={HomeTabsScreen} />
//       ) : (
//         <Stack.Screen name="Login" component={LoginScreen} />
//       )}
//     </Stack.Navigator>
//   );
// };

// export default PrivateRoute;
