import {Board} from "./components/mines/board.tsx";

function App() {

    return (
        <>
            <div>
                <Board baseArray={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]} minesPerRow={3}/>
            </div>
        </>
    )
}

export default App
