const svgWidth = 1000;
const svgHeight = 700;
const randomX = d3.randomUniform(0, svgWidth);
const randomY = d3.randomUniform(0, svgHeight);

let landSize = [300, 400, 800, 1000];
let landDensity = [100, 500, 1000];
let numLandforms = [3, 4, 5, 6];
numLandforms = numLandforms[Math.floor(Math.random() * numLandforms.length)];

const data = d3.range(30000).map(function() { return [randomX(), randomY()]; });
const num = data.length;

let relaxedPoints;
// locationNeighbors =>  seed point: array of neighboring points
let locationNeighbors = {};
let landGradient = [];
let delaunay = d3.Delaunay.from(data);
let voronoi = delaunay.voronoi([0, 0, svgWidth, svgHeight]);

let svg = d3.select('svg')
.attr("id", "map")
.attr('width', svgWidth)
.attr('height', svgHeight)
.append("g")
.call(d3.zoom()
.scaleExtent([1, 50])
.translateExtent([[0, 0], [svgWidth, svgHeight]])
.on("zoom", function () {
  svg.attr("transform", d3.event.transform)
}));

let colorGenerate = d3.scaleOrdinal(d3.schemePastel1);

let greenGenerate = function (i) {
  let l = i.toString().length;
  let v = i/Math.pow(10, l);
  return d3.interpolateGreens(v);
}


const normalizePoints = function normalizePoints() {
  for (let i = 0; i < 2; i++){
    relaxedPoints = voronoi.cellPolygons();
    relaxedPoints = [...relaxedPoints];
    relaxedPoints = relaxedPoints.map(x => d3.polygonCentroid(x));
  }
  delaunay = d3.Delaunay.from(relaxedPoints);
  voronoi = delaunay.voronoi([0, 0, svgWidth, svgHeight]);
}

// populate the locationNeighbors with array of neighbors
const createNeighbors = function createNeighbors() {
  for (let i = 0; i < numLandforms; i++) {
    let x = d3.randomUniform(300, svgWidth-300);
    let y = d3.randomUniform(200, svgHeight-200);
    let point = delaunay.find(x(), y());
    let points = delaunay.neighbors(point);
    points = [...points];
    locationNeighbors[point] = points;
  }

  for (let location in locationNeighbors) {
    let expansion = locationNeighbors[location];
    let neighborFactor = landSize[Math.floor(Math.random() * landSize.length)];
    let constrictingFactor = landDensity[Math.floor(Math.random() * landDensity.length)];

    for (let i = 0; i < neighborFactor; i++) {
      let edges = expansion.slice(Math.max(expansion.length - constrictingFactor));
      let randNeighbor = edges[Math.floor(Math.random() * edges.length)];
      let preNeighbors = delaunay.neighbors(randNeighbor);
      preNeighbors = [...preNeighbors];

      for (let i = 0; i < preNeighbors.length; i++) {
        if (!expansion.includes(preNeighbors[i])) {
          expansion.push(preNeighbors[i])
        }
      }
    }
  }
};

const createLandform = function createLandform() {
  let territory = [];
  let seeds = Object.keys(locationNeighbors);
  for (let i = 0; i < seeds.length; i++) {
    seeds[i] = parseInt(seeds[i]);
  }
  let seedNeighbors = Object.values(locationNeighbors);

  for (let i = 0; i < seedNeighbors.length; i++) {
    let l = seedNeighbors[i].length;
    let increment = 1/l;
    let gradientCount = 0;
    let gradientSubarray = [];

    for (let j = 0; j < l; j++){
      gradientSubarray.push(gradientCount);
      gradientCount += increment
    }
    gradientSubarray = gradientSubarray.reverse();
    landGradient.push(gradientSubarray);
    territory = territory.concat(seedNeighbors[i]);
  }

  console.log("land gradient", landGradient);
  console.log("territory", territory);

  for (let i = 0; i < num; i++) {
    let path = voronoi.renderCell(i);
    if (path != undefined ){

      let strokeColor = 'rgb(95, 157, 173)';
      let color = 'rgb(95, 157, 173)';
      let index;
      let checkOverlap = {};
      // let color = (i%2 == 0) ? 'rgb(95, 157, 173)' : 'rgb(69, 130, 159)';

      for (let j = 0; j < seedNeighbors.length; j++){
        if (seedNeighbors[j].includes(i) ){
          index = seedNeighbors[j].indexOf(i);

          let k = landGradient[j][index];
          let clr = d3.interpolateGreens(k);
          color = clr;
          strokeColor = clr;
        }
      }
      svg.append('path')
      .attr('d', path)
      .attr('fill', color)
      .attr('stroke', strokeColor);
    }
  }
};


normalizePoints();
createNeighbors();
createLandform();
