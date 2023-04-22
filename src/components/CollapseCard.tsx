import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from './ExpandMore';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import { useState } from "react";


export default function CollapseCard(props: {
    title: string,
    expanded: boolean,
    cardContent: JSX.Element
}){
    const [expanded, setExpanded] = useState(props.expanded);
    return (
    <Card>
        <CardHeader title={
            <Typography>
                {props.title}
            </Typography>
            }
            action={
                <ExpandMore
                expand={expanded}
                onClick={() => {
                    setExpanded(!expanded)
                }}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            }
        />
        <Divider/>
        <Collapse in={expanded}>
            <CardContent>
                {props.cardContent}
            </CardContent>
        </Collapse>
    </Card>
    )
}