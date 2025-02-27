const axios = require("axios");
const { geoKey, distanceKey } = require("../config");

const getLatLng = async (address) => {
  const geoUrl = "https://api.distancematrix.ai/maps/api/geocode/json?address="
    .concat(address)
    .concat("&key=")
    .concat(geoKey);
  const response = await axios.get(geoUrl);
  if (!response.data.result || response.data.result.length === 0) {
    throw new Error(`Geocoding failed for address: ${address}`);
  }
  const lat = response.data.result[0].geometry.location.lat;
  const lng = response.data.result[0].geometry.location.lng;
  console.log(lat, lng);
  return { lat, lng };
};

const getDistanceAndTime = async (props) => {
  const url =
    "https://api.distancematrix.ai/maps/api/distancematrix/json?origins="
      .concat(props.originLat + ",")
      .concat(props.originLng)
      .concat("&destinations=")
      .concat(props.destinationLat + ",")
      .concat(props.destinationLng)
      .concat("&key=")
      .concat(distanceKey);

  const response = await axios.get(url);

  const distance = response.data.rows[0].elements[0];

  return distance;
};

const getCost = async (props) => {
  const distanceTime = await getDistanceAndTime(props);
  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const cost = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };
  console.log("cost:" + props.vehicleType);
  console.log(cost[props.vehicleType]);
  return cost[props.vehicleType.vehicleType];
};

module.exports = { getLatLng, getCost, getDistanceAndTime };
