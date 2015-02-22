var data = [
    {month: "JAN", value: 337980},
    {month: "FEB", value: 316641},
    {month: "MAR", value: 347803},
    {month: "APR", value: 337272},
    {month: "MAY", value: 345257},
    {month: "JUN", value: 346971},
    {month: "JUL", value: 368450},
    {month: "AUG", value: 359554},
    {month: "SEP", value: 361922},
    {month: "OCT", value: 347625},
    {month: "NOV", value: 320195},
    {month: "DEC", value: 340995}
  ];

var width = 960,
    height = 500;

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top -margin.bottom;

var x = d3.scale.ordinal()
    .domain(data.map(function(d) { return d.month; }))
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top +
        ")");

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);

chart.selectAll("bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("height", "10px")
    .attr("opacity", 0)
    .transition()
    .delay(function(d, i) { return i * 50; })
    .duration(25)
    .attr("title", function(d) { return d.value; })
    .attr("x", function(d) { return x(d.month); })
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .attr("opacity", 1)
    .attr("width", x.rangeBand());
