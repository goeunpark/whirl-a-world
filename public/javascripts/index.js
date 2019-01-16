const container = document.getElementById("map-container");
const svg = d3.select(container).append("svg");

svg.attr("id", "map")
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 960 550");

const map = document.getElementById("map");
const mapWidth = map.getBoundingClientRect().width;
const mapHeight = map.getBoundingClientRect().height;
console.log(mapHeight)

const randomX = d3.randomNormal(mapWidth / 2, 200),
randomY = d3.randomNormal(mapHeight / 2, 200),
data = d3.range(2000).map(function() { return [randomX(), randomY()]; });

console.log(data)

svg.append("rect")
.attr("fill", "rgb(34, 60, 153)")
.attr("pointer-events", "all")
.attr("width", mapWidth)
.attr("height", mapHeight)
.call(d3.zoom()
.scaleExtent([1, 8])
.on("zoom", zoom));

// const star = svg.selectAll("polygon")
//   .data(data)
//   .enter.append("polygon")
//   .attr("stroke", "peachpuff")
//   .attr("stroke-width", "2")
//   .attr("points", "100,10 40,180 190,60 10,60 160,180")
//   .attr("transform", transform(d3.zoomIdentity));

const circle = svg.selectAll("circle")
.data(data)
.enter().append("circle")
.attr("r", 3)
.attr("transform", transform(d3.zoomIdentity));

function zoom() {
  circle.attr("transform", transform(d3.event.transform));
}

function transform(t) {
  return function(d) {
    return "translate(" + t.apply(d) + ")";
  };
}




// const element = d3.select('#map').node();
// const width = element.getBoundingClientRect().width;
// const height = element.getBoundingClientRect().height;

//  const svg = d3.select("svg"),
// width = +svg.attr("width"),
// height = +svg.attr("height"),
// aspect = width / height;


//
// const w = 200;
// const h = 200;
// //
// // const vertices = d3.range(100).map(function(d) {
// //   return [Math.random() * width, Math.random() * height];
// // });
// // // const points = [[0, 0], [0, 1], [1, 0], [1, 1]];
// // const delaunay = d3.Delaunay.from(vertices);
// // const voronoi = delaunay.voronoi();
// //
// // let svg = d3.select('svg')
// //   .append('viewbox', '0 0 500 500');
// //
// // let path = svg.selectAll("path")
// //   .data(voronoi)
// //   .enter().append("svg:path")
// //   .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
// //   .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
// //
// // svg.selectAll("circle")
// //   .data(vertices.slice(1))
// //   .enter().append("svg:circle")
// //   .attr("transform", function(d) { return "translate(" + d + ")"; })
// //   .attr("r", 2);
// //
// // console.log("this is a voronoi");
// // console.log(voronoi);
// //
// // voronoi.render();
//
// const vertices = d3.range(100).map(function(d) {
//   return [Math.random() * w, Math.random() * h];
// });
//
// let svg = d3.select("#chart")
//   .append("svg:svg")
//   .attr("width", w)
//   .attr("height", h)
//   .attr("class", "PiYG");
//
// svg.selectAll("path")
//   .data(d3.voronoi(vertices))
//   .enter().append("svg:path")
//   .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
//   .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
//
// svg.selectAll("circle")
//   .data(vertices.slice(1))
//   .enter().append("svg:circle")
//   .attr("transform", function(d) { return "translate(" + d + ")"; })
//   .attr("r", 2);
//
// function update() {
//   vertices[0] = d3.svg.mouse(this);
//   svg.selectAll("path")
//   .data(d3.geom.voronoi(vertices)
//   .map(function(d) { return "M" + d.join("L") + "Z"; }))
//   .filter(function(d) { return this.getAttribute("d") != d; })
//   .attr("d", function(d) { return d; });
// }
