const crypto = require('crypto');

module.exports = (src, encoding, algorithm, key) => {
  const geoJsonPoint = src.split(':');
  const iv = Buffer.from(geoJsonPoint.shift(), encoding);
  const encrypted = Buffer.from(geoJsonPoint.join(":"), encoding);
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  const buff = decipher.update(encrypted);
  return Buffer.concat([buff, decipher.final()]).toString()
};
