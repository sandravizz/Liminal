import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, sankeyCenter } from 'd3-sankey';

const Sankey_person = () => {
    const chartRef = useRef();

    // Margin and canvas
    const margin = { top: 40, right: 300, bottom: 10, left: 150 };
    const width = 1300;
    const height = 1000;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        // Clear previous chart
        d3.select(chartRef.current).selectAll("*").remove();

        // SVG container
        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("viewBox", `0, 0, ${width}, ${height}`);

        // Append the group for the inner chart
        const innerChart = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Data loading
        d3.csv("./data/data_sankey_person.csv", d3.autoType)
            .then(function (data) {
                // Empty array
                let links = [];

                // Pushing the data into the array, changing variable names and add index i
                data.map((d, i) => {
                    links.push({
                        target: d["investorName"],
                        source: d["entityName"],
                        value: d["roundSizeUsd"],
                        id: i
                    });
                });

                // Creating nodes array from unique values in links
                const nodes = Array.from(
                    new Set(links.flatMap((d) => [d.source, d.target])),
                    (name, id) => ({ name, id })
                );

                // Change string names to ids in links
                links.map((d) => {
                    d.source = nodes.find((e) => e.name === d.source).id;
                    d.target = nodes.find((e) => e.name === d.target).id;
                });

                // Create final data object
                let data_final = { nodes, links };

                // Format for numbers
                const format = d3.format(".01s");

                // Sankey generator
                const sankeyGenerator = sankey()
                    .nodeSort((a, b) => b.value - a.value)
                    .nodeAlign(sankeyCenter)
                    .nodeId((d) => d.id)
                    .linkSort((a, b) => b.value - a.value)
                    .nodeWidth(50)
                    .nodePadding(2)
                    .extent([[0, 0], [innerWidth, innerHeight]]);

                // Color scale
                const color = d3.scaleLinear()
                    .domain(d3.extent(sankeyGenerator(data_final).links, (d) => d.width))
                    .range(["#3F0F92", "#BE8AFF"]);

                // Draw nodes: rectangles
                innerChart
                    .selectAll("rect")
                    .data(sankeyGenerator(data_final).nodes)
                    .join("rect")
                    .attr("x", (d) => d.x0)
                    .attr("y", (d) => d.y0)
                    .attr("height", (d) => Math.min(Math.max(0.4, d.y1 - d.y0), 300))
                    .attr("width", 50)
                    .attr("fill", (d) => (d.x0 > innerWidth / 2 ? "#8AFFF9" : "#caff8a"))
                    .attr("opacity", 1)
                    .on("mouseover", (e, d) => {
                        d3.selectAll("path").style("opacity", (p) =>
                            p.source.name === d.name || p.target.name === d.name ? "1" : "0.07"
                        );
                    })
                    .on("mouseout", () => {
                        d3.selectAll("path").style("opacity", 1);
                    });

                // Draw nodes: text
                innerChart
                    .append("g")
                    .selectAll("text")
                    .data(sankeyGenerator(data_final).nodes)
                    .join("text")
                    .attr("x", (d) => (d.x0 < innerWidth / 2 ? d.x1 - 55 : d.x0 + 55))
                    .attr("y", (d) => (d.y1 + d.y0) / 2)
                    .attr("fill", (d) => (d.x0 > innerWidth / 2 ? "#3bf4fb" : "#caff8a"))
                    .attr("dy", "0.4em")
                    .attr("text-anchor", (d) => (d.x0 < innerWidth / 2 ? "end" : "start"))
                    .attr("font-size", (d) => (d.y0 < innerHeight / 2 ? 12 : 8))
                    .text((d) => d.name)
                    .append("tspan")
                    .attr("fill-opacity", 0.6)
                    .attr("font-weight", 500)
                    .attr("font-size", (d) => (d.y0 < innerHeight / 2 ? 9 : 6))
                    .text((d) => ` ${format(d.value)}`);

                // Draw links
                const link = innerChart
                    .append("g")
                    .attr("fill", "none")
                    .selectAll("g")
                    .data(sankeyGenerator(data_final).links)
                    .join("g");

                link.append("path")
                    .attr("class", (d) => `trajectory_${d.id}`)
                    .attr("d", sankeyLinkHorizontal())
                    .attr("stroke", (d) => color(d.width))
                    .attr("stroke-opacity", 1)
                    .attr("stroke-width", 0)
                    .transition()
                    .delay((d) => 1000 + d.id * 80)
                    .duration(30)
                    .attr("stroke-opacity", 1)
                    .attr("stroke-width", (d) => Math.max(0.4, d.width));
            });
    }, []);

    return <div class="oursvg" ref={chartRef}></div>;
};

export default Sankey_person;
