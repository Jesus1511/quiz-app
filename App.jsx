import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from './components/dashboard/DashboardScreen';
import CreateScreen from './components/create/CreateScreen';
import StatsScreen from './components/stats/StatsScreen'
import Header from './components/Header'
import SecondHeader from './components/SecondHeader';
import Questions from './components/create/Questions';

import { FirebaseContext } from './Firebase/FirebaseContext';

import Colors from './utils/Colors';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <View style={{ flex: 1, backgroundColor:Colors.background}}>
      <FirebaseContext>
          <StatusBar backgroundColor={Colors.green} />
          <NavigationContainer independent={true}>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={DashboardScreen}
                options={{
                    header: () => <Header title="App-Name" />,  // Usamos el componente personalizado
                  }}
              />
             <Stack.Screen
                name="Create"
                component={CreateScreen}
                options={{
                    header: () => <Header title="Crear Examen" />,  // Usamos el componente personalizado
                  }}
              />
             <Stack.Screen
                name="Stats"
                component={StatsScreen}
                options={{
                    header: () => <Header title="Estadisticas" />,  // Usamos el componente personalizado
                  }}
              />
              <Stack.Screen
                name="Questions"
                component={Questions}
                options={{
                    header: () => <SecondHeader title="Añadir Preguntas Manualmente" />,  // Usamos el componente personalizado
                  }}
              />
            </Stack.Navigator>
          </NavigationContainer>
      </FirebaseContext>
    </View>
  );
};

export default App;
