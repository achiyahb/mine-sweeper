import {useEffect, useState} from "react";
import './slot.css'

interface Props {
    isMine: boolean;
    isReveal: boolean;
    handleClick: () => void;
    nextMinesNumber: number;
    isExploded?: boolean;
    isSetFlag?: boolean;
    handleFlagSetting: () => void
}

export const Slot = ({isMine, isReveal, handleClick, nextMinesNumber, isExploded, isSetFlag,handleFlagSetting}: Props) => {
    const [reveal, setReveal] = useState(false)

    const convertSlotMinesNumberToColor = (slotMines: number) => {
        switch (slotMines) {
            case 1: return 'blue'
            case 2: return 'green'
            case 3: return 'red'
            default: return 'black'
        }
    }

    useEffect(() => {
        if (isReveal) {
            setReveal(true)
        }
    }, [isReveal])

    if (!reveal) {
        return <div 
        className="slot unrevealed"
        onClick={handleClick} onContextMenu={(e)=>{
            handleFlagSetting()
            e.preventDefault()
        }}>{isSetFlag&&<div className="unicode-icon">🚩</div>}</div>
    }
    return <div 
    className="slot revealed"
    style={{
        color: convertSlotMinesNumberToColor(nextMinesNumber),
    }}>{isMine ? <div className="unicode-icon">&#x1F4A3;</div> : nextMinesNumber ? nextMinesNumber : ' '}</div>
}
