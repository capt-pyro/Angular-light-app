import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Device } from '../models/device';
import { Room } from '../models/room';

@Injectable()
export class RoomDataService {
  private PROD_URL = 'https://echo.joshp.tech/api';
  private tok = localStorage.getItem('token');
 // private headers: HttpHeaders = new HttpHeaders({'token': localStorage.getItem('token')});
 // private tok = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.LjJtDeJw7_e5jmgPSHqLNKKeeHBR9bvU_LNGe-A17hE';
 private headers: HttpHeaders = new HttpHeaders({'token': this.tok});
 private headers2: HttpHeaders = new HttpHeaders({'token': this.tok,
     'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient) {}
  getRooms(): Promise<any> {
    const url = `${this.PROD_URL}/room`;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }
  getRoomDevice(roomName: string, devName: string): Promise<any> {
    const url = `${this.PROD_URL}/room/${roomName}/${devName}`;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }
  updateLight(dev: Device, room: Room): Promise<any> {
    const url = `${this.PROD_URL}/room/${room.getRoomName()}/${dev.getDeviceName()}`;
    return this.http.put(url, dev.getDeviceForm(), {headers: this.headers2}).toPromise();
  }
  createLight(lightName: string, room: Room): Promise<any> {
    const url = `${this.PROD_URL}/room/${room.getRoomName()}`;
    return this.http.post(url, `light=${lightName}`, {headers: this.headers2}).toPromise();
  }
  changeDeviceName(newL: string, old: string, room: Room): Promise<any> {
    const url = `${this.PROD_URL}/room/${room.getRoomName()}`;
    return this.http.put(url, `old_light=${old}&light=${newL}`, {headers: this.headers2}).toPromise();
  }
  createNewRoom(name: string): Promise<any> {
    const url = `${this.PROD_URL}/room`;
    return this.http.post(url, `room=${name}`, {headers: this.headers2}).toPromise();
  }
  removeDevice(dev: Device, room: Room): Promise<any> {
    const url = `${this.PROD_URL}/room/${room.getRoomName()}`;
    return this.http.request('delete', url, {body: `light=${dev.getDeviceName()}`, headers: this.headers2} ).toPromise();
  }
}
