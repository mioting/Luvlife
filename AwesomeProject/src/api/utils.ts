import {REACT_APP_API} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BaseResp<T = unknown> {
  message: string;
  result: T;
}

export const apiWrapper = async <T = unknown>(
  path: string,
  init?: RequestInit | undefined,
  isRequiredAuth: boolean = false,
) => {
  if (isRequiredAuth) {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('invalid token');
    }
    const authHeader = {Authorization: `Bearer ${token}`};
    if (init) {
      init.headers = init.headers
        ? {...init.headers, ...authHeader}
        : authHeader;
    } else {
      init = {headers: authHeader};
    }
  }
  const resp = await fetch(`${REACT_APP_API}${path}`, init);
  const data = await resp.json();
  if (resp.status < 200 || resp.status > 299) {
    // Custom Error -> Error Message
    throw new Error(data.message);
  }

  return data as T;
};
