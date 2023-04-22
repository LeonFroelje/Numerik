import { Box, Paper, Slider, Stack, Typography } from "@mui/material";
import * as math from 'mathjs';
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
import { useState } from "react";
import Controlbuttons from "@/components/controlbuttons";
import CollapseCard from "@/components/CollapseCard";
import VerbesserterEulerVisCard from "@/components/verbesserterEulerVisCard";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const EPSILON = 0.000001


// f(y(t), t)
const verbesserter_euler = (f: math.EvalFunction, y_0: math.MathNumericType,
    h: number, I: Interval) => {
    const solution = [];
    let y_n = y_0;
    let n = 0;
    while ((I.a as number) + n * h <= (I.b as number) + EPSILON) {
        let x_n = n * h + (I.a as number);
        let y_n2 = (y_n as number) + (h / 2) * f.evaluate({
            x: x_n + h / 2,
            y: y_n
        })
        y_n = (y_n as number) + h * f.evaluate({
            x: x_n + h / 2,
            y: y_n2
        })
        solution.push({
            x: n * h + (I.a as number),
            y: y_n
        })
        n++
    }
    return solution;
}
const verbesserter_euler_sbs = (f: math.EvalFunction, y_n: math.MathNumericType,
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


export default function Eerbesserteseulerverfahren() {
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
        <Stack padding={"0rem .5rem"} flexDirection={"column"}
        alignSelf={"center"}
        width={"90vw"}
        gap={"1rem"}
        >
            <CollapseCard title="Erklärung" expanded={false} 
                cardContent={
                    <Typography>
                        askdjasjk
                    </Typography>
                }
            />

            <VerbesserterEulerVisCard/>
        </Stack>
    )
}