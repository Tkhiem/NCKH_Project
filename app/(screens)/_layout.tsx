// app.tsx
import React from 'react';
import { Stack } from 'expo-router';


const App = () => {
  return (
    <Stack
    screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
        <Stack.Screen name='index'/>
        <Stack.Screen name='Main'/>
        <Stack.Screen name='Camera'/>
    </Stack>
  );
};

export default App;
