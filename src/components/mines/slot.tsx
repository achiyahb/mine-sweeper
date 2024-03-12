import {useEffect, useState} from "react";

interface Props {
    isMine: boolean;
    isReveal: boolean;
    handleClick: (e: any) => void;
    nextMinesNumber: number;
    isExploded?: boolean;
    isSetFlag?: boolean;
    handleFlagSetting: () => void
}

export const Slot = ({isMine, isReveal, handleClick, nextMinesNumber, isExploded, isSetFlag,handleFlagSetting}: Props) => {
    const [reveal, setReveal] = useState(false)

    useEffect(() => {
        if (isReveal) {
            setReveal(true)
        }
    }, [isReveal])

    if (!reveal) {
        return <div style={{
            borderColor: "black",
            border: '1px solid rgba(25, 118, 210, 0.5)',
            backgroundColor: 'grey',
            width: '20px',
            height: '20px'
        }} onClick={handleClick} onContextMenu={(e)=>{
            handleFlagSetting()
            e.preventDefault()
        }}>{isSetFlag&&'F'}</div>
    }
    return <div style={{
        borderColor: "black",
        border: '1px solid rgba(25, 118, 210, 0.5)',
        width: '20px',
        height: '20px',
        backgroundColor: isExploded ? 'red' : 'white',
    }}>{isMine ? 'X' : nextMinesNumber ? nextMinesNumber : ' '}</div>
}
