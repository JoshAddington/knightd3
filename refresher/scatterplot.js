"use strict";

var w = 600;
var h = 300;
var padding = 30;
var formatAsPercentage = d3.format(".1%");
var dataset = [];
var numDataPoints = 50;
var maxRange = Math.random() * 1000;
for (let i = 0; i < numDataPoints; i++){
    var newNumber1 = Math.floor(Math.random() * maxRange);
    var newNumber2 = Math.floor(Math.random() * maxRange);
    dataset.push([newNumber1, newNumber2]);
}

// Create scales for plot
var xScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d){ return d[0]; })])
                     .range([padding, w - padding]);

var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d){ return d[1]; })])
                     .range([h - padding, padding]);

// Create the axes
var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .ticks(5)

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5)

var svg = d3.select("body")
            .append("svg")
            .attr({
                width: w,
                height: h
            });

// Plot scatterplot
svg.append("g")
    .attr({
        "id": "circles",
        "clip-path": "url(#chart-area)"
    })
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr({
        cx: function(d){ return xScale(d[0]); },
        cy: function(d){ return yScale(d[1]); },
        r:  2
    });

// call X axis
svg.append("g")
    .attr({
        "class": "x axis",
        "transform": "translate(0, " + (h - padding) + ")"
    })
    .call(xAxis);

// call Y axis
svg.append("g")
    .attr({
        "class": "y axis",
        "transform": "translate(" + padding + ", 0)"
    })
    .call(yAxis);

// update dataset with random values on <p> tag click
d3.select("p")
    .on("click", function(){
        dataset = [];
        for (let i = 0; i < numDataPoints; i++){
            let numPair = [];
            numPair[0] = Math.floor(Math.random() * maxRange);
            numPair[1] = Math.floor(Math.random() * maxRange);
            dataset.push(numPair);
        }

        xScale.domain([0, d3.max(dataset, function(d){ return d[0]; })]);
        yScale.domain([0, d3.max(dataset, function(d){ return d[1]; })]);

        svg.append("clipPath")
            .attr("id", "chart-area")
            .append("rect")
            .attr({
                x: padding,
                y: padding,
                width: w - padding * 3,
                height: h - padding * 2
            });

        svg.selectAll("circle")
            .data(dataset)
            .transition()
            .duration(1000)
            .each("start", function(){
                d3.select(this)
                    .attr({
                        fill: "magenta",
                        r: 3
                    })
            })
            .attr({
                cx: function(d){ return xScale(d[0]); },
                cy: function(d){ return yScale(d[1]); },
                r: 2
            })
            .transition()
            .duration(1000)
            .attr({
                fill: "black",
                r: 2
            });

        svg.select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);

        svg.select(".y.axis")
            .transition()
            .duration(1000)
            .call(yAxis);
    })
