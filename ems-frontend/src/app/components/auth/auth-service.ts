import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignupRequest } from './signup/signup.model';
import { API } from '../../config/api.constant';
import { Observable } from 'rxjs';
import { AuthResp, UserLoginRequest } from './login/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  
  signupUser(request: UserSignupRequest): Observable<any> {
    return this.http.post(API.SIGNUP, request);
  }

  loginUser(request: UserLoginRequest):Observable<AuthResp> {
   return this.http.post<AuthResp>(API.LOGIN,request);
  }


}
