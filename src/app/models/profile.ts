import {ProfileInstance} from './profile-instance';

export class Profile {
  private newname: string;
  constructor(public profilename?: string, public profileid?: number,
    public instances: ProfileInstance[] = []) {this.newname = profilename; }

  getNewName(): string {
    return this.newname;
  }
  setnewName(name: string): void {
    this.newname = name;
  }
  getProfileId(): number {
    return this.profileid;
  }
  setProfileId (id: number): void {
    this.profileid = id;
  }
  getProfileName(): string {
    return this.profilename;
  }
  setProfileName(name: string): void {
    this.profilename = name;
    this.newname = name;
  }
  addInstances(instance: ProfileInstance): void {
    this.instances.push(instance);
  }
  getInstance(index: number): ProfileInstance {
    return this.instances.filter(inst => inst.getIndex() === index)[0];
  }
  getHighIndex(): number {
    let highindex = 0;
    this.instances.forEach((inst) => {highindex = (inst.getIndex() > highindex) ? inst.getIndex() : highindex; });
    return highindex;
  }
  removeAllInstances(): void {
    this.instances.length = 0;
  }
  removeProfInst(InstIndex: number): void {
    const temp = this.instances.findIndex(device => device.getIndex() === InstIndex);
    this.instances.splice(temp, 1);
  }
}
