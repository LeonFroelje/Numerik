import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";


export default function Controlbuttons(props: {
    started: boolean,
    setStarted: (start: boolean) => void,
    setNext: () => void,
    setPrev: () => void,
}){
    if(props.started){
        return(
            <ButtonGroup>
                <Button variant="outlined" onClick={() => {
                    props.setPrev();
                }}>Zurück</Button>
                <Button variant="outlined" onClick={() => {
                    props.setStarted(false);
                }}>Stop</Button>
                <Button variant="outlined" onClick={() => {
                    props.setNext()
                }}>Weiter</Button>
   
            </ButtonGroup>
         )
    }
    return (
        <Button variant="outlined" onClick={() => {
            props.setStarted(true);
          }}>Start</Button>  
    )
}