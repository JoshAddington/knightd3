"use strict";

var dataset = [ { key: 0, value: 5 },
                { key: 1, value: 10 },
                { key: 2, value: 13 },
                { key: 3, value: 19 },
                { key: 4, value: 21 },
                { key: 5, value: 25 },
                { key: 6, value: 22 },
                { key: 7, value: 18 },
                { key: 8, value: 15 },
                { key: 9, value: 13 },
                { key: 10, value: 11 },
                { key: 11, value: 12 },
                { key: 12, value: 15 },
                { key: 13, value: 20 },
                { key: 14, value: 18 },
                { key: 15, value: 17 },
                { key: 16, value: 16 },
                { key: 17, value: 18 },
                { key: 18, value: 23 },
                { key: 19, value: 25 } ];
var w = 600;
var h = 250;
var barPadding = 1;
var maxValue = 50;
var value = function(d){ return d.value; }
var key = function(d){ return d.key; }

var xScale = d3.scale.ordinal()
                    .domain(d3.range(dataset.length))
                    .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, value)])
                    .range([0, h]);

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect")
    .data(dataset, key)
    .enter()
    .append("rect")
    .attr({
        x: function(d, i){ return xScale(i); },
        y: function(d){ return h - yScale(d.value); },
        width: xScale.rangeBand(),
        height: function(d){ return yScale(d.value); },
        fill: function(d){ return "rgb(0, 0, " + (d.value * 10) +")"; }
    })
    .on("click", function(){
        sortBars();
    });


svg.selectAll("text")
    .data(dataset, key)
    .enter()
    .append("text")
    .text(value)
    .attr({
        x: function(d, i){ return xScale(i)  + xScale.rangeBand() / 2; },
        y: function(d){ return h - yScale(d.value) + 15; },
        "font-family": "sans-serif",
        "font-size": "14px",
        "font-weight": "bold",
        fill: "white",
        "text-anchor": "middle"
    });

d3.selectAll("p")
    .on("click", function(){
        var dataOperation = d3.select(this).attr("id");

        if (dataOperation === "add") {
            var maxValue = 25;
            var newNumber = Math.floor(Math.random()* maxValue);
            var lastKeyValue = dataset[dataset.length-1].key;
            console.log(lastKeyValue);
            dataset.push({
                key: lastKeyValue + 1,
                value: newNumber
            });
        } else {
            // Remove an entry from the dataset
            dataset.shift()
        }

        // rescale axes
        xScale.domain(d3.range(dataset.length));
        yScale.domain([0, d3.max(dataset, value)]);

        // Select bars of barchart
        var bars = svg.selectAll("rect")
            .data(dataset, key);

        // Create new bar out of range of svg
        bars.enter()
            .append("rect")
            .attr({
                x: w,
                y: function(d){ return h - yScale(d.value); },
                width: xScale.rangeBand(),
                height: function(d){ return yScale(d.value); },
                fill: function(d){ return "rgb(0, 0, " + (d.value * 10) + ")"; }
            });

        // Transition new bar into view
        bars.transition()
            .duration(500)
            .attr({
                x: function(d, i){ return xScale(i); },
                y: function(d){ return h - yScale(d.value); },
                width: xScale.rangeBand(),
                height: function(d){ return yScale(d.value); }
            });

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", -xScale.rangeBand())
            .remove();

        // Select all text elements
        var text = svg.selectAll("text")
            .data(dataset, key);

        // Create new text element out of view
        text.enter()
            .append("text")
            .attr({
                x: w,
                y: function(d){ return h - yScale(d.value) + 15; },
                "font-family": "sans-serif",
                "font-size": "14px",
                "font-weight": "bold",
                fill: "white",
                "text-anchor": "middle"
            });

        // Transition text element into view
        text.transition()
            .duration(500)
            .text(value)
            .attr({
                x: function(d, i) {	return xScale(i) + xScale.rangeBand() / 2; },
                y: function(d){ return h - yScale(d.value) + 14; }
            });

        text.exit()
            .transition()
            .duration(500)
            .attr("x", -xScale.rangeBand())
            .remove()
    });

    var sortBars = function() {

            svg.selectAll("rect")
               .sort(function(a, b) {
                     return d3.ascending(a.value, b.value);
               })
               .transition()
               .duration(1000)
               .attr("x", function(d, i) {
                     return xScale(i);
               });

    };
