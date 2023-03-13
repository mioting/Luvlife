import {apiWrapper, BaseResp} from './utils';

export const loginAPI = async (body: {email: string; password: string}) => {
  const data = await apiWrapper<{token: string}>('/users/login', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(body),
  });
  return data;
};

type ProfileRespType = BaseResp<{
  id: number;
  username: string;
  email: string;
  avatar: string;
  gender: string;
  date_of_birth: string;
  mobile: string;
  address: string;
}>;

export const getProfileAPI = async () => {
  const data = await apiWrapper<ProfileRespType>(
    '/users/profile',
    undefined,
    true,
  );
  const userInfo = data.result;

  return {
    email: userInfo.email,
    id: userInfo.id,
    username: userInfo.username,
    avatar: userInfo.avatar,
    gender: userInfo.gender,
    dateOfbirth: userInfo.date_of_birth,
    mobile: userInfo.mobile,
    address: userInfo.address,
  };
};
