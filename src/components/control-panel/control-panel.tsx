import {Button, Card, CardHeader, TextField} from "@mui/material";

interface Props {
    setRowNumber: (rowNumber: number) => void
    setMinesNumber: (mineNumber: number) => void
    setIsGameStart: (isGameStart: boolean) => void
    minesNumber: number
    rowNumber: number
    isGameStart:boolean
}

export const ControlPanel = ({setRowNumber, setMinesNumber, minesNumber, rowNumber, setIsGameStart, isGameStart}: Props) => {
    return <Card>
        <CardHeader subheader='settings'/>
        <TextField label='Number Of Rows' type="number" value={rowNumber} onChange={(e) => {
            setRowNumber(+e.target.value)
        }}/>
        <TextField label='Number Of Mines' type="number" value={minesNumber} onChange={(e) => {
            setMinesNumber(+e.target.value)
        }}/>
        <Button onClick={() => setIsGameStart(true)} disabled={!minesNumber || !rowNumber || isGameStart}>Start Game</Button>
    </Card>
}
