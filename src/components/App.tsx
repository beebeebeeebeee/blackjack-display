import {Box, Button, Paper, Stack} from "@mui/material";
import {useState} from "react";
import {CARDS_TYPE} from "../types";
import {CARDS} from "../constants";

const MAX = 21

export function App(): JSX.Element {
    const [cards, setCards] = useState<CARDS_TYPE[]>([])
    const [disabled, setDisabled] = useState<boolean>(false)
    const total = sumCards(cards)
    const [best, others] = sortBest(total)
    const acceptableCards = cards.length === 0 ? CARDS.map(e => e.name) : getAcceptableCards(best)

    console.log(acceptableCards)

    const addCard = (card: CARDS_TYPE) => {
        setCards(e => [...e, card])
    }

    const clearCards = () => {
        setCards([])
    }

    return <Box>
        <Box sx={{
            color: '#ffffff',
            padding: 1,
        }}>
            <Stack>
                <Box sx={{
                    fontSize: '40vh',
                    textAlign: 'center',
                    ...cards.length === 0 ? {} : best === MAX ? {
                        color: '#e8c21a'
                    } : best === null ? {
                        color: '#e81a1a'
                    } : {}
                }}>
                    {cards.length === 0 ? 0 : best ?? 'X'}
                </Box>
                <Stack alignItems='flex-end'>
                    {others.join(', ')}
                </Stack>
            </Stack>
        </Box>
        <Paper sx={{
            bgcolor: '#abb5b9',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            height: '8rem',
            padding: 1
        }}>
            <Box>
                <Stack direction='column' spacing={1}>
                    <Stack justifyContent='space-between' direction='row'>
                        <Box>
                            {best===null?0:best-MAX}
                        </Box>
                        <Button sx={{p: 0}} onClick={() => clearCards()}>
                            Clear
                        </Button>
                    </Stack>
                    <Box sx={{height: '2.5rem'}}>
                        <Stack direction='row' spacing={1}>
                            {
                                cards.map((e, i) => <Box
                                    key={i}
                                    sx={{
                                        bgcolor: '#1767b6',
                                        color: '#ffffff',
                                        width: `${100 / CARDS.length}vw`,
                                        textAlign: 'center',
                                        py: 1,
                                    }}
                                >
                                    {e}
                                </Box>)
                            }
                        </Stack>
                    </Box>
                    <Box>
                        <Stack direction='row' spacing={1} justifyContent='space-between'>
                            {
                                CARDS.map((e, i) => <Box
                                    key={i}
                                    sx={{
                                        bgcolor: disabled ? '#5d5d5d' : '#2c4969',
                                        color: acceptableCards.includes(e.name) ? '#ffffff' : '#ff5c5c',
                                        width: `${100 / CARDS.length}vw`,
                                        textAlign: 'center',
                                        py: 1,
                                        userSelect: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        if (disabled) return
                                        addCard(e.name)
                                        setDisabled(true)
                                        setTimeout(() => {
                                            setDisabled(false)
                                        }, 50)
                                    }}
                                >
                                    {e.name}
                                </Box>)
                            }
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Paper>
    </Box>

}

function sumCards(cards: CARDS_TYPE[], pv: number[] = []): number[] {
    if (cards.length === 0) return pv
    const {value} = CARDS.find(e => e.name === cards[0])!
    return sumCards([...cards.slice(1)], pv.length === 0 ? value : value.map(a => pv.map(b => a + b)).flat())
}

function sortBest(results: number[]): [number | null, number[]] {
    const flatResults = [...new Set(results)]
    const max = Math.max(...flatResults.filter(e => e <= MAX))
    if (max === -Infinity) {
        return [null, flatResults]
    }
    return [max, flatResults.filter(e => e !== max)]
}

function getAcceptableCards(current: number | null): CARDS_TYPE[] {
    if (current === null) return []
    const accept = MAX - current
    return CARDS
        .filter(e => e.value.some(k => k <= accept))
        .map(e => e.name)
}
