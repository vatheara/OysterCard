import { OysterCard, BusService, MetroService, Station } from "./oysterCard.js";

describe("OysterCard", () => {
  let busService, metroService, oysterCard;
  let holborn, aldgate, earlsCourt, hammersmith, arsenal, wimbledon, chelsea;

  beforeEach(() => {
    busService = new BusService();
    metroService = new MetroService();
    oysterCard = new OysterCard(busService, metroService);
    holborn = new Station("Holborn", [1]);
    aldgate = new Station("Aldgate", [1]);
    earlsCourt = new Station("Earl's Court", [1, 2]);
    hammersmith = new Station("Hammersmith", [2]);
    arsenal = new Station("Arsenal", [2]);
    wimbledon = new Station("Wimbledon", [3]);
    chelsea = new Station("Chelsea", []);
  });

  test("fare anywhere in Zone 1 eg: from Holborn to Aldgate", () => {
    const fare = metroService.calculateFare(holborn, aldgate);
    expect(fare).toBe(2.5);
  });

  test("fare anywhere one zone outside zone 1 eg: from Arsenal to Hammersmith", () => {
    const fare = metroService.calculateFare(arsenal, hammersmith);
    expect(fare).toBe(2);
  });

  test("fare anyhere two zones including zone 1 eg: from Hammersmith to Holborn", () => {
    const fare = metroService.calculateFare(hammersmith, holborn);
    expect(fare).toBe(3);
  });

  test("fare anyhere two zones excluding zone 1 eg: from Arsenal to Wimbledon", () => {
    const fare = metroService.calculateFare(arsenal, wimbledon);
    expect(fare).toBe(2.25);
  });

  test("fare more than two zones (3+)	 eg: from Wimbledon to Aldgate", () => {
    const fare = metroService.calculateFare(wimbledon, aldgate);
    expect(fare).toBe(3.2);
  });

  test("fare any bus journey eg: from Earl's Court to Chelsea", () => {
    const fare = metroService.calculateFare(earlsCourt, chelsea);
    expect(fare).toBe(1.8);
  });

  test("loads balance correctly", () => {
    oysterCard.load(30);
    expect(parseFloat(oysterCard.getBalance())).toBe(30);
  });

  test("calculates fare for tube journey Holborn to Earl's Court", () => {
    oysterCard.load(30);
    oysterCard.startJourney(holborn);
    oysterCard.endJourney(earlsCourt);
    expect(parseFloat(oysterCard.getBalance())).toBe(30 - 2.5);
  });

  test("charges fare for a bus journey", () => {
    oysterCard.load(30);
    oysterCard.takeBus();
    expect(parseFloat(oysterCard.getBalance())).toBe(30 - 1.8);
  });

  test("calculates fare for tube journey Earl's Court to Hammersmith", () => {
    oysterCard.load(30);
    oysterCard.startJourney(earlsCourt);
    oysterCard.endJourney(hammersmith);
    expect(parseFloat(oysterCard.getBalance())).toBe(30 - 2.0);
  });

  test("works for the requested trips", () => {
    oysterCard.load(30);
    oysterCard.startJourney(holborn);
    oysterCard.endJourney(earlsCourt);
    oysterCard.takeBus();
    oysterCard.startJourney(earlsCourt);
    oysterCard.endJourney(hammersmith);
    expect(parseFloat(oysterCard.getBalance())).toBeCloseTo(
      30 - 2.5 - 1.8 - 2.0,
      2
    );
  });

  test("throws an error if starting a journey with insufficient balance", () => {
    expect(() => {
      oysterCard.startJourney(holborn);
    }).toThrow("Insufficient balance");
  });

  test("throws an error if trying to end a journey that hasn’t started", () => {
    expect(() => {
      oysterCard.endJourney(earlsCourt);
    }).toThrow("No journey in progress");
  });

  test("throws an error if trying to start a journey while already in one", () => {
    oysterCard.load(30);
    oysterCard.startJourney(holborn);
    expect(() => {
      oysterCard.startJourney(earlsCourt);
    }).toThrow("Already in a journey");
  });
});
