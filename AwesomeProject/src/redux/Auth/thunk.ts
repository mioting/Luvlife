import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthState} from './State';
import {REACT_APP_API_SERVER} from '../store';
import {getProfileAPI, loginAPI} from '../../api/auth';
const hostname = '192.168.160.95';
const port = 8080;

console.log('check', process.env);
export const signUpThunk = createAsyncThunk<
  void,
  {
    username: string;
    email: string;
    password: string;
  },
  {rejectValue: string}
>('auth/signUp', async ({username, email, password}, thunkAPI) => {
  try {
    console.log('check dispatch thunk sign up', username, email, password);
    const res = await fetch(`${REACT_APP_API_SERVER}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const signUpResult = await res.json();
    console.log('check response', signUpResult);
    return signUpResult;
  } catch (error) {
    return thunkAPI.rejectWithValue('User cannot post');
  }
});

export const loginThunk = createAsyncThunk<
  Omit<AuthState, 'isAuth'>,
  {email: string; password: string},
  {rejectValue: string}
>('auth/login', async ({email, password}, thunkAPI) => {
  try {
    const result = await loginAPI({email, password});
    await AsyncStorage.setItem('token', result.token);
    const profile = await getProfileAPI();
    return profile;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('user cannot fetch');
  }
});

export const editProfileThunk = createAsyncThunk<
  {
    username: string;
    email: string;
    dateOfbirth: string;
    mobile: string;
    gender: string;
    address: string;
    avatar: string;
  },
  {
    id: number;
    username: string;
    password: string;
    email: string;
    dateOfbirth: string | undefined;
    mobile: string;
    gender: string;
    address: string;
    avatar: string;
  },
  {rejectValue: string}
>(
  'auth/editPofile',
  async (
    {
      id,
      password,
      username,
      email,
      dateOfbirth,
      mobile,
      gender,
      address,
      avatar,
    },
    thunkAPI,
  ) => {
    try {
      const formData = new FormData();
      formData.append('password', password);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('date_of_birth', dateOfbirth);
      formData.append('mobile', mobile);
      formData.append('gender', gender);
      formData.append('address:', address);
      formData.append('avatar', avatar);

      const res = await fetch(
        `http://${hostname}:${port}/users/updateProfile`,
        {
          method: 'PUT',
          body: formData,
        },
      );

      console.log('edit profile form data', formData);
      const updatedUserInfoData = await res.json();
      console.log('update user info thunk', updatedUserInfoData);

      const getUserInfoRes = await fetch(
        `${REACT_APP_API_SERVER}/users/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const result = await getUserInfoRes.json();
      console.log('user info result', result);
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('edit profile fail');
    }
  },
);

export const logoutThunk = createAsyncThunk<
  {is_login: boolean},
  void,
  {rejectValue: string}
>('auth/logout', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${REACT_APP_API_SERVER}/users/logout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    console.log(result);
    const data = {is_login: false};
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('logout fail');
  }
});

export const getProfileInfoThunk = createAsyncThunk<
  {userId: number},
  void,
  {rejectValue: string}
>('auth/getProfileInfo', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${REACT_APP_API_SERVER}/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('get profile info fail');
  }
});
