import {Room} from './room';

export class Device {
  private newname: string;
  constructor(private devicename?: string, private temp?: number,
    private brightness?: number, private profileName?: string,
    private profileId?: number) {this.newname = devicename; }
  getNewName(): string {
    return this.newname;
  }
  setnewName(name: string): void {
    this.newname = name;
  }
  getProfileId(): number {
    return this.profileId;
  }
  setProfileId(id: number): void {
    this.profileId = id;
  }
  getDeviceName(): string {
    return this.devicename;
  }
  setDeviceName(newName: string): void {
    this.devicename = newName;
    this.newname = newName;
  }
  getTemp(): number {
    return this.temp;
  }
  setTemp(temp: number): void {
    this.temp = temp;
  }
  getBrightness(): number {
    return this.brightness;
  }
  setBrightness(brightness: number): void {
    this.brightness = brightness;
  }
  getProfileName(): string {
    return this.profileName;
  }
  setProfileName(value: string) {
    this.profileName = value;
  }
  getDeviceForm() {
    return `temp=${this.temp}&brightness=${this.brightness}
    &profile=${this.profileId}`;
  }
}
