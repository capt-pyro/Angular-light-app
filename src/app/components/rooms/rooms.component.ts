import { Component, OnInit } from '@angular/core';
import {RoomDataService} from '../../services/room-data.service';
import { ProfileDataService } from '../../services/profile-data.service';
import { Room } from '../../models/room';
import { Profile } from '../../models/profile';
import { Device } from '../../models/device';
import { ProfileInstance } from '../../models/profile-instance';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public myRoomData: Room[] = [];
  private servdownprofInst = new ProfileInstance(1, 2000, 60, 28800, 3600);
  private servdownProf = new Profile(`Day`, 1);
  private servdownDev = new Device(`Ceiling Light`, 3800, 50);
  private servdownRoom = new Room(`Bedroom`);
  private profileList: Profile[] = [];
  private tempDevObj: Device = new Device();
  public newroomname = '';
  private selectedProf: Profile = new Profile();

  constructor(private roomService: RoomDataService, private profileService: ProfileDataService, ) {}
  ngOnInit(): void {
    this.servdownProf.addInstances(this.servdownprofInst);
    this.profileList.push(this.servdownProf);
    this.servdownRoom.addDevice(this.servdownDev);
    this.myRoomData.push(this.servdownRoom);
    this.selectedProf.setProfileId(111111);
    this.roomService.getRooms().then(res => {
      for (let i = 0; i < res.length; i++) {
        const room = new Room(res[i].room);
        this.myRoomData.push(room);
        for (let j = 0; j < res[i].light.length; j++) {
          this.roomService.getRoomDevice(res[i].room, res[i].light[j].name).then((result) => {
            const dev = new Device(res[i].light[j].name, result.temp, result.brightness,
              res[i].light[j].profile, result.profile);
            room.addDevice(dev);
          })
          .catch((err) => {
            console.log(err);
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
    this.profileService.getProfiles().then((res) => {
      for (let i = 0; i < res.length; i++) {
        this.profileList[i] = new Profile(res[i].profile, res[i].id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  onSelectProfile(create: boolean, prof: Profile, dev?: Device): void {
    if (!create) {
    dev.setProfileName(prof.getProfileName());
    dev.setProfileId(prof.getProfileId());
    } else {
      this.tempDevObj.setProfileName(prof.getProfileName());
      this.tempDevObj.setProfileId(prof.getProfileId());
    }
  }

  onDeviceUpdate(dev: Device, room: Room): void {
    if (dev.getNewName() !== dev.getDeviceName()) {
      this.roomService.changeDeviceName(dev.getNewName(), dev.getDeviceName(), room).then((res) => {
        this.roomService.updateLight(dev, room).then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      this.roomService.updateLight(dev, room).then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  onCreateDevice( room: Room): void {
    if (this.tempDevObj.getProfileName() === null) {
      console.log('didnt trap profile problem');
      return;
    }
    this.roomService.createLight(this.tempDevObj.getDeviceName(), room).then((res) => {
      console.log(res);
      this.roomService.updateLight(this.tempDevObj, room).then((result) => {
        this.tempDevObj.setnewName(this.tempDevObj.getDeviceName());
        room.addDevice(this.tempDevObj);
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  onNewRoom(): void {
    if (this.newroomname.length >= 1) {
      this.roomService.createNewRoom(this.newroomname).then((res) => {
        this.myRoomData.push(new Room(this.newroomname));
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  onDeviceDelete(dev: Device, room: Room): void {
    this.roomService.removeDevice(dev, room).then((res) => {
      room.removeDevice(dev);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
