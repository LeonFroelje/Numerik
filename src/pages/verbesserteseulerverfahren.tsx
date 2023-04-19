import { Paper, Stack } from "@mui/material";
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
import { Line } from "react-chartjs-2";
import { useState } from "react";
import Controlbuttons from "@/components/controlbuttons";
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


export default function verbesserteseulerverfahren() {
    // Anfangswert
    const [t_n, setT_n] = useState(0);
    const [stopValue, setStopValue] = useState(1.9);
    // ODE
    const [odeString, setOdeString] = useState("((1/2) - y) * (4 / 2) * (- log(1 - (y / 0.5)))^(1 - (1/4))");
    const [ode, setOde] = useState(math.compile(odeString));
    // h
    const [increment, setIncrement] = useState(0.01);
    const [started, setStarted] = useState(false);
    const [solution, setSolution] = useState<{ x: number, y: math.MathNumericType }[]>([{
        x: t_n,
        y: 1 / 4
    }]);
    const datasets = [{
        label: `Approximierte Lösung zu ${odeString}`,
        data: solution.map(sol => {
            return {
                x: sol.x.toFixed(2),
                y: sol.y
            }
        })
    }]
    return (
        <Paper>
            <Stack>
                <Stack flexDirection={"row"} justifyContent={"center"}>
                    <Controlbuttons started={started} setStarted={setStarted} setNext={() => {
                        const prevValue = solution[solution.length - 1]
                        const nextValue = verbesserter_euler_sbs(ode, prevValue.y, t_n + increment,
                            increment)
                        setSolution([...solution, nextValue])
                        setT_n(t_n + increment);
                        console.log(solution)
                    }} setPrev={() => { }} />
                </Stack>

                <div style={{ height: "100vh" }}>
                    <Line
                        data={{
                            datasets: datasets
                        }}
                        options={{

                            plugins: {
                                //   autocolors: {
                                //     enabled: true,
                                //   }
                                legend: {
                                    maxHeight: 30,
                                    maxWidth: 1000000,
                                    fullSize: false,
                                    labels: {
                                    }
                                }
                            },
                            // responsive: true,
                        }}
                        height={"1000px"}
                        width={"1000px"}
                    />
                </div>
            </Stack>
        </Paper>
    )
}