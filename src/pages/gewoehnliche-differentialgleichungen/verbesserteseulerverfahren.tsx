import Stack from "@mui/material/Stack";
import LaTeXCard from "@/components/LaTeXCard";
import VerbesserterEulerVisCard from "@/components/verbesserterEulerVisCard";

export default function Eerbesserteseulerverfahren() {
    return (
        <Stack padding={"0rem .5rem"} flexDirection={"column"}
        alignSelf={"center"}
        width={"90vw"}
        gap={"1rem"}
        >
            <LaTeXCard title="Erklärung"
                content={`
                    \\(y_0\\) gegeben
                    
                    \\[t_{i+1}=t_i+h_i,\\ y_{i+1}=y_i+h_i\\cdot
                        f\\left(t_i+\\frac{h_i}{2},y_i+\\frac{h_i}{2}\\cdot f(t_i,y_i)\\right)\\]
                        
                        Implementierung: \\[\\overset{\\sim}{t}_i\\coloneqq t_i+\\frac{1}{2}h_i,\\ 
                    \\overset{\\sim}{y}_i,\\ y_{i+1}\\coloneqq y_i+h_i\\cdot f(\\overset{\\sim}{t}_i,\\overset{\\sim}{y}_i)\\]
                    
                    Das verbesserte Euler-Verfahren versucht den Wert in der Mitte des Teilintervalls
                    zu schätzen, was bei glatten f eine Verbesserung der Approximation ergeben sollte
                    (Verbesserung der Konvergenzordnung).
                    `}
            />

            <VerbesserterEulerVisCard/>
        </Stack>
    )
}