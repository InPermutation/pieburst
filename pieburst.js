function pieburst (selector, data, opts) {
    if(!opts) opts = {};

    function x(datum) { return datum[0]; }
    function y(datum) { return datum[1]; }

    var def = {
        r: 500,
        x: 250,
        y: 250
    };
    for(var key in def)
        opts[key] = key in opts ? opts[key] : def[key];
        
    var sumx = data.reduce(function(p,c){ return p+x(c); }, 0),
        maxy = data.reduce(function(p,c){ return Math.max(p, y(c)); }, 0);
    var theta = 0.0;
    var xScale = d3.scale.linear()
                    .domain([0, sumx])
                    .range([0, Math.PI * 2]);
    var yScale = d3.scale.linear()
                    .domain([0, maxy])
                    .range([0, opts.r/2]);

    return d3.select(selector)
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
