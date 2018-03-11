import {Device} from './device';

export class Room {
  constructor(public roomname?: string, public devices: Device[] = []) {}
  getRoomName(): string {
    return this.roomname;
  }
  setRoomName(newName: string): void {
    this.roomname = newName;
  }
  getDeviceList(): Device[] {
    return this.devices;
  }
  addDevice(device: Device): void {
    this.devices.push(device);
  }
  removeDevice(dev: Device): void {
    const temp = this.devices.findIndex(device => device.getDeviceName() === dev.getDeviceName());
    this.devices.splice(temp, 1);
  }
}
