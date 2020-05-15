export class Stats {
  botsCreated: number;
  reqsPerDay: number;

  constructor(item: any) {
    if (item) {
      this.botsCreated = item.botsCreated;
      this.reqsPerDay = item.reqsPerDay;
    } else {
      this.botsCreated = 0;
      this.reqsPerDay = 0;
    }
  }
}
