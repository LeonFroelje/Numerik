import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as math from 'mathjs';
import CollapseCard from './CollapseCard';
import { useEffect, useRef, useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import * as d3 from "d3"


const smallScreenThreshold = 1024;
const tabletWidthThreshold = 768; 
const mobileWidthThreshold = 480;

function validateInput(input: string): boolean {
    
    return false
}
/**
 * 
 * @returns Array with x-offset at index 0 and y-offset at index 1
 */
function calcAxisTranslation(xScale: d3.ScaleLinear<number, number>, yScale: d3.ScaleLinear<number, number>,
     xExtend: [number, number], yExtend: [number, number]): 
    {
        xAxisTranslation: [number, number],
        yAxisTranslation: [number, number]
    }
{
    const [xMin, xMax] = xExtend;
    const [yMin, yMax] = yExtend;
    const translations: {
        xAxisTranslation: [number, number],
        yAxisTranslation: [number, number]
    } = {
        xAxisTranslation: [0,0],
        yAxisTranslation: [0,0],
    };

    // xMin >= 0 => xMax >= 0 thus y-axis only has to be shifted to the min Value of the domain
    if(xMin >= 0){
        translations.yAxisTranslation = [xScale(xMin), 0];
    }
    // xMin < 0 and xMax >= 0 => 0 \in [xMin, xMax] => shift y-axis to the point where x=0
    else if(xMin < 0 && xMax >= 0){
        translations.yAxisTranslation = [xScale(0), 0];
    }
    // xMin < xMax < 0 => shift y-axis to the max of the domain
    else if(xMin < 0 && xMax < 0){
        translations.yAxisTranslation = [xScale(xMax), 0];
    }

    if(yMin >= 0){
        translations.xAxisTranslation = [0, yScale(yMin)];
    }
    else if(yMin < 0 && yMax >= 0){
        translations.xAxisTranslation = [0, yScale(0)];
    }
    else if(yMin < 0 && yMax < 0){
        translations.xAxisTranslation = [0, yScale(yMax)];
    }
    return translations;
}

let height = 0;
const margin = {top: 20, right: 30, bottom: 60, left: 40};

const width = 700;
// const height = 400 * (lineChartViewportHeight / 100);

export default function LagrangeInterpolationVisCard(){
    const lineChartBox = useRef<HTMLDivElement>();
    const basis_polynomials:  math.MathExpression = [];
    const basis_polynomials_s: string[] = []
    const [lel, setLel] = useState(0);
    let datasets: {
        label: string,
        data: {x: number, y: number}[]
    }[] = [];
    // let dsets: = 
    useEffect( () => {
        // Window resizing viewbox stuff, if not done the chart is way too big 
        // on normal desktops and way too small on smaller ones
        if(window.innerWidth > 1100){
            height = 30 * window.innerHeight / 100;
        }
        else{
            height = 50 * window.innerHeight / 100 ;
        }
        // the lineChartBox has to be rendered already
        if(lineChartBox && lineChartBox.current){
            // get Height
            lineChartBox.current.style.height = `${height}`;
            lineChartBox.current.style.maxHeight = `${height}`;
            // Only append svg if there isn't a chart already
            if(! lineChartBox.current.hasChildNodes()){
                const styles = {
                    axes: {
                        opacity: "0.5",
                    },
                    ticks: {
                        color: "#999",
                        opacity: "0.5",
                        fontSize: window.innerWidth > 1100 ? "default" : "1.2rem"
                    },
                    lines: {
                        stroke: "red",
                        strokeWidth: 3,
                        fill: "none"
                    }
                }
                // calculate domain and range
                let range: number[] = [];
                let domain: number[] = [];
                let graph:{x: number, y: number}[] = [];
                for(let i = -100; i <= 100; i++){
                    graph.push({x: 2 * math.pi * i / 100, y: math.sin(2 * math.pi * i / 100 + 1)});
                }
                datasets.push({
                    label: "kek",
                    data: graph
                })

                // create svg container and set the viewBox to the calculated width and height
                const svg = d3.select("#line-chart-box")
                    .append("svg")
                    .attr("viewBox", `0 0 ${width} ${height}`)

                // create a group that contains the chart
                svg
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                
                
                datasets[0].data.forEach(tuple => {
                    domain.push(tuple.x)
                })

                console.log(d3.extent(domain))
                let domainExtent = d3.extent(domain) as [number, number];
                let xMax = domainExtent[1];
                let xMin = domainExtent[0];
                
                const xScale = d3.scaleLinear()
                    .domain(domainExtent)
                    .range([margin.left, width - margin.right])
                    // .nice()

                datasets[0].data.forEach(tuple => {
                    range.push(tuple.y);
                })

                let rangeExtent = d3.extent(range) as [number, number];
                let yMin = rangeExtent[0];
                let yMax = rangeExtent[1];
                const yScale = d3.scaleLinear()
                    .domain(rangeExtent)
                    .range([height - margin.bottom, margin.top])
                    // .nice()

                let {xAxisTranslation, yAxisTranslation} = calcAxisTranslation(xScale, yScale, domainExtent, rangeExtent);

                let yAxis = svg.append("g")
                    .style("opacity", styles.axes.opacity)
                    .attr("transform", `translate(${yAxisTranslation[0]},${yAxisTranslation[1]})`)
                    .call(d3.axisLeft(yScale));

                let xAxis = svg.append("g")
                    .style("opacity", styles.axes.opacity)
                    .attr("transform", `translate(${xAxisTranslation[0]},${xAxisTranslation[1]})`)
                    .call(d3.axisBottom(xScale));

                // style ticks
                d3.selectAll(".tick")
                    .style("color", styles.ticks.color)
                    .style("opacity", styles.ticks.opacity)
                    .style("font-size", styles.ticks.fontSize)
                    // remove ticks at 0 because they are redundant
                    .filter((tick) => {
                        return tick === 0
                    })
                    .remove()


                const d: [number, number][] = datasets[0].data.map(values => {
                    return [values.x, values.y]
                })
                svg.append("path")
                    .datum(d)
                    .attr("d", d3.line()
                        .x(d => {return xScale(d[0])})
                        .y(d => {return yScale(d[1])})
                    )
                    .attr("stroke", styles.lines.stroke)
                    .attr("stroke-width", styles.lines.strokeWidth)
                    .attr("fill", styles.lines.fill)
            }
            else{
                d3.select("#line-chart-box").selectAll("svg").remove()
                setLel(lel + 1);
            }
        }
    })

    return (
        <MathJax>
            <CollapseCard title='Visualisierung' expanded={true}
            cardContent={
                <Stack flexDirection={"column"} justifyContent={"center"} gap={".5rem"}>
                    <Box id="input-box" alignSelf={"center"}>
                        <TextField  label={"Stützstellen \\((x_i, y_i)\\)"} placeholder={"(x, y)"}
                         onChange={(event) => {
                            console.log(event.currentTarget.value);

                         }}
                        />
                            
                    </Box>
                    <Box id="line-chart-box" ref={lineChartBox} >
                    </Box>
                </Stack>
                }
            />
        </MathJax>
    )
}