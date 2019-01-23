const svgWidth = 1000;
const svgHeight = 700;
let numLandforms = [1, 2, 3, 4, 5];
numLandforms = numLandforms[Math.floor(Math.random() * numLandforms.length)];
let landSize = [300, 400, 800, 1000, 1200, 1500, 1500, 2000];
let landDensity = [10, 500, 1000];
const randomX = d3.randomUniform(0, svgWidth);
const randomY = d3.randomUniform(0, svgHeight);
const data = d3.range(50000).map(function() { return [randomX(), randomY()]; });
const num = data.length;
let delaunay = d3.Delaunay.from(data);
let voronoi = delaunay.voronoi([0, 0, svgWidth, svgHeight]);
let relaxedPoints;

// normalize points of polygons
for (let i = 0; i < 2; i++){
  relaxedPoints = voronoi.cellPolygons();
  relaxedPoints = [...relaxedPoints];
  relaxedPoints = relaxedPoints.map(x => d3.polygonCentroid(x));
}
delaunay = d3.Delaunay.from(relaxedPoints);
voronoi = delaunay.voronoi([0, 0, svgWidth, svgHeight]);



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

// locationNeighbor key: seed point, value: array of neighboring points
let locationNeighbors = {};
for (let i = 0; i < numLandforms; i++) {
  let x = d3.randomUniform(300, svgWidth-300);
  let y = d3.randomUniform(200, svgHeight-200);
  let point = delaunay.find(x(), y());
  let points = delaunay.neighbors(point);
  points = [...points];
  locationNeighbors[point] = points;
}

// populate the locationNeighbors' value with list of neighbors
const createNeighbors = function createNeighbors() {
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
  let seeds = Object.keys(locationNeighbors);

  for (let i = 0; i < seeds.length; i++) {
    seeds[i] = parseInt(seeds[i]);
  }

  const seedNeighbors = Object.values(locationNeighbors);
  let territory = [];
  seedNeighbors.forEach (neighbors => {
    territory = territory.concat(neighbors);
  });
  console.log(seeds);

  for (let i = 0; i < num; i++) {
    let path = voronoi.renderCell(i);
    if (path != undefined ){
      let strokeColor = 'rgb(69, 130, 159)';
      let color = 'rgb(69, 130, 159)';
      // let color = (i%2 == 0) ? 'rgb(95, 157, 173)' : 'rgb(69, 130, 159)';

      if (territory.includes(i)) {
        color = 'rgb(231, 232, 196)';
        strokeColor = 'rgb(231, 232, 196)';
      }
      color = seeds.includes(i) ? 'tomato' : color;

      svg.append('path')
      .attr('d', path)
      .attr('fill', color)
      .attr('stroke', strokeColor);
    }
  }
};


createNeighbors();
createLandform();
