import React, { useEffect, useState } from 'react'
import { ReactQueryData } from './ReactQueryData'

function Game() {

    const { data, isLoading, isError } = ReactQueryData()
    const [moves, setMoves] = useState(0)
    const [score, setScore] = useState(0)
    const [cards, setCards] = useState<any[]>([])
    const [firstCard, setFirstCard] = useState<any | null>(null)
    const [secondCard, setSecondCard] = useState<any | null>(null)
    useEffect(() => {
        if (data) {
            setCards(data)
        }
    }, [data])


    const newGame = () => {
        setMoves(0)
        setScore(0)
        setCards(cards.map((card: any) => ({ ...card, flipped: false })))
    }


    const flipCard = (id: number) => {
        setCards(cards.map((card: any) => card.id === id ? { ...card, flipped: !card.flipped } : card))
        setMoves(moves + 1)

        const clickedCard = cards.find((card: any) => card.id === id);

        if (!clickedCard) return;

        if (firstCard === null) {
            setFirstCard(clickedCard)
        } else if (secondCard === null) {
            setSecondCard(clickedCard)
        }

    }

    useEffect(() => {
        if (!firstCard || !secondCard) return;
        if (firstCard.icon === secondCard.icon) {
            setScore(score + 1)
        } else {
            setTimeout(() => {
                setCards(prev => prev.map((card: any) => card.id === firstCard.id || card.id === secondCard.id ? { ...card, flipped: false } : card))
            }, 1000)

        }
        setFirstCard(null)
        setSecondCard(null)
    }, [firstCard, secondCard])

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Error...</h1>

    return (
        <>
            <div className="container text-white text-center w-fit mt-4 border py-4 px-20 rounded-2xl bg-[#111] mx-auto my-0">
                <h1 className="text-2xl font-bold">Memory Game Card</h1>
                <div className="scores text-center mt-4 flex justify-between">
                    <div className="flex flex-col items-center">
                        <p className="font-bold">Score : </p>
                        <h3>{score}</h3>
                    </div>
                    <div className="flex flex-col items-center">

                        <p className="font-bold">Moves : </p>
                        <h3>{moves}</h3>
                    </div>

                </div>
                <button onClick={newGame} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" >
                    New Game
                </button>
            </div>

            <div className="grid mx-auto my-0  grid-cols-4 gap-4 mx-auto w-fit mt-4 ">
                {
                    cards.map((card: any) => (
                        <div className="cursor-pointer bg-[#111] text-white border-2 border-gray-400 rounded-lg w-16 h-16 flex items-center justify-center text-xl font-bold" key={card.id} onClick={() => flipCard(card.id)}>
                            {card.flipped ? card.icon : "?"}
                        </div>
                    ))
                }
            </div>

        </>
    )
}

export default Game