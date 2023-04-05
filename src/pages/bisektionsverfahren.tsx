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
import { Line } from 'react-chartjs-2';
import { ChangeEvent, useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Paper, Stack, TextField } from '@mui/material'
import * as math from 'mathjs';
import Controlbuttons from '@/components/controlbuttons';
import autocolors from "chartjs-plugin-autocolors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  autocolors,
);


type Interval = {
  a: number,
  b: number
  // toString(): () => string
}


const intervalToString = (interval: Interval) => {
  return `[${interval.a},${interval.b}]`
}


export default function Bisektionsverfahren() {
  
  let default_interval: Interval = {
    a: -2,
    b: 1
  };

  let default_func = math.compile("x^3");
  const [resolution, setResolution] = useState(.1);
  const [bisectionMethodStarted, startBisectionMethod] = useState(false);
  const [func, setFunc] = useState(default_func);
  const [interval, setInterval] = useState(default_interval);
  const [labels, setLabels] = useState(math.range(interval.a, interval.b, resolution, true).toArray());
  const [history, setHistory] = useState<Interval[]>([]);
  const [datasets, setDatasets] = useState([{
    label: intervalToString(interval),
    data: labels.map((x) => {
      return {
        x: x.toFixed(2),
        y: func.evaluate({
          x: x
        })
      }
    }),
  }]);
  const [solutionFound, setSolutionFound] = useState(false);
  const [solution, setSolution] = useState(0);


  return (
    <Paper sx={{
      padding: "1rem",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }}>
      <Stack direction={"row"} gap={"1rem"}>
        <TextField id="function-input" label="Funktion" variant='outlined'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            try {
              let code = math.compile(event.target.value);
              setFunc(code)
            }
            catch {
              console.log("fehler")
            }
          }} />

        <TextField id="interval-start" label="Intervall Beginn" variant='outlined'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setInterval({
              b: interval.b,
              a: parseFloat(event.target.value),
            })
          }} />
        <TextField id="interval-end" label="Intervall Ende" variant='outlined'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setInterval({
              a: interval.a,
              b: parseFloat(event.target.value),
            })
          }} />
        <TextField id="resolution" label="Auflösung" variant='outlined'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setResolution(parseFloat(event.target.value))
          }} />
        <Controlbuttons started={bisectionMethodStarted} setStarted={startBisectionMethod} setNext={() => {
          let c: number = (interval.b + interval.a) / 2
          console.log(c)
          if(func.evaluate({x: c}) === 0){
            setSolutionFound(true);
            setSolution(c)
          }
          else if(func.evaluate({x: interval.a}) * func.evaluate({x: c}) < 0){
            // update interval
            setInterval({
              a: interval.a,
              b: c
            })
            // add to history
            setHistory([...history, interval]);
            // add to datasets
            setDatasets([... datasets, {
              label: intervalToString(interval),
              data: math.range(interval.a, c, resolution, true).toArray()
                .map((x) => {
                  return func.evaluate({
                    x: x
                  })
                })
            }])
            console.log(datasets);
            console.log(interval);
            console.log(history);
          }
          else{
            // add to history
            setHistory([...history, interval]);
            // update interval
            setInterval({
              a: c,
              b: interval.b
            })
            // add to datasets
            setDatasets([... datasets, {
              label: intervalToString(interval),
              data: math.range(c, interval.b, resolution, true).toArray()
                .map((x) => {
                  return {
                    x: x.toFixed(2),
                    y: func.evaluate({
                      x: x
                    })
                  }
                })
            }])
            console.log(datasets);
            console.log(interval);
            console.log(history);
          }
        }} setPrev={() => {}}/>
      </Stack>
      <div style={{height: "60vh"}}>
        <Line
          data={{
            // labels: labels.map(x => x.toFixed(2)),
            datasets: datasets
          }}
          options={{
            plugins: {
              autocolors: {
                enabled: true,
              }
            },
            responsive: true,
          }}
        />
      </div>
      <Card sx={{width: "20rem"}}>
        {solutionFound ? `Nullstelle gefunden bei x = ${solution}` : "Nullstelle wird gesucht"}
      </Card>
    </Paper>
  )
}