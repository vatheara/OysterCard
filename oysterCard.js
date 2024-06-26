function isTwoZones(zone1, zone2) {
  const diff = zone1 - zone2;
  return diff === 1 || diff === -1;
}

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
      noZone: 1.8,
    };
    this.maxFare = this.fares.moreThanTwoZones;
  }

  calculateFare(startStation, endStation) {
    const startZones = startStation.zones;
    const endZones = endStation.zones;

    if (startZones.length === 0 || endZones.length === 0) {
      return this.fares.noZone;
    }

    const zonesIntersection = startZones.filter((zone) =>
      endZones.includes(zone)
    );

    if (zonesIntersection.length > 0) {
      if (zonesIntersection.includes(1)) {
        return this.fares.zone1;
      }
      return this.fares.oneZoneOutsideZone1;
    }

    const allZones = [...new Set([...startZones, ...endZones])];
    if (allZones.includes(1) && allZones.includes(2) && allZones.length === 2) {
      return this.fares.twoZonesIncludingZone1;
    }

    if (isTwoZones(startZones[0], endZones[0])) {
      return this.fares.twoZonesExcludingZone1;
    }

    return this.fares.moreThanTwoZones;
  }

  getMaxFare() {
    return this.maxFare;
  }
}

class OysterCard {
  constructor(busService, metroService, balance = 0) {
    this.balance = balance;
    this.busService = busService;
    this.metroService = metroService;
    this.currentJourney = null;
  }

  load(amount) {
    this.balance += amount;
  }

  startJourney(station) {
    if (this.currentJourney) throw new Error("Already in a journey");
    if (this.balance < this.metroService.getMaxFare())
      throw new Error("Insufficient balance");
    this.currentJourney = { start: station, type: "tube" };
    this.balance -= this.metroService.getMaxFare();
  }

  endJourney(station) {
    if (!this.currentJourney) throw new Error("No journey in progress");
    const fare = this.metroService.calculateFare(
      this.currentJourney.start,
      station
    );
    this.balance += this.metroService.getMaxFare() - fare;
    this.currentJourney = null;
  }

  takeBus() {
    if (this.balance < this.busService.getFare())
      throw new Error("Insufficient balance");
    this.balance -= this.busService.getFare();
  }

  getBalance() {
    return this.balance.toFixed(2);
  }
}

export { Station, BusService, MetroService, OysterCard };
