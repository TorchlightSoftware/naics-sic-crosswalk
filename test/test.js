const xw = require('..')
const _ = require('lodash')

console.log(_.find(xw, {naics: '111120'}).sic)
console.log(_.find(xw, {naics: '111120'}).sicDescription)
console.log(_.find(xw, {sic: '0119'}).naics)
console.log(_.find(xw, {sic: '0119'}).naicsDescription)
