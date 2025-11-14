import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/drawer/CustomDrawerContent';
import { APP_COLOR } from '@/utils/constant';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: '80%', 
            backgroundColor: APP_COLOR.ORANGE,
            borderTopRightRadius: 70, 
            borderBottomRightRadius: 70, 
            overflow: 'hidden', 
          },
          drawerType: 'front', 
          overlayColor: 'rgba(0,0,0,0.5)', 
        }}
        
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Home',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}