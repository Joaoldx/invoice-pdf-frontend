import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import * as S from './styles'
import useErnegyBill from 'api/useErnegyBill'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
)

const colors = [
  '#ffffcc',
  '#ffcc99',
  '#ffcccc',
  '#ff99cc',
  '#ffccff',
  '#cc99ff',
  '#ccccff',
  '#99ccff',
  '#ccffff',
  '#99ffcc',
  '#ccffcc',
  '#ccff99',
  '#ee80f1',
  '#97a7ff',
  '#89edb1',
  '#a4c9fa',
  '#fbf9eb',
  '#bbdae5'
]

type IResponse = {
  data: [
    {
      clientNumber: string
      readingDate: number
      readingBill: string
      eletricConsumed: number
      eletricBill: string
      sceeConsumed: number
      sceeBill: string
      compensedErnegy: number
      compensedBill: string
      publicLightingContribution: string
    }
  ]
}

const Main = ({
  title = 'Ernegia elétrica',
  description = 'gráfico resumindo consumo e o custo'
}) => {
  const [ernegyBiils, error] = useErnegyBill() as IResponse[]

  if (error) {
    return (
      <S.Wrapper>
        <S.Title>Erro ao carregar</S.Title>
      </S.Wrapper>
    )
  }

  const labels = []

  for (const item in ernegyBiils.data) {
    const readingDateParsed = new Date(ernegyBiils.data[item].readingDate)
    const month = readingDateParsed.getMonth()
    const year = readingDateParsed.getFullYear()
    const date = `${month}/${year}`

    labels.push(date)
  }

  const resultDatasets = [
    {
      type: 'line' as const,
      borderWidth: 2,
      label: 'Consumio em kWh',
      data: ernegyBiils?.data?.map((item) => item.eletricConsumed),
      stack: 'stack 0',
      fill: true,
      backgroundColor: colors[0]
    },
    {
      type: 'bar' as const,
      label: 'Custo em R$',
      backgroundColor: colors,
      data: ernegyBiils?.data?.map((item) => item.readingBill),
      borderColor: 'white',
      borderWidth: 2
    }
  ]

  const dataSet = {
    datasets: resultDatasets,
    labels: labels
  }

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <Chart type="bar" data={dataSet} />
    </S.Wrapper>
  )
}

export default Main
