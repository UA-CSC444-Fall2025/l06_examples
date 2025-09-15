// 
// l06.js
// Example Code from CSC 444, Lecture 06, Fall 2025
// Joshua A. Levine <josh@arizona.edu>
//
// This file is refactored from L05 to use a data join rather than just
// creating random values for circle y coordinates
//


//basic selection operations to get the div and create an svg element

let div1 = d3.select("#div1")

let svg = div1.append("svg")

svg.attr("width", 500)
svg.attr("height", 500)


// Instead of creating 10 circles, let's first create an array of data
let dataArray1 = []
for (let i=0; i<10; i++) {
  dataArray1[i] = Math.random()*500;
}

// Main data join, set x values relative to index and y values relative to data
svg.selectAll("circle")
  .data(dataArray1)
     .enter()
     .append("circle")
     .attr("cx", function(d,i) { return i*50; })
     .attr("cy", function(d) { return d; })
     .attr("r", 10)
     .style("fill", "green")
     .style("stroke", d3.rgb(0,0,0))


//Second data array, note that it is shorter
let dataArray2 = [250,250,250,250,250]

//Second data bind
let updated_circles = d3.selectAll("circle")
  .data(dataArray2)

//First remove all circles that are unbound
updated_circles
  .exit()
  .transition()
  .duration(1000)
  .remove()

//Next update the cy position relative to dataArray2 and enlarge their radius
updated_circles
  .transition()
  .duration(5000)
  .delay(1000)
  .attr('r', 30)
  .attr("cy", d => d)



