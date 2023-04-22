import { Box, Card, Divider, Paper, Slider, Stack, Typography } from "@mui/material";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
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
import Controlbuttons from "@/components/controlbuttons";
import { Line } from "react-chartjs-2";
import { useState } from "react";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
import { MathJax, MathJaxBaseContext } from "better-react-mathjax";
import EulerVisCard from "@/components/eulerVisCard";
import ExpandMore from "@/components/ExpandMore";
import CollapseCard from "@/components/CollapseCard";
const EPSILON = 0.000001


const polygonverfahren_sbs = (f: math.EvalFunction, y_n: math.MathNumericType,
    t_n: number, h: number,): { x: number, y: math.MathNumericType } => {

    y_n = (y_n as number) + h * f.evaluate({
        x: t_n + h,
        y: y_n
    })
    return {
        x: t_n,
        y: y_n
    }
}


export default function Eulerschepolygonverfahren() {
    const [verfahrenExpanded, expandVerfahren] = useState(false);
    const [visExpanded, expandVis] = useState(true);
    // Anfangswert
    const [t_n, setT_n] = useState(0.8);
    const [max, setMax] = useState(100);
    // ODE
    const [odeString, setOdeString] = useState("y^2");
    const [ode, setOde] = useState(math.compile(odeString));
    // h
    const [increment, setIncrement] = useState(0.01);
    const [started, setStarted] = useState(false);
    const [solution, setSolution] = useState<{ x: number, y: math.MathNumericType }[]>([{
        x: t_n,
        y: 5 / 6
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

            <EulerVisCard/>
        </Stack>
    )
}