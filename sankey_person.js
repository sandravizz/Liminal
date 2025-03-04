// --------------------------------------
//  Margin and canvas
// --------------------------------------

const margin = { top: 40, right: 300, bottom: 10, left: 150 };
const width = 1300;
const height = 1000;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// SVG container
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("viewBox", `0, 0, ${width}, ${height}`);

// Append the group for the inner chart
const innerChart = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
//  Data loading
// --------------------------------------

const data = d3
  .csv("./data_sankey_person.csv", d3.autoType)
  .then(function (data) {
    // console.log("raw_data", data);

    // Empty array
    let links = [];

    // Pushing the data into the array, changing variable names and add index i
    data.map((d, i) => {
      links.push({
        target: d["investorName"],
        source: d["entityName"],
        value: d["roundSizeUsd"],
        round: d["round"],
        type: d["investorType"],
        id: i
      });
    });
    // console.log("links_1", links);

    // Creating the array, which stores the nodes based on the information from the links array
    // New set to keep unique values
    const nodes = Array.from(
      new Set(links.flatMap((d) => [d.source, d.target])),
      (name, id) => ({ name, id })
    );
    // console.log(nodes);

    // We want to change the string names to ids in the links, that are inline with the nodes.
    links.map((d) => {
      d.source = nodes.find((e) => e.name === d.source).id;
      d.target = nodes.find((e) => e.name === d.target).id;
    });
    // console.log("links_2", links);

    // Finally we create on object including the links and nodes array of objects
    let data_final = { nodes, links };
    // console.log("data final", data_final);

    // --------------------------------------
    //  Formating
    // --------------------------------------

    format = d3.format(".01s");

    // --------------------------------------
    //  Sankey
    // --------------------------------------

    const sankey = d3
      .sankey()
      .nodeSort((a, b) => b.value - a.value)
      .nodeAlign(d3.sankeyCenter)
      .nodeId((d) => d.id)
      .linkSort((a, b) => b.value - a.value)
      .nodeWidth(50)
      .nodePadding(2)
      .extent([[0, 0],[innerWidth, innerHeight],
      ]);

    // Checking sankey generator applied to data
    // console.log((sankey(data_final)));

    // --------------------------------------
    //  Scales
    // --------------------------------------

    const color = d3
       .scaleLinear()
       .domain(d3.extent(sankey(data_final).links, (d) => d.width))
       .range(["#3F0F92", "#BE8AFF"]);

       console.log(d3.extent(sankey(data_final).links, (d) => d.width));

    // --------------------------------------
    //  Data drawing
    // --------------------------------------

    // Nodes: rects
    innerChart
      .selectAll("sankey_rects")
      .data(sankey(data_final).nodes)
      .join("rect")
      .attr("class", "sankey_rects")
      .attr("x", (d) => (d.x0 > innerWidth / 2 ? d.x0 : d.x0))
      .attr("y", (d) => d.y0)
      .attr("height", (d) => Math.min(Math.max(0.4, d.y1 - d.y0), 300))
      .attr("width", (d) => (d.x0 > innerWidth / 2 ? 50 : 50))
      .attr("fill", (d) => (d.x0 > innerWidth / 2 ? "#8AFFF9" : "#caff8a"))
      .attr("opacity", 1)
      .on("mouseover", (e, d) => {
        d3.selectAll("path").style("opacity", (p) =>
          p.source.name === d.name || p.target.name === d.name ? "1" : "0.07"
        );
      })
      .on("mouseout", (e, d) => {
        d3.selectAll("path").style("opacity", 1);
      });

    // Nodes: text
    innerChart
      .append("g")
      .selectAll("text")
      .data(sankey(data_final).nodes)
      .join("text")
      .attr("x", (d) => (d.x0 < innerWidth / 2 ? d.x1 - 55 : d.x0 + 55))
      .attr("y", (d) => (d.y1 + d.y0) / 2)
      .attr("fill", (d) => (d.x0 > innerWidth / 2 ? "#3bf4fb" : "#caff8a"))
      .attr("dy", "0.4em")
      .attr("text-anchor", (d) => (d.x0 < innerWidth / 2 ? "end" : "start"))
      .attr("font-size", (d) => (d.y0 < innerHeight / 1.5 ? 9 : 5 ))
      .attr("font-weight", (d) => (d.x0 < innerWidth / 2 ? 400 : 400))
      .text((d) => d.name + "s")
      .append("tspan")
      .attr("fill-opacity", (d) => (d.x0 < innerWidth / 2 ? 0.6 : 0.6))
      .attr("font-weight", 500)
      .attr("font-size", (d) => (d.y0 < innerHeight / 1.5 ? 9 : 0 ))
      .text((d) => `  ${format(d.value)}`);

   //Links: path
    const link = innerChart
      .append("g")
      .attr("fill", "none")
      .selectAll("g")
      .data(sankey(data_final).links)
      .join("g");
  
    link
      .append("path")
      .attr("class", (d) => `trajectory_${d.id}`)
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("stroke", (d) => color(d.width))
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 0)
      .transition()
      .delay((d) => 1000 + d.id * 80)
      .duration(30)
      .attr("stroke-opacity", 1)
      .attr("stroke-width", (d) => Math.max(0.4, d.width));

  });
