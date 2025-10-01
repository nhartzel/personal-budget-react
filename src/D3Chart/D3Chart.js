import React, { useEffect, useRef } from 'react';

/* global d3 */ 

function D3Chart({ data }) {
  const chartContainer = useRef(null);
  const d3Props = useRef({}); 

  useEffect(() => {
    if (data && chartContainer.current) {
      const formattedData = data.map(item => ({
        label: item.title,
        value: item.budget
      }));

      if (!d3Props.current.svg) {
        setupChart();
      }
      change(formattedData);
    }
  }, [data]);

  const setupChart = () => {
    const element = chartContainer.current;
    const width = element.offsetWidth;
    const height = 200
    const radius = Math.min(width, height) / 2;
    const props = d3Props.current;
    
    props.radius = radius;
    props.pie = d3.layout.pie().sort(null).value(d => d.value);
    props.arc = d3.svg.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4);
    props.outerArc = d3.svg.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);
    props.svg = d3.select(element).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", `translate(${width / 2},${height / 2})`);
    props.svg.append("g").attr("class", "slices");
    props.svg.append("g").attr("class", "labels");
    props.svg.append("g").attr("class", "lines");
    props.key = d => d.data.label;
    props.color = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  };

  const change = (data) => {
    const props = d3Props.current;
    const midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2;

    /* ------- PIE SLICES -------*/
    const slice = props.svg.select(".slices").selectAll("path.slice")
      .data(props.pie(data), props.key);

    slice.enter()
      .insert("path")
      .style("fill", d => props.color(d.data.label))
      .attr("class", "slice");

    slice
      .transition().duration(1000)
      .attrTween("d", function (d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return t => props.arc(interpolate(t));
      });

    slice.exit().remove();

    /* ------- TEXT LABELS -------*/
    const text = props.svg.select(".labels").selectAll("text")
      .data(props.pie(data), props.key);
    
    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text(d => d.data.label);

    text.transition().duration(1000)
      .attrTween("transform", function (d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return t => {
          const d2 = interpolate(t);
          const pos = props.outerArc.centroid(d2);
          pos[0] = props.radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        };
      })
      .styleTween("text-anchor", function (d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return t => {
          const d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start" : "end";
        };
      });

    text.exit().remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/
    const polyline = props.svg.select(".lines").selectAll("polyline")
      .data(props.pie(data), props.key);
    
    polyline.enter()
      .append("polyline");

    polyline.transition().duration(1000)
      .attrTween("points", function (d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return t => {
          const d2 = interpolate(t);
          const pos = props.outerArc.centroid(d2);
          pos[0] = props.radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [props.arc.centroid(d2), props.outerArc.centroid(d2), pos];
        };
      });

    polyline.exit().remove();
  };

  return (
    <div className="d3-chart-container" ref={chartContainer}></div>
  );
}

export default D3Chart;