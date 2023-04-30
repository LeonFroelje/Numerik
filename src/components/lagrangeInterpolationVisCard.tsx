import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as math from 'mathjs';
import CollapseCard from './CollapseCard';
import LineChart from "./d3Components/LineChart";
import { useEffect, useRef, useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import * as d3 from "d3"


function validateInput(input: string): boolean {
    
    return false
}

let height = 0;
const margin = {top: 20, right: 30, bottom: 60, left: 40};

const width = 700;
// const height = 400 * (lineChartViewportHeight / 100);

export default function LagrangeInterpolationVisCard(){
    const lineChartBox = useRef<HTMLDivElement>();
    const basis_polynomials:  math.MathExpression = [];
    const basis_polynomials_s: string[] = []
    let linechart: any;
    let datasets: {
        label: string,
        data: {x: number, y: number}[]
    }[] = [];
    useEffect( () => {
        if(window.innerWidth > 1100){
            height = 30 * window.innerHeight / 100;
        }
        else{
            height = 50 * window.innerHeight / 100 ;
        }
        if(lineChartBox && lineChartBox.current){
            lineChartBox.current.style.height = `${height}`;
            lineChartBox.current.style.maxHeight = `${height}`;
            if(! lineChartBox.current.hasChildNodes()){
                let sin = [];
                for(let i = 0; i < 2 * math.pi * 10000; i++){
                    sin.push({x: (i - 2 * math.pi * 5000) / 5000, y: math.sin((i - 2 * math.pi * 5000) / 5000)});
                }
                datasets.push({
                    label: "kek",
                    data: sin
                })

                const data = d3.group(datasets, (value) => {
                    return value.label
                })

                const svg = d3.select("#line-chart-box")
                    .append("svg")
                    .attr("viewBox", `0 0 ${width} ${height}`)
                    .append("g")
                        .attr("transform", `translate(${margin.left},${margin.top})`)

            
                const x: number[] = [];
                datasets[0].data.forEach(tuple => {
                    x.push(tuple.x)
                })

                console.log(d3.extent(x))
                const xScale = d3.scaleLinear()
                    .domain(d3.extent(x) as [number, number])
                    .range([margin.left, width - margin.right])
                    .nice()

                const y: number[] = [];
                datasets[0].data.forEach(tuple => {
                    y.push(tuple.y);
                })

                const yScale = d3.scaleLinear()
                    .domain(d3.extent(y) as [number, number])
                    .range([height - margin.bottom, margin.top])
                    .nice()

                

                svg.append("g")
                    // .style("color", "#999")
                    .style("opacity", "0.5")
                    .attr("transform", `translate(0,${height - margin.bottom + margin.top - yScale(0)})`)
                    .call(d3.axisBottom(xScale))
                
                let xMax = d3.max(x) as number;
                if(xMax >= 0){        
                    svg.append("g")
                        .style("opacity", "0.5")
                        .call(d3.axisLeft(yScale))
                        .attr("transform", `translate(${margin.left + width - margin.right - xScale(0)},0)`);
                }
                else{
                    svg.append("g")
                        .style("opacity", "0.5")
                        .call(d3.axisRight(yScale))
                        .attr("transform", `translate(${xScale(xMax)},0)`);
                }

                d3.selectAll(".tick")
                    .style("color", "#999")
                    .style("opacity", "0.5")
                    .style("font-size", "1rem")
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
                    .attr("stroke", "red")
                    .attr("stroke-width", 2)
                    .attr("fill", "none")
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