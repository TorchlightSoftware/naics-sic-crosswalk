# NAICS to SIC Crosswalk

NAICS has published a crosswalk PDF relevant for the years 2017-2022.  I've translated that to JSON and published it as an NPM module.  Pull requests welcome if you notice discrepancies.

# Usage

## Full 6-Digit Classification

The main export contains all 2,270 records at 6-digit granularity. Here's some examples of querying the data using lodash:

```javascript
import xw from 'naics-sic-crosswalk'
import _ from 'lodash'

console.log(_.find(xw, {naics: '111120'}).sic)
console.log(_.find(xw, {naics: '111120'}).sicDescription)
console.log(_.find(xw, {sic: '0119'}).naics)
console.log(_.find(xw, {sic: '0119'}).naicsDescription)
```

## 3-Digit Subsector Classification

For applications that need coarser granularity, a 3-digit subsector dataset is available with 99 records. This is useful when working with smaller context windows (such as LLM prompts) or when subsector-level classification is sufficient.

```javascript
import subsectors from 'naics-sic-crosswalk/3digit'
import _ from 'lodash'

// Find a subsector
console.log(_.find(subsectors, {naics: '111'}))
// { naics: '111', naicsDescription: 'Crop Production' }
```

### Two-Stage Classification

You can use the 3-digit subsector codes for broad classification, then drill down to specific 6-digit codes when needed:

```javascript
import subsectors from 'naics-sic-crosswalk/3digit'
import fullCrosswalk from 'naics-sic-crosswalk'
import _ from 'lodash'

// Step 1: Broad classification - find the subsector
const subsectorCode = '238'
const subsector = _.find(subsectors, {naics: subsectorCode})
console.log(subsector.naicsDescription)
// "Specialty Trade Contractors"

// Step 2: Drill down - find all detailed codes in this subsector
const detailedCodes = fullCrosswalk.filter(r => r.naics.startsWith(subsectorCode))
console.log(detailedCodes.length) // All 6-digit NAICS codes in subsector 238
console.log(detailedCodes[0])
// Example: { naics: '238110', naicsDescription: 'Poured Concrete Foundation...', sic: '1771', sicDescription: 'Concrete Work' }
```
