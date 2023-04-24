import CollapseCard from '@/components/CollapseCard'
import LagrangeInterpolationVisCard from '@/components/lagrangeInterpolationVisCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MathJax } from 'better-react-mathjax';

export default function LagrangeInterpolation(){
    return(
        <Stack padding={"0rem .5rem"} flexDirection={"column"}
        alignSelf={"center"}
        width={"90vw"}
        gap={"1rem"}
        >
            <CollapseCard title="Erklärung" expanded={false} 
                cardContent={
                    <MathJax>
                        <Typography>
                            {`
                                Wähle Basispolynome für $\\mathbb{P}_n$ angepasst an die Stützstellen $x_i$, so dass das 
                                Interpolationspolynom damit aus den Werten $y_i$ leicht bestimmt werden kann. Man kann 
                                recht einfach Polynome $L_i^{(n)}\\in\\mathbb{P}_n$ konstruieren, die in genau einem Stützpunkt $x_i = 1$ sind und 
                                in allen anderen Stützpunkten = 0. $$L_i^{(n)}(x_i) = \\left(\\begin{cases}
                                    1& i=j\\\\ 0& \\text{sonst}
                                \\end{cases}\\right) = \\delta_{ij}$$
                                 $n$ Nullstellen $$x_j, j\\neq i \\implies L_i^{(n)} = \\frac{\\displaystyle\\prod_{j\\neq i}(x-x_j)}{\\displaystyle\\prod_{j\\neq 
                                 i}(x_i-x_j)}$$
                                Diese $L_i^{(n)}, i=0, \\dots, n$ heißen ''Lagrange-Basispolynome'' zu Stützstellen $x_0,\\dots,x_n$.
                                
                                Linear unabhängig: leicht zu sehen: Alle $L_j^{(n)}(x_i) = 0$. Anzahl ist gleich $\\dim \\mathbb{P}_n$                                
                                `}
                        </Typography>
                    </MathJax>
                }
            />

            <LagrangeInterpolationVisCard/>
        </Stack>
    )
}
