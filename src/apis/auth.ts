import axios from 'axios';
import { 
  RequestSigninDto, 
  RequestSignupDto, 
  ResponseSigninDto, 
  ResponseSignupDto,
  ResponseMyInfoDto,


} from '../types/auth.ts';
import { axiosInstance } from './axios.ts';
import { LOCAL_STORAGE_KEY } from '../constants/key.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';

export const postSignup = async (body: RequestSignupDto):Promise<ResponseSignupDto> => {
  const{data} = await axiosInstance.post(
    '/v1/auth/signup', body, );
  return data;
}


export const postSignin = async (body: RequestSigninDto):Promise<ResponseSigninDto>=>{
  const{data} = await axiosInstance.post(
    '/v1/auth/signin', 
    body, );
  return data;
}

export const getMyInfo = async () : Promise<ResponseMyInfoDto>=> {
  const {data}=await axiosInstance.get('/v1/users/me');

  return data;
}