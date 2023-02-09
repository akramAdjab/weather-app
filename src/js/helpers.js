export const AJAX = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(res.status);

    return data;
  } catch (err) {
    throw err;
  }
};

export const userCoords = [];

navigator.geolocation.getCurrentPosition(
  function (position) {
    userCoords.push(position?.coords.latitude);
    userCoords.push(position.coords.longitude);
  },
  function () {
    console.log(`Location not enabled!`);
  }
);
