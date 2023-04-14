import { Menu, MenuItem } from "@mui/material";


export default function FunctionMenu(){
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
}