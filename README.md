# whirl-a-world
- [Hitchhiker's guide to d3](https://medium.com/@enjalot/the-hitchhikers-guide-to-d3-js-a8552174733a)
- [The state of d3 Vornoi](https://visionscarto.net/the-state-of-d3-voronoi)
- [d3 voronoi interpolation](http://bl.ocks.org/shawnbot/8059739)
- [Exploring Vornoi polygons, Delaunay triangles, and circumcircles](http://bl.ocks.org/zanarmstrong/b1c051113be144570881)
- [Canvas voronoi](https://bl.ocks.org/mbostock/6675193)

## links
[product proposal](https://gist.github.com/goeunpark/194c45c9918bdd09f07599a55dbb0480)

### friday, jan 11
- created repo, setup node & express, replaced jade with html under views, read [MDN node/express tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)

### weekend jan 12 / 13
- learned more about [node.js + webpack](https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70), loaded d3-delaunay library at script
- added gitignore file, removed node_modules
- to run on node / browser
```
$ cd whirl-world
$ npm install
$ DEBUG=whirl-a-world nodemon npm start
```

### monday, jan 14
- still trying to make polygons happen
- fills up entire screen and can zoom a whole bunch of dots now ??
- [responding to resize](https://bl.ocks.org/curran/3a68b0c81991e2e94b19)
- this returns size of element and position relative to viewport:
```
var element = d3.select('.elementClassName').node();
element.getBoundingClientRect().width;
```

### tuesday, jan 15
- stack overflow on [making SVG container 100% of window](https://stackoverflow.com/questions/44833788/making-svg-container-100-width-and-height-of-parent-container-in-d3-v4-instead)
- made a background gradient following [this talk by nadieh bremer](https://policyviz.com/podcast/episode-65-nadieh-bremer/)


### wednesday, jan 16
- [d3-zoom documentation](https://github.com/d3/d3-zoom)
- another [zooming example](http://jsfiddle.net/shawnbot/BJLe6/)
- [SVG semantic zooming](https://bl.ocks.org/mbostock/3680957)
- read this code for [randomly generating polygon](http://bl.ocks.org/nitaku/16933e96f51571fbbcd6)
- picked around Interactive Data Visualilzation for the Web

note to self: use [...neighborPoints] for array of neighboring indexes

a glitch: when the initial window's width isn't wide enough, crops weirdly
![glitch of map generator](/public/images/glitch-on-zoom.png)


### thursday, jan 17
- whoa voronois!! currently working on: how to make shapes not look like italy / penninsulas with current random neigboring poloygon code
![screenshot of random generated voronoi cluster](/public/images/mvp.png)
