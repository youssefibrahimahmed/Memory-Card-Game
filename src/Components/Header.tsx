import  { useEffect, useState } from 'react'

function Header() {

    type Card = {
        id: number
        icon: string
        flipped: boolean
    }
    const [score, setScore] = useState(0)
    const [moves, setMoves] = useState(0)
    const [firstCard, setFirstCard] = useState<Card | null>(null)
    const [secondCard, setSecondCard] = useState<Card | null>(null)
    const [cards, setCards] = useState<Card[]>([
        { id: 1, icon: "🍎", flipped: false },
        { id: 2, icon: "🍌", flipped: false },
        { id: 3, icon: "🍇", flipped: false },
        { id: 4, icon: "🍊", flipped: false },
        { id: 5, icon: "🍓", flipped: false },
        { id: 6, icon: "🍒", flipped: false },
        { id: 7, icon: "🍑", flipped: false },
        { id: 8, icon: "🍍", flipped: false },

        { id: 9, icon: "🍎", flipped: false },
        { id: 10, icon: "🍌", flipped: false },
        { id: 11, icon: "🍇", flipped: false },
        { id: 12, icon: "🍊", flipped: false },
        { id: 13, icon: "🍓", flipped: false },
        { id: 14, icon: "🍒", flipped: false },
        { id: 15, icon: "🍑", flipped: false },
        { id: 16, icon: "🍍", flipped: false },

    ])

    const flipCard = (id: number) => {
        setCards(
            cards.map((card) =>
                card.id === id ? { ...card, flipped: !card.flipped } : card
            )
        )

        setMoves(moves + 1)
        const clickedCard = cards.find((card) => card.id === id)
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

        }
        else {
            setTimeout(() => {
                setCards(prev =>
                    prev.map((card) =>
                        card.id === firstCard.id || card.id === secondCard.id ? { ...card, flipped: false } : card
                    )
                )
            }, 1000)
        }
        setFirstCard(null)
        setSecondCard(null)
    }, [firstCard, secondCard])


    const newGame = () => {
        setScore(0)
        setMoves(0)
        setCards(
            cards.map((card) => ({ ...card, flipped: false }))
        )
    }

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
                <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" onClick={newGame}>
                    New Game
                </button>
            </div>
            <div className="grid mx-auto my-0  grid-cols-4 gap-4 mx-auto w-fit mt-4 ">
                {cards.map((card) => (



                    <div onClick={() => flipCard(card.id)} className=" bg-[#111] text-white border-2 border-gray-400 rounded-lg w-16 h-16 flex items-center justify-center text-xl font-bold" key={card.id}>
                        {card.flipped ? card.icon : "?"}

                    </div>
                ))}
            </div>
        </>
    )
}


export default Header