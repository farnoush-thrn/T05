// bar.js
d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", d => {
    return {
        tech: d.Screen_Tech,
        energy: +d['Mean(Labelled energy consumption (kWh/year))']
    };
}).then(data => {
    const margin = {top: 20, right: 30, bottom: 50, left: 60};
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 600 400`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.tech))
        .padding(0.2);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
    svg.append("text").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height + 40).text("Screen Technology");

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy)]).nice()
        .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
    svg.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("y", -45).attr("x", -height / 2).text("Mean Energy Consumption (kWh)");

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.tech))
        .attr("y", d => y(d.energy))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.energy))
        .attr("fill", "#10b981");
});