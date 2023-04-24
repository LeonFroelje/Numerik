import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import CollapseCard from './CollapseCard';
import LineChartBox from './LineChartBox';
import { useState } from 'react';
import { MathJax } from 'better-react-mathjax';

function validateInput(input: string): boolean {
    
    return false
}

export default function LagrangeInterpolationVisCard(){
    const [datasets, setDatasets] = useState([])
    return (
        <MathJax>
            <CollapseCard title='Visualisierung' expanded={true}
            cardContent={
                <Stack flexDirection={"column"} justifyContent={"center"} gap={".5rem"}>
                    <Box id="input-box" alignSelf={"center"}>
                        <TextField  label={"Stützstellen \\((x_i, y_i)\\)"} placeholder={"(x, y)"}
                         onChange={(event) => {
                            console.log(event.currentTarget.value);

                         }}
                        />
                            
                    </Box>
                    So fett in Schwarz das Interpolationspolynom und in leichteren Farben die einzelnen Basispolynome.
                    Rechts dann die Formeln für die Basispolynome undso
                    <LineChartBox datasets={datasets}/>
                </Stack>
                }
            />
        </MathJax>
    )
}