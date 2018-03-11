import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Profile } from '../models/profile';
import { ProfileInstance } from '../models/profile-instance';

@Injectable()
export class ProfileDataService {
  private PROD_URL = 'https://echo.joshp.tech/api';
  private tok = localStorage.getItem('token');
  // private headers: HttpHeaders = new HttpHeaders({'token': localStorage.getItem('token')});
  // private tok = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.LjJtDeJw7_e5jmgPSHqLNKKeeHBR9bvU_LNGe-A17hE';
  private headers: HttpHeaders = new HttpHeaders({'token': this.tok});
  private headers2: HttpHeaders = new HttpHeaders({'token': this.tok,
     'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient) {}
  getProfiles(): Promise<any> {
    const url = `${this.PROD_URL}/profile`;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }
  getSpecificProfile(prof: string): Promise<any> {
    const url = `${this.PROD_URL}/profile/${prof}`;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }
  setSpecificProfile(prof: Profile, index: number): Promise<any> {
    const url = `${this.PROD_URL}/profile/${prof.getProfileName()}`;
    return this.http.put(url, prof.getInstance(index).getProfileForm(), {headers: this.headers2}).toPromise();
  }
  createProfile(name: string): Promise<any> {
    const url = `${this.PROD_URL}/profile`;
    return this.http.post(url, `profile=${name}`, {headers: this.headers2}).toPromise();
  }
  createProfileInstance(profname: string, inst: ProfileInstance): Promise<any> {
    const url = `${this.PROD_URL}/profile/${profname}`;
    return this.http.post(url, inst.getProfileForm(), {headers: this.headers2}).toPromise();
  }
  removeProfileInst( prof: Profile, index: number): Promise<any> {
    const url = `${this.PROD_URL}/profile/${prof.getProfileName()}`;
    return this.http.request('delete', url, {body: `index=${index}`, headers: this.headers2} ).toPromise();
  }
  removeProfile(prof: Profile): Promise<any> {
    const url = `${this.PROD_URL}/profile`;
    return this.http.request('delete', url, {body: `profile=${prof.getProfileName()}`, headers: this.headers2} ).toPromise();
  }
  changeProfName(prof: Profile): Promise<any> {
    const url = `${this.PROD_URL}/profile`;
    return this.http.put( url, `old_profile=${prof.getProfileName()}&profile=${prof.getNewName()}`).toPromise();
  }
}
