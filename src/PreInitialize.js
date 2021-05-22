// Env init
global.FOSValues = {};
global.FOSSelfs = {};

// For the date now
Date.prototype.today = function () {
  return new Date().toLocaleDateString({ timeZone: "Asia/Taipei" });
};

// For the time now
Date.prototype.timeNow = function () {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Taipei",
  });
};

import config from './Config';
global.FOSValues.FOSConfig = config;
