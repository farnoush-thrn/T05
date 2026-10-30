// scatter.js
d3.csv("data/Ex5_TV_energy.csv", d => {
    return {
        star: +d.star2,
        energy: +d.energy_consumpt
    };
}).then(data => {

    data = data.filter(d => d.star > 0 && d.energy > 0);

    const margin = {top: 20, right: 30, bottom: 50, left: 60};
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#scatter-chart")
        .append("svg")
        .attr("viewBox", `0 0 600 400`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.star)).nice()
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
    
    svg.append("text").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height + 40).text("Star Rating");

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy)]).nice()
        .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
    
    svg.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("y", -45).attr("x", -height / 2).text("Energy Consumption (kWh)");

    svg.append('g')
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.star))
        .attr("cy", d => y(d.energy))
        .attr("r", 4)
        .style("fill", "#3b82f6")
        .style("opacity", 0.6);
});