const d3Geo = require('d3-geo');
const fs = require('fs');
const data = require('./src/data/payakumbuh.json');
const feature = data.features[0];
const proj = d3Geo.geoMercator().fitSize([260, 210], feature);
const pathGenerator = d3Geo.geoPath().projection(proj);
const d = pathGenerator(feature);
console.log(d.substring(0, 50));
