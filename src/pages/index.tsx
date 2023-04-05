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
import * as math from 'mathjs';
import Bisektionsverfahren from './bisektionsverfahren';

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
  return <Bisektionsverfahren/>
}
