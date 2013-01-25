function pieburst (selector, data, opts) {
    if(!opts) opts = {};

    function x(datum) { return datum[0]; }
    function y(datum) { return datum[1]; }

    var def = {
        w: 500,
        h: 500
    };
    for(var key in def)
        opts[key] = key in opts ? opts[key] : def[key];
        
    var sumx = data.reduce(function(p,c){ return p+x(c); }, 0),
        maxy = data.reduce(function(p,c){ return Math.max(p, y(c)); }, 0);
    var theta = 0.0;

    d3.select(selector).append("svg")
        .attr("width", opts.w)
        .attr("height", opts.h)
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr('d', d3.svg.arc()
            .innerRadius(0)
            .outerRadius(function(datum){ return y(datum) / maxy * opts.w/2})
            .startAngle(function(datum){ return theta; })
            .endAngle(function(datum){ return theta += (x(datum) / sumx * 2 * Math.PI); })
        )
        .attr('transform', 'translate(' + opts.w/2 + ',' + opts.h/2 + ')')
}
