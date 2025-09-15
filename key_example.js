////////////////////////////////////////////////////////////////
//
// d3 examples of using keys, and then updating based on 
// rebinding to a different data array
//
// Author: Joshua Levine
// Date: Sept. 15, 2025
//
////////////////////////////////////////////////////////////////

// Data array with keys
let dataArray1 = [
  {month: "jan", count: 2},
  {month: "feb", count: 3},
  {month: "mar", count: 5},
  {month: "apr", count: 7},
  {month: "may", count: 11},
  {month: "jun", count: 13},
  {month: "jul", count: 17},
  {month: "aug", count: 19},
  {month: "sep", count: 23},
  {month: "oct", count: 29},
  {month: "nov", count: 31},
  {month: "dec", count: 37}
]

// Add and initialize the svg element
let svg = d3.select("#div1")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400)
  //these two lines append a group and invert the y-axis
  .append("g")
  .attr("transform", "translate(0 400) scale(1 -1)")

// Create rectangles where we set the height of the rectangle relative to the
// data value.  IMPORTANTLY, use keys to map the data entries
svg.selectAll("rect")
   //The "d => d.month" says to key the data off of the month attribute
   .data(dataArray1, d => d.month)
   .enter()
   .append("rect")
   .attr("x", (d,i) => 40 + 30*i)
   .attr("y", 0)
   .attr("width", 25)
   .attr("height", (d) => d.count*10)
   .style("fill", "green")

// New data array, only has values defined for Fall months
let dataArray2 = [
  {month: "sep", count: 10},
  {month: "oct", count: 11},
  {month: "nov", count: 12},
]

// Update the heights of bars in the new months, due to the use of keys this
// updates the Fall months rather than the first three.
svg.selectAll("rect")
   .data(dataArray2, d => d.month)
   .transition()
   .duration(3000)
   .attr("height", (d) => d.count*10)
   
