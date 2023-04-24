import Stack from "@mui/material/Stack";
import EulerVisCard from "@/components/eulerVisCard";
import LaTeXCard from "@/components/LaTeXCard";


export default function Eulerschepolygonverfahren() {
    return (
        <Stack padding={"0rem .5rem"} flexDirection={"column"}
        alignSelf={"center"}
        width={"90vw"}
        gap={"1rem"}
        >
            <LaTeXCard title="Erklärung" 
                content={
                    `
                    Man approximiert das Integral \\[\\int_{t_{i-1}}^{t_i} f(s,y(s)) ds = \\int_{t_{i-1}}^{t_i} y'(s) ds = y(t_i) - y(t_{i-1})\\] durch 
                    \\[(t_i - t_{i-1}) \\cdot f(t_{i-1}, y_{i-1}) \\]Es sei \\(y_0\\) gegeben, es gilt
                    \\[
                        y_{i} \\coloneqq y_{i-1} + (t_{i} - t_{i-1}) \\cdot f(t_{i-1}, y_{i-1})
                        = y_{i-1} + h_i \\cdot f(t_{i-1}, y_{i-1})
                    \\]
                    Da hier der neue Wert \\(y_i\\) explizit aus dem alten Wert \\(y_{i-1}\\) und der 
                    Funktion \\(f\\) berechnet wird, nennt man das Verfahren auch 
                    explizites Euler-Verfahren`
                }
            />
            <EulerVisCard/>
        </Stack>
    )
}