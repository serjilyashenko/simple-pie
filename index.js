;(function () {
  const PI = Math.PI;
  const radius = 50;

  const defaultPallet = [
    "#69D2E7","#A7DBD8","#E0E4CC","#F38630","#FA6900", "#FE4365","#FC9D9A","#F9CDAD","#C8C8A9","#83AF9B",
    "#ECD078","#D95B43","#C02942","#542437","#53777A", "#556270","#4ECDC4","#C7F464","#FF6B6B","#C44D58",
    "#774F38","#E08E79","#F1D4AF","#ECE5CE","#C5E0DC", "#E8DDCB","#CDB380","#036564","#033649","#031634",
    "#490A3D","#BD1550","#E97F02","#F8CA00","#8A9B0F", "#FF9900","#424242","#E9E9E9","#BCBCBC","#3299BB",
    "#5D4157","#838689","#A8CABA","#CAD7B2","#EBE3AA", "#5E412F","#FCEBB6","#78C0A8","#F07818","#F0A830",
  ];

  function svgSectorFactory(radAngle0, radAngleDiff, color) {
    const x0 = radius + radius * Math.sin(radAngle0);
    const y0 = radius - radius * Math.cos(radAngle0);

    let radAngle = radAngle0 + radAngleDiff;
    radAngle = radAngleDiff !== 2 * PI ? radAngle : radAngle - 0.01;

    const x = radius + radius * Math.sin(radAngle);
    const y = radius - radius * Math.cos(radAngle);

    return `
        <path fill="${color}" d="
            M ${radius} ${radius}
            L ${x0} ${y0}
            A ${radius} ${radius} 0
            ${radAngleDiff > PI ? '1' : '0'} 1
            ${x} ${y}
            Z
        "/>
    `;
  }

  function svgWrapperFactory(element, borderColor = 'black') {
    return `
        <svg viewBox="-5 -5 110 110" xmlns="http://www.w3.org/2000/svg">
            <g stroke="${borderColor}" stroke-width="2px" fill="transparent">
                ${element}
            </g>
        </svg>
  `;
  }

  class SVGPieTest {
    constructor(quarter0, quarterDiff) {
      const pieElement = document.createElement('div');

      pieElement.style.width = '100%';
      pieElement.style.height = '100%';

      const radAngle0 = quarter0 * (PI / 4 - 0.1);
      const radAngleDiff = quarterDiff * (PI / 4 - 0.1);

      pieElement.innerHTML = svgWrapperFactory(
        svgSectorFactory(radAngle0, radAngleDiff, 'blue') + '<circle cx="50" cy="50" r="50"/>'
      );

      return pieElement;
    }
  }

  class SVGPie {
    constructor(values, pallet = defaultPallet, borderColor = 'black') {
      const pieElement = document.createElement('div');

      pieElement.style.width = '100%';
      pieElement.style.height = '100%';

      const _values = values || new Array(pallet.length).fill(1);
      const sum = _values.reduce((s, x) => Number(s) + Number(x), 0);
      const angleDiffList = _values.map(v => 2 * PI * v / sum);

      const angleCoordinates = [];
      let anglePosition = 0;
      for (let i in angleDiffList) {
        const angleDiff = angleDiffList[i];
        angleCoordinates.push([anglePosition, angleDiff]);
        anglePosition += Number(angleDiff);
      }

      const sectorElementList = angleCoordinates.map(([angle0, angleDiff], index) => {
        return svgSectorFactory(angle0, angleDiff, pallet[index]);
      });

      pieElement.innerHTML = svgWrapperFactory(sectorElementList.join(''), borderColor);

      return pieElement;
    }

    static SVGPieTest = SVGPieTest;
  }

  const isNode = typeof global === 'object' && global && global.Object === Object;
  const isBrowser = typeof self === 'object' && self && self.Object === Object;

  if (isNode) {
    module.exports = SVGPie;
  } else if (isBrowser) {
    self.SVGPie = SVGPie;
  } else {

  }
}.call(this));
