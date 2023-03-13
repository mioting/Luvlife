import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {useTailwind} from 'tailwind-rn';
import {Button, TextInput} from 'react-native-paper';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';

import {useNavigation} from '@react-navigation/native';
import {useRootSelector, useRootDispatch} from '../redux/store';

import {RootStackParamList} from '../navigator/RootNavigator';
import TabNavigator from '../navigator/TabNavigator';
import {getProfileInfoThunk, loginThunk} from '../redux/Auth/thunk';

function Login() {
  const tw = useTailwind();
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useRootDispatch();
  const isAuth = useRootSelector(state => state.auth.isAuth);

  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {password: '', email: ''},
    mode: 'onChange',
  });

  return (
    <ScrollView>
      {isAuth ? (
        <TabNavigator />
      ) : (
        <View style={styles.mainContainer}>
          <Text style={tw('mb-8 text-4xl')}>Login</Text>
          <Text style={tw('mb-20 text-xl')}>
            Enter your email address and pass word to access your account
          </Text>
          <View style={tw('mb-8')}>
            <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                {
                  type: 'email',
                  name: 'email',
                  rules: {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  },
                  textInputProps: {
                    label: 'Email',
                    left: <TextInput.Icon icon={'email'} />,
                  },
                },
                {
                  type: 'password',
                  name: 'password',
                  rules: {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  },
                  textInputProps: {
                    label: 'Password',
                    left: <TextInput.Icon icon={'lock'} />,
                  },
                },
              ]}
            />
          </View>
          <TouchableOpacity style={tw(' mb-4 ml-auto')}>
            <Text style={tw(' text-blue-600 ')}>Forget Password</Text>
          </TouchableOpacity>
          <View>
            <Button
              mode={'contained'}
              onPress={handleSubmit(({email, password}) => {
                console.log({email, password});
                console.log('dispatch', email, password);
                dispatch(loginThunk({email, password})).then(() =>
                  dispatch(getProfileInfoThunk()),
                );
              })}>
              Login
            </Button>
          </View>

          <View style={tw('mt-4  flex-row ')}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={tw('text-blue-600')}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    padding: 15,
  },

  // input: {
  //   borderWidth: 1,
  //   borderColor: '#D9D9D9',
  //   borderRadius: 5,
  //   marginTop: 10,
  //   height: 50,
  // },

  // button: {
  //   marginTop: 40,
  // },
});
export default Login;
