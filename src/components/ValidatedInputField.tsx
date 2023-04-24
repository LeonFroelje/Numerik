import { useState } from 'react';


export default function ValidatedInputField(props: {
    validatorFunction: (input: string) => boolean,
    props: object
}){
    const [valid, setValid] = useState(true)

    return(
        <>
        
        </>
    )

}