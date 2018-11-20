// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svgWidth - margin.left - margin.right; // use "." to reference an attribute of an object; margin.left refers to the "left" attribute of the "margin" variable
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins. // shift the "g" tag by the left and top margins
// =================================
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("class", "chart");
    //.style.textAlign="center";

// Append an SVG group
var chartGroup = svg.append("g");
    //.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Append another div to the body to create tooltips and assign it a class
d3.select(".chart")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Step 3:
// Import data from the data.csv file and sort it into a scatter plot
// =================================
// load data file
// d3.csv("../data/data.csv", function(error, fileData) {
    // if (error) throw error;
    
    // // fileData.forEach(function(data) {
        // // functionID = data.id;
        // // functionState = data.state;
        // // functionAbbr = data.abbr;
        // // functionPoverty = data.poverty;
        // // functionPovertyMoe = data.povertyMoe;
        // // functionAge = data.age;
        // // functionageMoe = data.ageMoe;
        // // functionIncome = data.income;
        // // functionIncomeMoe = data.incomeMoe;
        // // functionHealthcare = data.healthcare;
        // // functionhealthcareLow = data.healthcareLow;
        // // functionhealthcareHigh = data.healthcareHigh;
        // // functionObesity = data.obesity;
        // // functionObesityLow = data.obesityLow;
        // // functionObesityHigh = data.obesityHigh;
        // // functionSmokes = data.smokes;
        // // functionSmokesLow = data.smokesLow;
        // // functionSmokesHigh = data.smokesHigh
        // // console.log(functionID);
    // for (var i = 0; i < fileData.length; i++){
        // // console.log(data.abbr);
        // console.log(fileData[i].abbr)
    // }
    // });
d3.csv("data.csv", function(error, fileData) {
    if (error) throw error;

    fileData.forEach(function(data) {
        data.poverty =+ data.poverty;
        data.healthcare =+ data.healthcare;
        data.abbr = data.abbr;
        data.state = data.state;
        // console.log(data.poverty);
        // console.log(data.healthcare);
        // console.log(data.state);
    });

// Create the scale variables
    var xLinearScale = d3.scaleLinear()
        .range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .range([height, 0]);
    // console.log(yLinearScale);

    // Create the axis variables
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Scale the axes
    function scaleAxisRange(columnData) {
        minXvalue = d3.min(fileData, function(data) {
            return +data[columnData]-1; // subtracted 1 so labels wouldn't be on the y-axis
        });
        maxXvalue =  d3.max(fileData, function(data) {
            return +data[columnData]; 
        });
        maxYvalue = d3.max(fileData, function(data) {
            return +data.healthcare;
        });
    }
    
    // Call scaleAxisRange() with the data attribute 'poverty'
    var xAxisData = "poverty";
    scaleAxisRange(xAxisData);

    // Set the domain of the axes to extend from the minimum to the maximum value of the poverty and healthcare data columns
    xLinearScale.domain([minXvalue, maxXvalue]);
    yLinearScale.domain([0, maxYvalue]);
  
    // Create the tooltip that pops up when the user mouses over the scatter data point
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .html(function(data) {
            var state = data.state;
            var healthcare = +data.healthcare;
            var poverty = +data.poverty;
        return ("<b>" + state + "</b>" + "<br> Population In Poverty: " + poverty + "%<br> Population Lacking Healthcare: " + healthcare + "%");
        });
  
    chartGroup.call(toolTip);

    // Append the SVG group for the x-axis and display the x-axis
    chartGroup.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(bottomAxis);

    // Append a group for the y-axis and display the y-axis
    chartGroup.append("g")
        .call(leftAxis);

    // Append the y-axis label
    chartGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height/2) //centers the y-axis label vertically so it is halfway between the top and bottom of the chart
        .attr("dy", "1em") // offsets the label by a distance of 1 element (em) length
        .attr("data-axis-name", "healthcare")
        .attr("class", "axis-text")
        .text("Lacks Healthcare (%)")
        .attr("class", "active"); // needs to be after .text
        //.style("fontWeight", "bold");

    // Append x-axis labels
    chartGroup
        .append("text")
        .attr("transform","translate(" + width / 2 + " ," + (height + margin.top + 20) + ")")
        .attr("data-axis-name", "poverty")
        .text("In Poverty (%)")
        .attr("class", "active"); // needs to be after .text

    var circles = chartGroup.selectAll(".state")
        .data(fileData)
        .enter()
    
    // for the scatter points
    circles
        .append("circle")
        .attr("class", "state")  
        .attr("r", "15")
        .style("fill","orange") 
        .style("opacity", .8)
        .style("stroke-width", ".25")
        .attr("cx", function(data, index) {
            return xLinearScale(+data[xAxisData]);
        })
        .attr("cy", function(data, index) {
            return yLinearScale(data.healthcare);
        });
    
    // for the text box for corresponding scatter point
    circles
        .append("text")
        .attr("class", "stateCircle")
        .attr("class", "inactive:hover")
        //.attr("class", "active")
        .attr("x", function(data, index) {
            return xLinearScale(+data[xAxisData]- 0.135); // center state abbreviation horizontally within the scatter point
        })
        .attr("y", function(data, index) {
            return yLinearScale(data.healthcare - 0.15); // center state abbreviation vertically within the scatter point
        })
        .text(function(data){
            return data.abbr;
        })
        // shows data when user moves mouse over the scatter point
        .on("mouseover", function(data) {
            toolTip.show(data)
        })
        // hides data when user moves mouse off the scatter point
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });         
});

    