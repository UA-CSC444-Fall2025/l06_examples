////////////////////////////////////////////////////////////////
//
// Refactoring d3 examples of using keys so that it uses .call for repeated
// attribute updates and scales to control the mapping from data to attributes
//
// Author: Joshua Levine
// Date: Sept. 17, 2025
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

let svg_width = 400
let svg_height = 400
let padding = 40

// Add and initialize the svg element
let svg = d3.select("#div1")
  .append("svg")
  .attr("width", svg_width)
  .attr("height", svg_height)
  //these two lines append a group and invert the y-axis
  .append("g")
  .attr("transform", "translate(0 400) scale(1 -1)")


//scale that works for maping from index to x position
let xScale = d3.scaleLinear()
               .domain([0,11])
               .range([padding,svg_width-padding])

//scale for mapping from count values to bar height
let heightScale = d3.scaleLinear()
                    .domain([d3.min(dataArray1, d => d.count),
                             d3.max(dataArray1, d => d.count)])
                    .range([20,370])


//this bit of code builds a scale that uses the month attribute to set x position
let months = dataArray1.map(d => d.month)
//note the scalePoint() being used instead of scaleLinear()
let xScaleMonth = d3.scalePoint()
                    .domain(months)
                    .range([padding,svg_width-padding])
                    

//function to call to set attributes of rectangles
function setAttrs(selection) {
  selection
   //.attr("x", (d,i) => 40 + 30*i)
   //.attr("x", (d,i) => xScale(i))
   .attr("x", (d) => xScaleMonth(d.month))
   .attr("y", 0)
   .attr("width", 25)
   //.attr("height", (d) => d.count*10)
   .attr("height", (d) => heightScale(d.count))
   .style("fill", "green")
}



// Create rectangles where we set the height of the rectangle relative to the
// data value.  IMPORTANTLY, use keys to map the data entries
svg.selectAll("rect")
   //The "d => d.month" says to key the data off of the month attribute
   .data(dataArray1, d => d.month)
   .enter()
   .append("rect")
   .call(setAttrs)

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
   .call(setAttrs)
   
