"use strict";

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
var w = 600;
var h = 250;
var barPadding = 1;
var maxValue = 50;

var xScale = d3.scale.ordinal()
                    .domain(d3.range(dataset.length))
                    .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset)])
                    .range([0, h]);

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr({
        x: function(d, i){ return xScale(i); },
        y: function(d){ return h - yScale(d); },
        width: xScale.rangeBand(),
        height: function(d){ return yScale(d); },
        fill: function(d){ return "rgb(0, 0, " + (d * 10) +")"; }
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return d;
    })
    .attr({
        x: function(d, i){ return xScale(i)  + xScale.rangeBand() / 2; },
        y: function(d){ return h - yScale(d) + 15; },
        "font-family": "sans-serif",
        "font-size": "14px",
        "font-weight": "bold",
        fill: "white",
        "text-anchor": "middle"
    });

d3.select("p")
    .on("click", function(){
        // Add new value to dataset
        var maxValue = 25;
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);

        // rescale X axis
        xScale.domain(d3.range(dataset.length));

        // Select bars of barchart
        var bars = svg.selectAll("rect")
            .data(dataset);

        // Create new bar out of range of svg
        bars.enter()
            .append("rect")
            .attr({
                x: w,
                y: function(d){ return h - yScale(d); },
                width: xScale.rangeBand(),
                height: function(d){ return yScale(d); },
                fill: function(d){ return "rgb(0, 0, " + (d * 10) + ")"; }
            });

        // Transition new bar into view
        bars.transition()
            .duration(500)
            .attr({
                x: function(d, i){ return xScale(i); },
                y: function(d){ return h - yScale(d); },
                width: xScale.rangeBand(),
                height: function(d){ return yScale(d); }
            });

        // Select all text elements
        var text = svg.selectAll("text")
            .data(dataset);

        // Create new text element out of view
        text.enter()
            .append("text")
            .attr({
                x: w,
                y: function(d){ return h - yScale(d) + 15; },
                "font-family": "sans-serif",
                "font-size": "14px",
                "font-weight": "bold",
                fill: "white",
                "text-anchor": "middle"
            });

        // Transition text element into view
        text.transition()
            .duration(500)
            .text(function(d){ return d; })
            .attr({
                x: function(d, i) {	return xScale(i) + xScale.rangeBand() / 2; },
                y: function(d){ return h - yScale(d) + 14; }
            });
        // // create new values for the dataset
        // var numValues = dataset.length;
        // dataset = [];
        // for (let i = 0; i < numValues; i++){
        //     dataset.push(Math.floor(Math.random() * maxValue) + 1);
        // }
        //
        // // update yScale based on highest number in new dataset
        // yScale.domain([0, d3.max(dataset)]);
        //
        // // update svg rect with new data values
        // svg.selectAll("rect")
        //     .data(dataset)
        //     .transition()
        //     .delay(function(d, i){
        //         return i/dataset.length * 1000;
        //     })
        //     .duration(500)
        //     .attr({
        //         y: function(d){
        //             console.log(d);
        //             return h - yScale(d); },
        //         height: function(d){ return yScale(d); },
        //         fill: function(d){ return "rgb(0, 0, " + d * 10 + ")"}
        //     });
        //
        // // update labels with new values
        // svg.selectAll("text")
        //     .data(dataset)
        //     .transition()
        //     .delay(function(d, i){
        //         return i / dataset.length * 1000;
        //     })
        //     .duration(500)
        //     .text(function(d){ return d; })
        //     .attr({
        //         y: function(d){ return h - yScale(d) + 14; }
        //     })
    });
