import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as math from 'mathjs';
import CollapseCard from './CollapseCard';
import LineChart from "./d3Components/LineChart";
import { useEffect, useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import * as d3 from "d3"

function validateInput(input: string): boolean {
    
    return false
}

const margin = {top: 10, right: 30, bottom: 30, left: 60};
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

export default function LagrangeInterpolationVisCard(){
    const basis_polynomials:  math.MathExpression = [];
    const basis_polynomials_s: string[] = []
    let linechart: any;
    const datasets: {
        label: string,
        data: {x: number, y: number}[]
    }[] = [];
    useEffect( () => {
        datasets.push({
            label: "kek",
            data: [{x: 0, y: 50}, {x: 150, y: 150}, {x: 300, y: 100}, {x: 450, y: 20}, {x: 600, y: 130}]
        })

        const data = d3.group(datasets, (value) => {
            return value.label
        })

        console.log(data)
        const svg = d3.select("#line-chart-box")
            .append("svg")
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .attr("viewBox", `0 0 ${height + margin.top + margin.bottom} ${width + margin.left + margin.right}`)
            .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`)
        const x: number[] = [];
        datasets[0].data.forEach(tuple => {
            x.push(tuple.x)
        })
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(x, (d) => d) as number])
            .range([0, width])

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).ticks(5))
            .attr("viewBox", `0 0 ${height + margin.top + margin.bottom} ${width + margin.left + margin.right}`)

        const y: number[] = [];
        datasets[0].data.forEach(tuple => {
            y.push(tuple.y);
        })

        const maxY: number = d3.max(y, (d) => d) as number

        const yScale = d3.scaleLinear()
            .domain([0, maxY + 10])
            .range([height, height - maxY - 10 - margin.top - margin.bottom])

        svg.append("g")
            .call(d3.axisLeft(yScale))
            .attr("viewBox", `0 0 ${height + margin.top + margin.bottom} ${width + margin.left + margin.right}`)

        const d: [number, number][] = datasets[0].data.map(values => {
            return [values.x, values.y]
        })
        svg.append("path")
            .datum(d)
            .attr("d", d3.line()
                .x(d => {return d[0]})
                .y(d => {return height - margin.top - d[1]})
            )
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("viewBox", `0 0 ${height + margin.top + margin.bottom} ${width + margin.left + margin.right}`);
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
                    So fett in Schwarz das Interpolationspolynom und in leichteren Farben die einzelnen Basispolynome.
                    Rechts dann die Formeln für die Basispolynome undso
                    <Box id="line-chart-box">

                    </Box>
                </Stack>
                }
            />
        </MathJax>
    )
}