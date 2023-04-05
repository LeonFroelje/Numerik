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
                }}>zurück</Button>
                <Button variant="outlined" onClick={() => {
                    props.setStarted(false);
                }}>stop</Button>
                <Button variant="outlined" onClick={() => {
                    props.setNext()
                }}>weiter</Button>
   
            </ButtonGroup>
         )
    }
    return (
        <Button variant="outlined" onClick={() => {
            props.setStarted(true);
          }}>Bisektionsverfahren starten</Button>  
    )
}