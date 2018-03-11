export class ProfileInstance {
  private timeMoment = {
    hour: null,
    minute: null
  };
    constructor(private index?: number, private temp?: number, private bright?: number,
      private time?: number, private transLength?: number) {
        this.timeMoment.hour = Math.floor(time / 3600);
        this.timeMoment.minute = Math.floor(time % 3600 / 60); }
    getIndex(): number {
      return this.index;
    }
    getTemp(): number {
      return this.temp;
    }
    getBright(): number {
      return this.temp;
    }
    getTime(): number {
      this.temp = this.timeMoment.hour * 3600 + this.timeMoment.minute * 60;
      return this.temp;
    }
    getTransLength(): number {
      return this.temp * 3600;
    }
    setTemp(temp: number): void {
      this.temp = temp;
    }
    setBright(bright: number): void {
      this.bright = bright;
    }
    setTime(time: number): void {
      this.time = time;
      this.timeMoment.hour = Math.floor(time / 3600);
      this.timeMoment.minute = Math.floor(time % 3600 / 60);
    }
    setTransLength(transLength: number): void {
      this.transLength = Math.floor(transLength / 3600);
    }
    getProfileForm() {
      return `index=${this.index}&time=${this.time}
      &temp=${this.temp}&brightness=${this.bright}
      &length=${this.transLength}`;
    }
    
  }
