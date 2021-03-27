# svg-pie

Super light weight and super simple svg pie diagram

demo: https://serjilyashenko.github.io/svg-pie/

## Installation

```shell
npm install svg-pie
```

### Use with ES5 import:
```js
import SVGPie from 'svg-pie';

// will appear soon
```

### Use in NodeJs:
```js
const SVGPie = require('svg-pie');
```

### Use in a browser:
```html
<div id="container"></div>

<script src="node_modules/svg-pie/index.js"></script>
<script>
    const svgElement = new  SVGPie([2, 1, 1, 2]);
    document.getElementById('target-container0').appendChild(svgElement);
</script>
```
