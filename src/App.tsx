import {Board} from "./components/board/board.tsx";
import './App.css'
import {ControlPanel} from "./components/control-panel/control-panel.tsx";
import {useState} from "react";

function App() {
    const [rowNumber, setRowNumber] = useState(15)
    const [minesNumber, setMinesNumber] = useState(45)
    const [isGameStart, setIsGameStart] = useState(false)


    return (
        <>
            <div className='main'>
                <ControlPanel setRowNumber={setRowNumber} setMinesNumber={setMinesNumber} isGameStart={isGameStart}
                              setIsGameStart={setIsGameStart} rowNumber={rowNumber} minesNumber={minesNumber}/>
                {isGameStart && <Board rowNumber={rowNumber} minesNumber={minesNumber}/>}
            </div>
        </>
    )
}

export default App
