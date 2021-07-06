import dynamic from 'next/dynamic' // usado para fazer lazy loading
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
 
// import Chart from 'react-apexcharts' feito através do dynamic para não passar pela camada do next de server side rendering

import Header from '../components/Header'
import { Sidebar } from '../components/Sidebar'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // ao colocar essa opção o mesmo só é carregado pelo browser e nunca do lado do servidor
})

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,      
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  }
}

const series= [
  {
    name: 'series1',
    data: [31, 120, 10, 28, 51, 18, 109 ],
  }
]

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex 
        w="100%" 
        my="6" 
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p="8"
            bg="gray.800"
            borderRadius={8}
            // pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          
          <Box
            p="8"
            bg="gray.800"
            borderRadius={8}
            // pb="4"
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
          </Box>
        </SimpleGrid> 
      </Flex>
    </Flex>
  )
}