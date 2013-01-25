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

    return d3.select(selector)
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr('d', d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(datum){ return y(datum) / maxy * opts.r/2})
            .startAngle(function(datum){ return theta; })
            .endAngle(function(datum){ return theta += (x(datum) / sumx * 2 * Math.PI); })
        )
        .attr('transform', 'translate(' + opts.x + ',' + opts.y + ')')
}
