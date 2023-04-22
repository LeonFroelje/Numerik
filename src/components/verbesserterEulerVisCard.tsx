import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Controlbuttons from './controlbuttons';
import Slider from '@mui/material/Slider';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    plugins,
} from 'chart.js';
import * as math from 'mathjs';
import { Line } from "react-chartjs-2";
import { useState } from "react";
import CollapseCard from './CollapseCard';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);


const verbesserter_euler = (f: math.EvalFunction, y_n: math.MathNumericType,
    t_n: number, h: number): { x: number, y: math.MathNumericType } => {

    let y_n2 = (y_n as number) + (h / 2) * f.evaluate({
        x: t_n + h / 2,
        y: y_n
    })
    y_n = (y_n as number) + h * f.evaluate({
        x: t_n + h / 2,
        y: y_n2
    })
    return {
        x: t_n,
        y: y_n
    }
}


export default function VerbesserterEulerVisCard(){
    // Anfangswert
    const [t_n, setT_n] = useState(0);
    const [max, setMax] = useState(100);
    // ODE
    const [odeString, setOdeString] = useState("((1/2) - y) * (4 / 2) * (- log(1 - (y / 0.5)))^(1 - (1/4))");
    const [ode, setOde] = useState(math.compile(odeString));
    // h
    const [increment, setIncrement] = useState(0.01);
    const [started, setStarted] = useState(false);
    const [solution, setSolution] = useState<{ x: number, y: math.MathNumericType }[]>([{
        x: t_n,
        y: 1/4
    }]);
    const datasets = [{
        label: `Lösung zu y' = ${odeString}`,
        data: solution.map(sol => {
            return {
                x: sol.x.toFixed(2),
                y: sol.y
            }
        })
    }]

    return (
    <CollapseCard title='Visualisierung' expanded={true}
        cardContent={
            <Stack flexDirection={"column"} justifyContent={"center"} gap={".5rem"}>
            <Box alignSelf={"center"}>
                <Controlbuttons started={started} setStarted={setStarted} setNext={() => {
                    const prevValue = solution[solution.length - 1]
                    const nextValue = verbesserter_euler(ode, prevValue.y, t_n + increment,
                        increment)
                    setSolution([...solution, nextValue])
                    setT_n(t_n + increment);
                    if(solution.length + 1 >= max){
                        setMax(2*max)
                    }
                }} setPrev={() => {
                    if(solution.length > 1){
                        setSolution([...solution].slice(0, solution.length - 1))
                        setT_n(t_n - increment);
                    }    
                }} />
            </Box>
            {
                started ?
                <Box padding={".5rem 0rem"} width={"85vw"} alignSelf={"center"}>
                    <Slider value={solution.length} min={1} max={max} 
                    onChange={(event: Event, newValue: number | number[]) => {
                        if((newValue as number) > solution.length){
                            // calc next solution step
                            const prevValue = solution[solution.length - 1]
                            const nextValue = verbesserter_euler(ode, prevValue.y, t_n + increment,
                                increment)
                            setSolution([...solution, nextValue])
                            setT_n(t_n + increment);
                            if(solution.length + 1 >= max){
                                setMax(2*max)
                            }
                        }
                        else if((newValue as number) < solution.length){
                            let n = solution.length - (newValue as number);
                            setSolution([...solution].slice(0, solution.length - n))
                            setT_n(t_n - n * increment);
                        }
                    }}/>
                </Box>  
                : ""
            }  

            <Box width={"90vw"} alignSelf={"center"} height={"45vh"} display={"flex"} justifyContent={"center"}>
                <Line
                width={"100%"}
                    data={{
                        datasets: datasets
                    }}
                    options={{
                        maintainAspectRatio: false,
                        elements: {
                            point: {
                                backgroundColor: "red"
                            },
                            line: {
                                backgroundColor: "red",
                                borderColor: "red"
                            }
                        }
                    }}
                />
            </Box>
        </Stack>
        }
    />
    )
}