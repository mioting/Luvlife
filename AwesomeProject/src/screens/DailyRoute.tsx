import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import FolderTemplate from '../components/FolderTemplate/FolderTemplate';
import RealDaily from './RealDaily';
import Purpose from '../components/Purpose/Purpose';
import Milestone from '../components/Milestone/Milestone';
import PurposeAttachment from '../components/Attachment/PurposeAttachment';
import VoiceTest from '../components/Attachment/VoiceTest';

const Stack = createStackNavigator();
function DailyRoute() {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="RealDaily" component={RealDaily} />
        <Stack.Screen name="FolderTemplate" component={FolderTemplate} />
        <Stack.Screen name="Purpose" component={Purpose} />
        <Stack.Screen name="Milestone" component={Milestone} />
        <Stack.Screen name="PurposeAttachment" component={PurposeAttachment} />
        <Stack.Screen name="VoiceTest" component={VoiceTest} />
      </Stack.Navigator>
    </>
  );
}

export default DailyRoute;
