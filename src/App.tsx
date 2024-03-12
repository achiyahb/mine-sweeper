import {Board} from "./components/mines/board.tsx";
import './App.css'

function App() {

    return (
        <>
            <div className='main'>
                <Board baseArray={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]} minesPerRow={3}/>
            </div>
        </>
    )
}

export default App
