import { Station } from "./oysterCard.js";

(() => {
    const holborn = new Station("Holborn", [1])
    const aldgate = new Station("Aldgate",[1])
    const earlsCourt = new Station("Earl's Court",[1,2])
    const hammersmith = new Station("Hammersmith",[2])
    const arsenal = new Station("Arsenal", [2])
    const wimbledon = new Station("Wimbledon", [3])

    console.log("========= Initialize Stations =========")
    console.log("Station: ",holborn.name,", Zone(s): ", holborn.zones)
    console.log("Station: ",aldgate.name,", Zone(s): ", aldgate.zones)
    console.log("Station: ",earlsCourt.name,", Zone(s): ", earlsCourt.zones)
    console.log("Station: ",hammersmith.name,", Zone(s): ", hammersmith.zones)
    console.log("Station: ",arsenal.name,", Zone(s): ", arsenal.zones)
    console.log("Station: ",wimbledon.name,", Zone(s): ", wimbledon.zones)
})()