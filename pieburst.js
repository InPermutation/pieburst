function pieburst (selector, data, opts) {
    if(!opts) opts = {};

    function x(datum) { return datum[0]; }
    function y(datum) { return datum[1]; }

    var def = {
        r: 250,
        x: 250,
        y: 250,
        maxy: d3.max(data, y),
        sumx: d3.sum(data, x)
    };
    for(var key in def)
        opts[key] = key in opts ? opts[key] : def[key];
        
    var theta = 0.0;
    var xScale = d3.scale.linear()
                    .domain([0, opts.sumx])
                    .range([0, Math.PI * 2]);
    var yScale = d3.scale.linear()
                    .domain([0, opts.maxy])
                    .range([0, opts.r]);

    return d3.select(selector).append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr('d', d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(datum){ return yScale(y(datum)); })
            .startAngle(function(datum){ return theta; })
            .endAngle(function(datum){ return theta += xScale(x(datum)); })
        )
        .attr('transform', 'translate(' + opts.x + ',' + opts.y + ')')
}
