const container = document.getElementById("map-container");
const svg2 = d3.select(container).append("svg");

svg2
  .attr("id", "map")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 960 550");

// stretch svg2 height and width to window sizes
const map = document.getElementById("map");
const mapWidth = map.getBoundingClientRect().width;
const mapHeight = map.getBoundingClientRect().height;


// CREATE A GRADIENT FOR BACKGROUND
const defs2 = svg2.append("defs")
const linearGradient2 = defs2.append("linearGradient")
  .attr("id", "linear-gradient")
  .attr("x1", "0%")
  .attr("y1", "0%")
  .attr("x2", "100%")
  .attr("y2", "100%");

linearGradient2.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "rgb(139, 55, 55)");

linearGradient2.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "rgb(34, 60, 153)");


// // data for dots
// const randomX = d3.randomNormal(mapWidth / 2, 200);
// const randomY = d3.randomNormal(mapHeight / 2, 200);
// const data = d3.range(2000).map(function() {return [randomX(), randomY()]; });
// const num = data.length;
// const delaunay = d3.Delaunay.from(data);
// const voronoi = delaunay.voronoi([0, 0, 960, 500]);


const rect2 = svg2.append("rect")
  .style("fill", "url(#linear-gradient)")
  .attr("pointer-events", "all")
  .attr("width", mapWidth)
  .attr("height", mapHeight);

// create a voronoid spread
// let point = delaunay.find(100, 300);
// let neighbors = delaunay.neighbors(point);
// let neighborsArray = [...neighbors];
//
// console.log(neighborsArray);
//
// for (let i = 0; i < num; i++) {
//   let voronoiRender = voronoi.renderCell(i);
//   if (voronoiRender != undefined){
//     console.log(voronoiRender);
//     let color = i == point ? 'red' : 'white';
//     svg2.append('path')
//       .attr('d', voronoiRender)
//       .attr('fill', color)
//       .attr('stroke', 'black')
//       .attr('stroke-width', '100');
//   }
// }
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
// // let svg2 = d3.select('svg2')
// //   .append('viewbox', '0 0 500 500');
// //
// // let path = svg2.selectAll("path")
// //   .data(voronoi)
// //   .enter().append("svg2:path")
// //   .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
// //   .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
// //
// // svg2.selectAll("circle")
// //   .data(vertices.slice(1))
// //   .enter().append("svg2:circle")
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
// let svg2 = d3.select("#chart")
//   .append("svg2:svg2")
//   .attr("width", w)
//   .attr("height", h)
//   .attr("class", "PiYG");
//
// svg2.selectAll("path")
//   .data(d3.voronoi(vertices))
//   .enter().append("svg2:path")
//   .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
//   .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
//
// svg2.selectAll("circle")
//   .data(vertices.slice(1))
//   .enter().append("svg2:circle")
//   .attr("transform", function(d) { return "translate(" + d + ")"; })
//   .attr("r", 2);
//
// function update() {
//   vertices[0] = d3.svg2.mouse(this);
//   svg2.selectAll("path")
//   .data(d3.geom.voronoi(vertices)
//   .map(function(d) { return "M" + d.join("L") + "Z"; }))
//   .filter(function(d) { return this.getAttribute("d") != d; })
//   .attr("d", function(d) { return d; });
// }
