import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
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
  },
  tooltip: {
    fillSeriesColor: true,
    theme: theme.colors.gray[600],
    marker: {
      fillColors: [theme.colors.gray[600]],
    },
    cssClass: "tooltip-chart",
    inverseOrder: true,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2019-09-19T00:00:00.000Z",
      "2019-09-20T00:00:00.000Z",
      "2019-09-21T00:00:00.000Z",
      "2019-09-22T00:00:00.000Z",
      "2019-09-23T00:00:00.000Z",
      "2019-09-24T00:00:00.000Z",
      "2019-09-25T00:00:00.000Z",
    ],
  },
};
const series = [
  {
    name: "Inscritos",
    data: [31, 120, 12, 44, 66, 27, 193],
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p="8" bg="gray.800" borderRadius={8} height="100%">
            <Text fontSize={"lg"} mb="4">
              Inscritos da semana
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8} height="100%">
            <Text fontSize={"lg"} mb="4">
              Taxa de abertura
            </Text>
            <Chart type="area" height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
