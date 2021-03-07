;(function () {

  const PI = Math.PI;
  const radius = 50;

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
        <svg viewBox="-10 -10 120 120" xmlns="http://www.w3.org/2000/svg">
            <g stroke="${borderColor}" stroke-width="2px" fill="transparent">
                ${element}
            </g>
        </svg>
  `;
  }

  class SVGPie {
    constructor($id, colors, borderColor = 'black') {
      const pieElement = document.createElement('div');

      pieElement.style.width = '100%';
      pieElement.style.height = '100%';

      const radAngle = 2 * PI / colors.length;
      const sectorElementList = colors.map((color, index) => {
        const radAngle0 = radAngle * index;

        return svgSectorFactory(radAngle0, radAngle, color);
      });

      pieElement.innerHTML = svgWrapperFactory(sectorElementList.join(''), borderColor);

      document.getElementById($id).appendChild(pieElement);
    }
  }

  class SVGPieTest {
    constructor($id, quarter0, quarterDiff) {
      const pieElement = document.createElement('div');

      pieElement.style.width = '100%';
      pieElement.style.height = '100%';

      const radAngle0 = quarter0 * (PI / 4 - 0.1);
      const radAngleDiff = quarterDiff * (PI / 4 - 0.1);

      pieElement.innerHTML = svgWrapperFactory(
        svgSectorFactory(radAngle0, radAngleDiff, 'blue') + '<circle cx="50" cy="50" r="50"/>'
      );

      document.getElementById($id).appendChild(pieElement);
    }
  }

  window.SVGPie = SVGPie;
  window.SVGPieTest = SVGPieTest;

}());
