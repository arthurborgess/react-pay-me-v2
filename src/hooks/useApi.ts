import { useEffect, useState } from "react"
import { IUser } from "../types/User"
import { cards } from "../helpers/cards"

export const useApi = () => ({
    getUsers: <T = unknown >() => {
        const [users, setUsers] = useState<T | null>(null)
        const [isLoading, setIsLoading] = useState(true)

        useEffect(() => {
            fetch('https://www.mocky.io/v2/5d531c4f2e0000620081ddce')
            .then(response => response.json())
            .then(data => setUsers(data))

            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }, [])

        return { users, isLoading }
    },
    setPayment: async ({amount, card, user}: {amount: string, card: string, user: IUser}) => {
        let cardData = cards.find(c => c.card_number === card)

        if (cardData) {
            await fetch('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    card_number: cardData.card_number,
                    cvv: cardData.cvv,
                    expiry_date: cardData.expiry_date,
                    destination_user_id: user.id,
                    amount: amount,
                })
            })
        }

        return cardData?.card_number === '1111111111111111' ? true : false
    }
})