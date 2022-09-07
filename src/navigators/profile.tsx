import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BorderlessButton } from 'react-native-gesture-handler';
import { SignOut } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';
import { ProfilePage } from '@/pages/profile';
import { useSession } from '@/contexts/session';
import { KeeperProvider } from '@/providers/keeper';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();
const keeperProvider = KeeperProvider();

export function ProfileNavigator() {
  const theme = useTheme();
  const setUser = useSession((context) => context.setUser);

  function signOut() {
    Alert.alert('Atenção', 'Deseja sair?', [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => {
          keeperProvider.remove(KeeperProvider.KEY_TOKEN);
          keeperProvider.remove(KeeperProvider.KEY_STORE);
          setUser(null);
        },
      },
    ]);
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ProfilePage.URL}
        component={ProfilePage}
        options={{
          title: 'Perfil',
          headerTintColor: theme.colors['text.500'],
          headerRight: () => (
            <BorderlessButton onPress={signOut}>
              <SignOut
                size={26}
                weight="light"
              />
            </BorderlessButton>
          ),
          contentStyle: { backgroundColor: theme.colors['shape.100'] },
        }}
      />
    </Stack.Navigator>
  );
}

ProfileNavigator.URL = 'stacks/profile';
