import Box from '@mui/material/Box';
import { Line } from "react-chartjs-2";
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
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);


export default function LineChartBox(props: {
    datasets: {
        label: string;
        data: {
            x: string;
            y: math.MathNumericType;
        }[];
    }[]
}) {
    return (
    <Box width={"90vw"} alignSelf={"center"} minHeight={"40vw"} height={"45vh"} display={"flex"} justifyContent={"center"}>
        <Line
        width={"100%"}
            data={{
                datasets: props.datasets
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
    )

}