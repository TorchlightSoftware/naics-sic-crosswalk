# NAICS to SIC Crosswalk

NAICS has published a crosswalk PDF relevant for the years 2017-2022.  I've translated that to JSON and published it as an NPM module.  Pull requests welcome if you notice discrepancies.

# Usage

Here's some examples of querying the data using lodash.

```javascript
import xw from 'naics-sic-crosswalk'
import _ from 'lodash'

console.log(_.find(xw, {naics: '111120'}).sic)
console.log(_.find(xw, {naics: '111120'}).sicDescription)
console.log(_.find(xw, {sic: '0119'}).naics)
console.log(_.find(xw, {sic: '0119'}).naicsDescription)
```
