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

class MetroService {
    constructor() {
      this.fares = {
        zone1: 2.5,
        oneZoneOutsideZone1: 2.0,
        twoZonesIncludingZone1: 3.0,
        twoZonesExcludingZone1: 2.25,
        moreThanTwoZones: 3.2,
      };
      this.maxFare = this.fares.moreThanTwoZones;
    }
  
    calculateFare(startStation, endStation) {
      const startZones = startStation.zones;
      const endZones = endStation.zones;
  
      if (startZones.includes(1) && endZones.includes(1)) {
        return this.fares.zone1;
      } else if (startZones.length === 1 && endZones.length === 1 && startZones[0] !== 1 && endZones[0] !== 1) {
        return this.fares.oneZoneOutsideZone1;
      } else if (startZones.includes(1) || endZones.includes(1)) {
        return this.fares.twoZonesIncludingZone1;
      } else if (startZones.length > 1 || endZones.length > 1) {
        return this.fares.twoZonesExcludingZone1;
      } else {
        return this.fares.moreThanTwoZones;
      }
    }
  
    getMaxFare() {
      return this.maxFare;
    }
  }


export { Station, BusService, MetroService};