import { Center, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { Circles } from "react-loader-spinner"
import { PaymentModal } from "./components/PaymentModal"
import { ToggleTheme } from "./components/ToggleTheme"
import { UserBox } from "./components/UserBox"
import { useApi } from "./hooks/useApi"
import { IUser } from "./types/User"

export const App = () => {
  const api = useApi()
  const { users, isLoading } = api.getUsers<IUser[]>();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex w='100vw' h='100vh' direction='column' overflow='auto'>
      {isLoading ?
        (<Center w='100vw' h='100vh'>
          <Circles
            height="200"
            width="200"
            color="#A0AEC0"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Center>) :
        (<Flex direction='column' w='95%' maxW='1200px' margin='0 auto'>
          <Text fontWeight='semibold' fontSize='5xl'>Pay.Me</Text>
          {users?.map(user => (
            <UserBox key={user.id} user={user} onOpen={onOpen} setSelectedUser={setSelectedUser} />
          ))}
          <PaymentModal isOpen={isOpen} onClose={onClose} user={selectedUser} />
        </Flex>)
      }
      <ToggleTheme />
    </Flex>
  )
}