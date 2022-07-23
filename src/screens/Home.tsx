import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from '../components/Order';

export function Home() {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([
        { 
            id: '1',
            patrimony: '8798464A',
            when: '23/07/2022 às 11:46',
            status: 'open' 
        }, 
        { 
            id: '2',
            patrimony: '222222A',
            when: '23/07/2022 às 11:23',
            status: 'open' 
        }, 
        { 
            id: '3',
            patrimony: '3333333A',
            when: '22/07/2022 às 13:25',
            status: 'closed' 
        }, 
        { 
            id: '4',
            patrimony: '44444A',
            when: '21/07/2022 às 14:39',
            status: 'closed' 
        }, 
        { 
            id: '5',
            patrimony: '55555A',
            when: '20/07/2022 às 07:35',
            status: 'closed' 
        }, 
        { 
            id: '6',
            patrimony: '666666A',
            when: '19/07/2022 às 09:58',
            status: 'closed' 
        }, 
        { 
            id: '7',
            patrimony: '7777777A',
            when: '18/07/2022 às 11:12',
            status: 'closed' 
        }, 
]);

function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }


  return (
    <VStack flex={1} pb={6} bg="gray.700">
        <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}>
            <Logo />
            <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
        </HStack>

        <VStack flex={1} px={6}>
            <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            mt={8}
            mb={4}>
                <Heading color="gray.100">Meus Chamados</Heading>
                <Text color="gray.200">3</Text>
            </HStack>

            <HStack space={3} mb={8}>
                <Filter type="open" title="Em Andamento" onPress={() =>setStatusSelected('open')} isActive={statusSelected === 'open'}/>
                <Filter type="closed" title="Finalizados" onPress={() =>setStatusSelected('closed')} isActive={statusSelected === 'closed'}/>
            </HStack>

            <FlatList 
            data={orders} 
            keyExtractor={item => item.id} 
            renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />} 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingBottom: 50 }}
            ListEmptyComponent={ () => (
                <Center>
                    <ChatTeardropText color={colors.gray[300]} size={40}/>
                    <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">Você ainda não possui {'\n'} solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}</Text>
                </Center>
            ) }/>

            <Button title='Nova Solicitação' onPress={handleNewOrder} />

        </VStack>
    </VStack>
  );
}