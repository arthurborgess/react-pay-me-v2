import { Input } from "@chakra-ui/react";

type Props = {
    amount: string
    setAmount: (value: string | ((prevVar: string) => string)) => void
}

export const CurrencyInput = ({ amount, setAmount }: Props) => {

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        let currentValue = event.target.value.replace(/[^0-9]/g, '')
        setAmount(formatMoney(Number(currentValue) / 100))
    }

    function formatMoney(value: number): string {
        return value.toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
            minimumFractionDigits: 2
        })
    }

    return (
        <Input
            placeholder='R$ 0,00'
            size='md'
            aria-label="Input money"
            required
            value={amount}
            onChange={handleInputChange}
        />
    )
}