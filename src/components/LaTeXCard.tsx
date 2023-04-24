import MathJax from "better-react-mathjax/MathJax";
import CollapseCard from "./CollapseCard";
import Typography from "@mui/material/Typography";

export default function LaTeXCard(props: {
    title: string,
    content: string
}){
    return( 
    <CollapseCard title={props.title} expanded={false} 
        cardContent={
            <MathJax>
                <Typography>
                    {props.content}
                </Typography>
            </MathJax>
        }
    />
    )

}