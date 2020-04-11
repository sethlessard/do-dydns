const IPManager = require("./src/IPManager");

const ipManager = new IPManager();

ipManager.getCurrentIP()
.then(ip => {
  console.log(`Public IP: ${ip}`);
  ipManager.getLastKnownIP()
  .then(ip => console.log(`Last Known: ${ip}`));
})
.catch(console.error);
