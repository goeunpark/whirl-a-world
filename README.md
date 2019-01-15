# whirl-a-world

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
