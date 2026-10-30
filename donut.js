// donut.js
d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", d => {
    return {
        tech: d.Screen_Tech,
        energy: +d['Mean(Labelled energy consumption (kWh/year))']
    };
}).then(data => {
    const width = 400, height = 400, margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.tech))
        .range(["#f59e0b", "#3b82f6", "#10b981", "#ef4444"]);

    const pie = d3.pie().value(d => d.energy).sort(null);
    const data_ready = pie(data);

    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius);

    svg.selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.tech))
        .attr("stroke", "white")
        .style("stroke-width", "2px");

    const arcLabels = d3.arc().innerRadius(radius * 0.7).outerRadius(radius * 0.7);
    svg.selectAll('allLabels')
        .data(data_ready)
        .join('text')
        .text(d => d.data.tech)
        .attr("transform", d => `translate(${arcLabels.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "white")
        .style("font-weight", "bold");
});