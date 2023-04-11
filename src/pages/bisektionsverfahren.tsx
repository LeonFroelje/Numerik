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
import { Button, ButtonGroup, Card, Link, Menu, MenuItem, Paper, Stack, TextField } from '@mui/material'
import * as math from 'mathjs';
import Controlbuttons from '@/components/controlbuttons';
// import autocolors from "chartjs-plugin-autocolors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);


type Interval = {
  a: math.MathNumericType,
  b: math.MathNumericType
  // toString(): () => string
}


const intervalToString = (interval: Interval) => {
  return `[${interval.a},${interval.b}]`
}
const palette = ["#F7FBFC", "#EAFFD0", "#FCE38A", "#F38181"]


export default function Bisektionsverfahren() {
  
  let default_interval: Interval = {
    a: -2,
    b: 1
  };

  const [resolution, setResolution] = useState(.1);
  const [bisectionMethodStarted, startBisectionMethod] = useState(false);
  const [funcStr, setFuncStr] = useState("x^3")
  const [func, setFunc] = useState(math.compile("x^3"));
  const [interval, setInterval] = useState(default_interval);
  const [labels, setLabels] = useState(math.range((interval.a as number), (interval.b as number), resolution, true).toArray());
  const [history, setHistory] = useState<Interval[]>([]);
  const default_order = 10000
  const [datasets, setDatasets] = useState([{
    label: intervalToString(interval),
    data: labels.map((x) => {
      return {
        x: (x as number).toFixed(2),
        y: func.evaluate({
          x: x
        })
      }
    }),
    order: default_order,
    backgroundColor: palette[3],
    borderColor: palette[3],
    pointRadius: 0
  }]);
  const [solutionFound, setSolutionFound] = useState(false);
  const [solution, setSolution] = useState(0);
  const [key, setKey] = useState(0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }


  return (
    <Paper sx={{
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}>
      <Stack direction={"row"} gap={"1rem"} maxWidth={"100%"} overflow={"auto"} padding={"0rem 0.5rem 0rem .5rem"}
      justifyContent={"space-around"}>
      <Button
              id="inputopen"
              aria-controls={open ? 'input' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="outlined"
              onClick={handleClick}
              sx={{
                height: "3rem"
              }}
            >
              Eingabe
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'inputopen',
              }}
              id='input'>
              <MenuItem>
                <TextField id="function-input" label="Funktion" variant='outlined'
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    try {
                      console.log(event.target.value)
                      setFuncStr(event.target.value)
                      let code = math.compile(event.target.value);
                      setFunc(code)
                      setDatasets([{
                        label: intervalToString(interval),
                        data: labels.map((x) => {
                          return {
                            x: (x as number).toFixed(2),
                            y: code.evaluate({
                              x: x
                            })
                          }
                        }),
                        order: default_order,
                        backgroundColor: palette[3],
                        borderColor: palette[3],
                        pointRadius: 0    
                      }])
                    }
                    catch {
                      console.log("fehler")
                    }
                  }} value={funcStr}
                />
              </MenuItem>
              <MenuItem>
                <TextField id="interval-start" label="Intervall Beginn" variant='outlined'
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const i = {
                      b: interval.b,
                      a: parseFloat(event.target.value),
                    }
                    setInterval(i)
                    const l = math.range((i.a as number), (i.b as number), resolution, true).toArray()
                    setLabels(l);
                    setDatasets([{
                      label: intervalToString(i),
                      data: l.map((x) => {
                        return {
                          x: (x as number).toFixed(2),
                          y: func.evaluate({
                            x: x
                          })
                        }
                      }),
                      order: default_order,
                      backgroundColor: palette[3],
                      borderColor: palette[3],
                      pointRadius: 0                    
                    }])
                  }} 
                  // value={interval.a} 
                />
              </MenuItem>
              <MenuItem>
                <TextField id="interval-end" label="Intervall Ende" variant='outlined'
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const i = {
                      b: parseFloat(event.target.value),
                      a: interval.a,
                    }
                    setInterval(i)
                    const l = math.range((i.a as number), (i.b as number), resolution, true).toArray()
                    setLabels(l);
                    setDatasets([{
                      label: intervalToString(i),
                      data: l.map((x) => {
                        return {
                          x: (x as number).toFixed(2),
                          y: func.evaluate({
                            x: x
                          })
                        }
                      }),
                      order: default_order,
                      backgroundColor: palette[3],
                      borderColor: palette[3],
                      pointRadius: 0                    
                    }])
                  }}
                  // value={interval.b !== NaN ? interval.b : ""} 
                />
              </MenuItem>
              <MenuItem>
                <TextField id="resolution" label="Auflösung" variant='outlined'
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const r = parseFloat(event.target.value)
                    setResolution(r)
                    const l = math.range((interval.a as number), (interval.b as number), r, true).toArray()
                    setLabels(l);
                    setDatasets([{
                      label: intervalToString(interval),
                      data: l.map((x) => {
                        return {
                          x: (x as number).toFixed(2),
                          y: func.evaluate({
                            x: x
                          })
                        }
                      }),
                      order: default_order,
                      backgroundColor: palette[3],
                      borderColor: palette[3],
                      pointRadius: 0
                    }])
                  }} 
                />
              </MenuItem>
            </Menu>

        <Stack flexDirection={"row"} justifyContent={"center"}>
          <Controlbuttons started={bisectionMethodStarted} setStarted={startBisectionMethod} setNext={() => {
            let c: number = ((interval.b as number) + (interval.a as number)) / 2
            if(func.evaluate({x: c}) === 0){
              setSolutionFound(true);
              setSolution(c)
            }
            else if(func.evaluate({x: interval.a}) * func.evaluate({x: c}) < 0){
              // find closest point in current labels to the one we just calculated
              c = [...(labels as math.MathNumericType[])].reduce((prev, curr) => {
                return math.abs((c as number) - (curr as number)) < math.abs((c as number) - (prev as number)) 
                 ? curr
                 : prev 
              }) as number;

              // update interval
              setInterval({
                a: interval.a,
                b: c
              })
              // only select x values that are already containted in the previous labels
              // and are contained in the new interval
              let x_values = [...(labels as math.MathNumericType[])].filter((value) => {
                return (value >= interval.a && value <= interval.b)
              })
              // add to history
              setHistory([...history, interval]);
              // add to datasets
              setDatasets([... datasets, {
                label: intervalToString(interval),
                data: x_values.map((x) => {
                  return {
                    x: (x as number).toFixed(2),
                    y: func.evaluate({
                      x: x
                    })
                  }
                }),
                order: default_order - datasets.length,
                backgroundColor: palette[3],
                pointRadius: 0
              }].map((value, index) => {
                if(datasets.length - index <= palette.length){
                  console.log(`Differenz: ${datasets.length - index}, Index: ${index}`)
                  }
                  return {
                  ...value,
                  backgroundColor: datasets.length - index >= palette.length 
                   ? palette[0]
                   : palette[3 - (datasets.length - index)],
                   borderColor: datasets.length - index >= palette.length 
                   ? palette[0]
                   : palette[3 - (datasets.length - index)]
                }
              }))
              console.log(datasets);
            }
            else{
              c = [...(labels as math.MathNumericType[])].reduce((prev, curr) => {
                return math.abs((c as number) - (curr as number)) < math.abs((c as number) - (prev as number)) 
                 ? curr
                 : prev 
              }) as number;

              // add to history
              setHistory([...history, interval]);
              // update interval
              setInterval({
                a: c,
                b: interval.b
              })
              let x_values = [...(labels as math.MathNumericType[])].filter((value) => {
                return (value >= interval.a && value <= interval.b)
              })
              // add to datasets
              setDatasets([... datasets, {
                label: intervalToString(interval),
                data: x_values.map((x) => {
                  return {
                    x: (x as number).toFixed(2),
                    y: func.evaluate({
                      x: x
                    })
                  }
                }),
                order: default_order - datasets.length,
                backgroundColor: palette[3],
                borderColor: palette[3],
                pointRadius: 0
              }].map((value, index) => {
                if(datasets.length - index <= palette.length){
                console.log(`Differenz: ${datasets.length - index}, Index: ${index}`)
                }
                return {
                  ...value,
                  backgroundColor: datasets.length - index >= palette.length 
                   ? palette[0]
                   : palette[3 - (datasets.length - index)],
                  borderColor: datasets.length - index >= palette.length 
                  ? palette[0]
                  : palette[3 - (datasets.length - index)]
                }
              }))
              console.log(datasets);
            }
          }} setPrev={() => {}}/>
        </Stack>
      </Stack>
      <div style={{height: "100vh"}}>
        <Line
          key={key}
          data={{
            // labels: labels.map(x => x.toFixed(2)),
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
                  filter: (item, data) => {
                    if(item.datasetIndex !== undefined){
                      return datasets.length - item.datasetIndex > 4 
                      ? false
                      : true
                    }
                    else{
                      return false
                    }
                  }
                }
              }
            },
            responsive: true,
          }}
          height={"1000px"}
          width={"1000px"}
        />
      </div>
    </Paper>
  )
}