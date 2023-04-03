import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChangeEvent, useEffect, useState } from 'react'
import { Button, ButtonGroup, Paper, Stack, TextField } from '@mui/material'
import { string } from 'mathjs'
import { width } from '@mui/system'
import * as math from 'mathjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


type Interval = {
  a: number,
  b: number
  // toString(): () => string
}


const intervalToString = (interval: Interval) => {
  return `[${interval.a},${interval.b}]`
}

export default function Home() {
  let default_interval: Interval = {
    a: -1,
    b: 1
  };
  
  let default_func = math.compile("x^2");
  const [resolution, setResolution] = useState(.1);
  const [bisectionMethodStarted, startBisectionMethod] = useState(false);
  const [func, setFunc] = useState(default_func);
  const [interval, setInterval] = useState(default_interval); 
  const labels = math.range(interval.a, interval.b, resolution, true).toArray();  
  if(bisectionMethodStarted){
    return (
      <Paper sx={{
        padding: "1rem",
        height: "100vh",
        width: "100vw"
      }}>
        <Stack direction={"row"} gap={"1rem"}>
          <TextField id="function-input" label="Funktion" variant='outlined'
           onChange={(event: ChangeEvent<HTMLInputElement>) => {
            try{
              let code = math.compile(event.target.value);
              setFunc(code)
            }
            catch{
              console.log("fehler")
            }
          }}/>
          
          <TextField id="interval-start" label="Intervall Beginn" variant='outlined'
           onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setInterval({
                b: interval.b,
                a: parseFloat(event.target.value),
              })
           }}/>
          <TextField id="interval-end" label="Intervall Ende" variant='outlined'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setInterval({
              a: interval.a,
              b: parseFloat(event.target.value),
            })
         }}/>
         <TextField id="resolution" label="Auflösung" variant='outlined'
         onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setResolution(parseFloat(event.target.value))
         }}/>
         <ButtonGroup>
         <Button variant="outlined" onClick={() => {
            //step back;
          }}>zurück</Button>
          <Button variant="outlined" onClick={() => {
            startBisectionMethod(false);
          }}>stop</Button>
          <Button variant="outlined" onClick={() => {
            // step forward
          }}>weiter</Button>

         </ButtonGroup>
        </Stack>
        <div>
          <Line 
          data={{
            labels: labels.map(x => x.toFixed(2)),
            datasets:[
              {
                label: intervalToString(interval),
                data: labels.map((x) => {
                  return func.evaluate({
                    x: x
                  })
                }),
                borderColor: 'rgb(255,99,132)',
                backgroundColor: 'rgb(255,99,132)'
              }
            ]
          }}
          />
        </div>
      </Paper>
    )  
  }
  return (
    <Paper sx={{
      padding: "1rem",
      height: "100vh",
      width: "100vw"
    }}>
      <Stack direction={"row"} gap={"1rem"}>
        <TextField id="function-input" label="Funktion" variant='outlined'
         onChange={(event: ChangeEvent<HTMLInputElement>) => {
          try{
            let code = math.compile(event.target.value);
            setFunc(code)
          }
          catch{
            console.log("fehler")
          }
        }}/>
        
        <TextField id="interval-start" label="Intervall Beginn" variant='outlined'
         onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setInterval({
              b: interval.b,
              a: parseFloat(event.target.value),
            })
         }}/>
        <TextField id="interval-end" label="Intervall Ende" variant='outlined'
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setInterval({
            a: interval.a,
            b: parseFloat(event.target.value),
          })
       }}/>
       <TextField id="resolution" label="Auflösung" variant='outlined'
       onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setResolution(parseFloat(event.target.value))
       }}/>
        <Button variant="outlined" onClick={() => {
          startBisectionMethod(true);
        }}>Bisektionsverfahren starten</Button>
      </Stack>
      <div>
        <Line 
        data={{
          labels: labels.map(x => x.toFixed(2)),
          datasets:[
            {
              label: intervalToString(interval),
              data: labels.map((x) => {
                return func.evaluate({
                  x: x
                })
              }),
              borderColor: 'rgb(255,99,132)',
              backgroundColor: 'rgb(255,99,132)'
            }
          ]
        }}
        />
      </div>
    </Paper>
  )
}
