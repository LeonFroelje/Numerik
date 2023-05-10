import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";
import * as d3 from "d3"

export default function Backtracking(){
    const simBox = useRef<HTMLDivElement>();

    useEffect(() => {
        if(simBox && simBox.current){
            if(!simBox.current.hasChildNodes()){
                const tutorien:{tutorium0: number[], tutorium1: number[], tutorium2: number[]} = {
                    tutorium0: [],
                    tutorium1: [],
                    tutorium2: []
                }
                
                const studierende = {
                    studi0: [false, true, true],
                    studi1: [true, true, false],
                    studi2: [false, true, true],
                    studi3: [true, true, false],
                    studi4: [false, true, false]
                }

                const svg = d3.select("#sim-box")
                    .append("svg");

                svg.selectAll("text")
                    .data(Object.entries(tutorien))
                    .join(
                        enter => {
                            return enter.append("text")
                            .attr("fill", "black")
                            .attr("y", (d,i) => {
                                return 16 + i * 32;
                            })
                            .text(d => `${d[0]}: [${d[1]}]`)
                        },
                        update => {
                            return update
                        },

                        exit => {
                            return exit
                                .remove()
                        }
                    );
                
                d3.select("#lel")
                    .on("click", () => {
                        console.log("1")
                        tutorien.tutorium0 = [1]
                    })
            }
        }
    })


    return (
        <Stack padding={"0rem .5rem"} flexDirection={"column"}
        alignSelf={"center"}
        width={"90vw"}
        gap={"1rem"}
        alignItems="center"
        >
            <Stack flexDirection="row">
                <Button id="lel">Lel</Button>
            </Stack>
            <Box id="sim-box" ref={simBox}>

            </Box>
        </Stack>

    )
}