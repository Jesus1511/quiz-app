import { View, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from './components/dashboard/DashboardScreen';
import StatsScreen from './components/stats/StatsScreen'
import CreateScreen from './components/create/CreateScreen';
import Header from './components/Header'
import SecondHeader from './components/SecondHeader';
import Questions from './components/create/Questions';
import StartTestScreen from './components/dashboard/StartTestScreen';
import AnswerQuestions from './components/dashboard/Questions'
import QuestEnd from './components/dashboard/QuestEnd';
import Categorias from './components/create/Categorias';
import CustomHeader from './components/create/CustomHeader';
import EditScreen from './components/edit/EditScreen'

import LocalStorage from './localStorage/LocalStorage';
import useColors from './utils/Colors';
import CustomQuestHeader from './components/dashboard/CustomQuestHeader';

const Stack = createNativeStackNavigator();

const App = () => {

  const isDark = useColorScheme() == "dark"
  const Colors = useColors(isDark)

  return (
    <View style={{ flex: 1, backgroundColor:Colors.background}}>
      <LocalStorage>
        <StatusBar backgroundColor={Colors.green} />
          <NavigationContainer independent={true}>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={DashboardScreen}
                options={{
                    header: () => <Header title="App-Name" />,  // Usamos el componente personalizado
                    headerTransparent: true,
                  }}
              />
             <Stack.Screen
                name="Create"
                component={CreateScreen}
                options={{
                    header: () => <Header title="Crear Examen" />,  // Usamos el componente personalizado
                    headerTransparent: true,
                  }}
              />
             <Stack.Screen
                name="Stats"
                component={StatsScreen}
                options={{
                    header: () => <Header title="Estadisticas" />,  // Usamos el componente personalizado
                    headerTransparent: true,
                  }}
              />
              <Stack.Screen
                name="Questions"
                component={Questions}
                options={{
                    header: () => <CustomHeader  />,  // Usamos el componente personalizado
                  }}
              />
              <Stack.Screen
                name="StartTest"
                component={StartTestScreen}
                options={({route}) => ({
                    header: () => <CustomQuestHeader route={route} />,  // Usamos el componente personalizado
                  })}
              />
              <Stack.Screen
                name="AnswerQuestions"
                component={AnswerQuestions}
                options={({route}) => ({
                    header: () => <SecondHeader route={route} button={2} title="Añadir Preguntas Manualmente" />,  // Usamos el componente personalizado
                  })}
              />
              <Stack.Screen
                name="QuestEnd"
                component={QuestEnd}
                options={({route}) => ({
                    header: () => <SecondHeader route={route} button={null} title="Añadir Preguntas Manualmente" />,  // Usamos el componente personalizado
                  })}
              />
              <Stack.Screen
                name="Categorias"
                component={Categorias}
                options={{
                  header: () => <SecondHeader button={1} route={null} title="Añadir Preguntas Manualmente" />,  // Usamos el componente personalizado
                }}
              />
              <Stack.Screen
                name="Edit"
                component={EditScreen}
                options={{
                    header: () => <Header title="Editar Examen" />,  // Usamos el componente personalizado
                    headerTransparent: true,
                  }}
              />
            </Stack.Navigator>
          </NavigationContainer>
      </LocalStorage>
    </View>
  );
};

export default App;
