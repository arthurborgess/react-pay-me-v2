import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { Box, Button, Select, Text } from "@chakra-ui/react"
import { IUser } from "../types/User"
import { cards } from "../helpers/cards";
import React, { useState } from "react";
import { useApi } from "../hooks/useApi";
import { CurrencyInput } from "./CurrencyInput";

type Props = {
    isOpen: boolean
    onClose: () => void
    user: IUser | null
}

export const PaymentModal = ({ isOpen, onClose, user }: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isPaid, setIsPaid] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [amount, setAmount] = useState('')
    const [card, setCard] = useState('')

    const api = useApi()

    async function handlePaymentSubmit(event: React.FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        if (user) {
            const response = await api.setPayment({ amount, card, user });
            setIsSuccessful(response)
        }

        setTimeout(() => {
            setIsLoading(false)
            setIsPaid(true)
            setAmount('')
            setCard('')
        }, 3000)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            onCloseComplete={() => setIsPaid(false)}
        >
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    {!isPaid &&
                        <ModalHeader>Pagamento para {user?.name}</ModalHeader>
                    }
                    <ModalCloseButton />
                    <ModalBody>
                        {isPaid ?
                            (<Text fontSize='lg' color={isSuccessful ? 'green' : 'red'}>
                                {isSuccessful ? 'Successful payment' : 'Failed payment'}
                            </Text>) :
                            <Box
                                as='form'
                                onSubmit={handlePaymentSubmit}
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                            >
                                <CurrencyInput amount={amount} setAmount={setAmount} />
                                <Select
                                    placeholder='Select a card...'
                                    size='md'
                                    margin='20px 0'
                                    required
                                    value={card}
                                    onChange={e => setCard(e.target.value)}
                                >
                                    {cards.map(card => (
                                        <option key={card.card_number} value={card.card_number}>
                                            Card ending in {card.card_number.substring(12)}
                                        </option>
                                    ))}
                                </Select>
                                <Button type="submit" colorScheme='blue' mr={3} marginBottom='10px' isLoading={isLoading} >
                                    Pay
                                </Button>
                            </Box>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Modal>
    )
}