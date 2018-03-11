import { Component, OnInit } from '@angular/core';
import {ProfileDataService} from '../../services/profile-data.service';
import { Profile } from '../../models/profile';
import {ProfileInstance} from '../../models/profile-instance';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profileList: Profile[] = [];
  private servdownprofInst = new ProfileInstance(1, 2000, 60, 28800, 3600);
  private servdownProf = new Profile(`Day`, 1);
  public profileObjectDisplay: Profile;
  public newprofname: string;
  public ttemp: number;
  public tbright: number;
  public ttime = {
    hour: null,
    minute: null
  };
  public tlength: number;
  constructor(private profileService: ProfileDataService) {}
  ngOnInit(): void {
    this.servdownProf.addInstances(this.servdownprofInst);
    this.profileList.push(this.servdownProf);
    this.profileService.getProfiles().then(res => {
      for (let i = 0; i < res.length; i++) {
        const prof = new Profile(res[i].profile);
        this.profileList.push(prof);
        this.profileService.getSpecificProfile(res[i].profile).then((result) => {
          for (let j = 0; j < result.length; j++) {
            const inst = new ProfileInstance(result[j].index, result[j].temp, result[j].brightness, result[j].time, result[j].length);
            prof.addInstances(inst);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  onSelect(prof: Profile): void {
    this.profileObjectDisplay = prof;
  }
  onSubmitProfile(prof: Profile, index: number): void {
    this.profileService.setSpecificProfile(prof, index).then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  onNewProf(): void {
    if (this.newprofname.length >= 1) {
    this.profileService.createProfile(this.newprofname).then((res) => {
      this.profileList.push(new Profile(this.newprofname));
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
  onNewProfInst(): void {
    const ind = this.profileObjectDisplay.getHighIndex() + 1;
    const timem = this.ttime.hour * 3600 + this.ttime.minute * 60;
    const profInst = new ProfileInstance(ind, this.ttemp, this.tbright, timem, this.tlength);
    this.profileService.createProfileInstance(this.profileObjectDisplay.getProfileName(), profInst).then((res) => {
      this.profileObjectDisplay.removeAllInstances();
      for (let i = 0; i < res.length; i++) {
        const inst = new ProfileInstance(res[i].index, res[i].temp, res[i].brightness, res[i].time, res[i].length);
        this.profileObjectDisplay.addInstances(inst);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  onRemoveInst(prof: Profile, index: number): void {
    this.profileService.removeProfileInst(prof, index).then((res) => {
      prof.removeProfInst(index);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  onRemoveProf(prof: Profile): void {
    this.profileService.removeProfile(prof).then((res) => {
      const temp = this.profileList.findIndex(profile => profile.getProfileName() === prof.getProfileName());
      this.profileList.splice(temp, 1);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
