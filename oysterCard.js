class Station {
  constructor(name, zones) {
    this.name = name;
    this.zones = zones;
  }
}

class BusService {
  constructor() {
    this.fare = 1.8;
  }

  getFare() {
    return this.fare;
  }
}


export { Station, BusService};