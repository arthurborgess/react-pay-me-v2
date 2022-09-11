import { Button, Flex, Image, Text, useColorMode } from "@chakra-ui/react"
import { IUser } from "../types/User"

type Props = {
    user: IUser
    onOpen: () => void
    setSelectedUser: (value: IUser | null | ((prevState: IUser | null) => IUser)) => void
}

export const UserBox = ({ user, onOpen, setSelectedUser }: Props) => {
    const { colorMode } = useColorMode()

    function handlePayClick() {
        onOpen()
        setSelectedUser(user)
    }

    return (
        <Flex
            w='100%'
            h='120px'
            bgColor={colorMode === 'light' ? 'gray.300' : 'gray.700'}
            alignItems='center'
            borderRadius='5px'
            padding='15px'
            marginBottom='5px'
        >
            <Image src={user.img} height='100%' borderRadius='5px' />
            <Flex direction='column' marginLeft='30px' flex='1'>
                <Text fontSize='20px' fontWeight='semibold' marginBottom='10px'>{user.name}</Text>
                <Text>ID: {user.id}</Text>
                <Text>Username: {user.username}</Text>
            </Flex>
            <Button onClick={handlePayClick}>Pay</Button>
        </Flex>
    )
}