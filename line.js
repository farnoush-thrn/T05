// line.js
d3.csv("data/Ex5_ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        price: +d['Average Price (notTas-Snowy)']
    };
}).then(data => {
    data = data.filter(d => d.year > 0 && !isNaN(d.price));

    const margin = {top: 20, right: 30, bottom: 50, left: 60};
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 600 400`)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));
    svg.append("text").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height + 40).text("Year");

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.price)]).nice()
        .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
    svg.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("y", -45).attr("x", -height / 2).text("Price ($/MWh)");

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#ec4899")
        .attr("stroke-width", 2.5)
        .attr("d", d3.line()
            .x(d => x(d.year))
            .y(d => y(d.price))
        );
});