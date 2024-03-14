import {useEffect, useState} from "react";
import {Grid} from "@mui/material";

import {Slot} from "../slot/slot.tsx";

interface Props {
    rowNumber: number
    minesNumber: number
}

export const Board = ({rowNumber, minesNumber}: Props) => {
    const [isGameOver, setIsGameOver] = useState(false)
    const [matrix, setMatrix] = useState<{
        isMine: boolean;
        isReveal: boolean,
        nextMinesNumber: number,
        isExploded?: boolean,
        isSetFlag?: boolean
    }[][]>([[]])
    const [tryingCounter, setTryingCounter] = useState<number>(0)
    const [firstChoice, setFirstChoice] = useState<{ rowKey: number; slotKey: number } | undefined>(undefined)
    const [flagCounter, setFlagCounter] = useState<number>(0)
    const [remainingSlots, setRemainingSlots] = useState<number>(rowNumber * rowNumber)
    const [isWin, setIsWin] = useState(false)

    useEffect(() => {
        if (firstChoice) {
            setRevealSlot(firstChoice.rowKey, firstChoice.slotKey)
            setTryingCounter(tryingCounter + 1)
            setMatrix(matrix);
        }
    }, [firstChoice])

    useEffect(() => {
        const remaining = matrix.reduce((acc, row) => {
            const rowCount = row.reduce((acc, slot) => {
                !slot.isReveal && acc++
                return acc
            }, 0)
            return acc + rowCount
        }, 0)
        setRemainingSlots(remaining)
        if (remaining === minesNumber) {
            setIsWin(true)
        }
    }, [tryingCounter])

    const setRevealSlot = (rowKey: number, slotKey: number) => {
        const chosenSlot = matrix[rowKey][slotKey];
        if (!chosenSlot.isReveal && !chosenSlot.isMine) {
            chosenSlot.isReveal = true;
            if (chosenSlot.nextMinesNumber) {
                return
            }
            if (rowKey - 1 >= 0) {
                setRevealSlot(rowKey - 1, slotKey)
                if (slotKey - 1 >= 0) {
                    setRevealSlot(rowKey - 1, slotKey - 1)
                }
                if (slotKey + 1 < rowNumber) {
                    setRevealSlot(rowKey - 1, slotKey + 1)
                }
            }
            if (rowKey + 1 < rowNumber) {
                setRevealSlot(rowKey + 1, slotKey)
                if (slotKey - 1 >= 0) {
                    setRevealSlot(rowKey + 1, slotKey - 1)
                }
                if (slotKey + 1 < rowNumber) {
                    setRevealSlot(rowKey + 1, slotKey + 1)
                }
            }
            if (slotKey - 1 >= 0) {
                setRevealSlot(rowKey, slotKey - 1)
            }
            if (slotKey + 1 < rowNumber) {
                setRevealSlot(rowKey, slotKey + 1)
            }
        }
    }

    const revealAll = () => {
        matrix.forEach(row => {
            row.forEach(slot => {
                slot.isReveal = true;
            })
        })
        setMatrix(matrix)
    }
    const handleClick = (rowKey: number, slotKey: number) => {
        if (!tryingCounter) {
            return initGameBoard(rowKey, slotKey)
        }
        const chosenSlot = matrix[rowKey][slotKey];
        if (chosenSlot.isSetFlag) {
            return
        }
        if (chosenSlot.isMine) {
            chosenSlot.isExploded = true
            revealAll()
            return setIsGameOver(true);
        }
        setRevealSlot(rowKey, slotKey)
        setTryingCounter(tryingCounter + 1)
        setMatrix(matrix);
    }

    const countNextMines = (matrix: { isMine: boolean; isReveal: boolean, nextMinesNumber: number }[][]) => {
        matrix.forEach((row, rowKey) => {
            row.forEach((slot, slotKey) => {
                if (slot.isMine) {
                    const isLeftAllowed = slotKey - 1 >= 0
                    const isUpAllowed = rowKey - 1 >= 0
                    const isRightAllowed = slotKey + 1 < rowNumber
                    const isDownAllowed = rowKey + 1 < rowNumber
                    const rowKeys = [rowKey];
                    const slotKeys = [slotKey]
                    if (isLeftAllowed) {
                        slotKeys.push(slotKey - 1)
                    }
                    if (isRightAllowed) {
                        slotKeys.push(slotKey + 1)
                    }
                    if (isUpAllowed) {
                        rowKeys.push(rowKey - 1)
                    }
                    if (isDownAllowed) {
                        rowKeys.push(rowKey + 1)
                    }
                    rowKeys.forEach((rKey) => {
                        slotKeys.forEach((sKey) => {
                            if (!matrix[rKey][sKey].isMine) {
                                matrix[rKey][sKey].nextMinesNumber++
                            }
                        })
                    })

                }
            })
        })
        return matrix
    }

    useEffect(() => {
        const newMatrix = Array.from(Array(rowNumber)).map(() => {
            return Array.from(Array(rowNumber)).map(() => ({
                isMine: false,
                isReveal: false,
                nextMinesNumber: 0,
            }))
        })
        setMatrix(newMatrix)
    }, [])

    const initGameBoard = (rowKey: number, slotKey: number) => {
        const rowMinesHm:Record<number, Record<number, boolean>> = {}
        for (let i = 0; i < minesNumber;) {
            const index = Math.floor(Math.random() * rowNumber)
            const rowIndex = Math.floor(Math.random() * rowNumber)
            if (rowIndex === rowKey || rowIndex === rowKey - 1 || rowIndex === rowKey + 1) {
                if (index === slotKey || index === slotKey - 1 || index === slotKey + 1) {
                    continue
                }
            }
            if (!rowMinesHm[rowIndex]) {
                rowMinesHm[rowIndex] = {}
            }
            if (!rowMinesHm[rowIndex][index]) {
                rowMinesHm[rowIndex][index] = true
                matrix[rowIndex][index].isMine = true
                i++
            }
        }
        const matrixWithCountMines = countNextMines(matrix)
        setFirstChoice({rowKey, slotKey})
        setMatrix(matrixWithCountMines)
    }

    const handleFlagSetting = (rowKey: number, slotKey: number) => {
        const chosenSlot = matrix[rowKey][slotKey];
        chosenSlot.isSetFlag = (!chosenSlot.isSetFlag)
        setFlagCounter(flagCounter + 1)
        setMatrix(matrix);
    }

    return <>
        {isWin && <h3>YOU WIN!</h3>}
        {isGameOver && <h3>Game Over!</h3>}
        <h6>trying: {tryingCounter}</h6>
        <h6>flags: {flagCounter}</h6>
        <h6>remaining slots: {remainingSlots}</h6>
        <div>
            {matrix.map((row, rowKey) =>
                <Grid item key={rowKey}>
                    <Grid container key={rowKey + 's'}>
                        {row.map((slot, slotKey) =>
                            <Grid item>
                                <Slot isMine={slot.isMine} key={slotKey}
                                      handleClick={() => {
                                          handleClick(rowKey, slotKey)
                                      }}
                                      isReveal={slot.isReveal}
                                      nextMinesNumber={slot.nextMinesNumber}
                                      isExploded={slot.isExploded}
                                      handleFlagSetting={() => handleFlagSetting(rowKey, slotKey)}
                                      isSetFlag={slot.isSetFlag}
                                />
                            </Grid>)}
                    </Grid>
                </Grid>
            )}
        </div>
    </>
}
