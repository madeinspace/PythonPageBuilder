// #region imports
import _ from 'lodash';
import {
  formatShortDecimal,
  formatNumber,
  formatChangeNumber,
  formatChangePercent,
  idlogo
} from '../../../utils';
import {
  ItemWrapper,
  CrossLink,
  ForecastProductIcon
} from '../../../styles/MainContentStyles';
import EntityTable from '../../../components/table/EntityTable';
import EntityChart from '../../../components/chart/EntityChart';
import { useContext } from 'react';
import { PageContext, ClientContext } from '../../../utils/context';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
// #endregion

// #region population page
const %(PageAlias)sPage = () => {
  const { clientAlias, clientProducts } = useContext(ClientContext);
  const { tableData } = useContext(PageContext);
  const chartData = chartBuilder(tableData);
  const chartLineData = chartLineBuilder(tableData);
  const tableParams = tableBuilder(clientAlias, tableData);

  return (
    <>
      <ItemWrapper>
        <ControlPanel />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityChart data={chartLineData} />
      </ItemWrapper>

      <ItemWrapper>
        <EntityTable
          data={tableParams}
          name={`%(PageAlias)s table name`}
        />
      </ItemWrapper>
    </>
  );
};

// #endregion

export default %(PageAlias)sPage;

// #region Source
const Source = () => (
  <>
    Source: Australian Bureau of Statistics, Regional Population Growth,
    Australia (3218.0). Compiled and presented in economy.id by{' '}
    <a
      href="http://home.id.com.au/about-us/"
      target="_blank"
      title=".id website"
    >
      .id, the population experts.
      <span className="hidden"> (opens a new window)</span>
    </a>
  </>
);
// #endregion

// #region tableBuilder
const tableBuilder = (alias, nodes) => {
  const tableTitle = 'Table title here';
  const anchorName = 'anchorname here';
  const Geoname = nodes[0].Geoname;
  const GeonameSTE = nodes[0].GeonameSTE;
  const GeonameAUS = nodes[0].GeonameAUS;

  return {
    cssClass: '',
    clientAlias: alias,
    source: <Source />,
    anchorName,
    headRows: [
      {
        cssClass: '',
        cols: [
          {
            cssClass: 'table-area-name',
            displayText: tableTitle,
            colSpan: 10
          }
        ]
      },
      {
        cssClass: 'heading',
        cols: [
          {
            cssClass: '',
            displayText: '',
            colSpan: 1
          },
          {
            cssClass: 'even ',
            displayText: Geoname,
            colSpan: 3
          },
          {
            cssClass: 'odd ',
            displayText: GeonameSTE,
            colSpan: 3
          },
          {
            cssClass: 'even ',
            displayText: GeonameAUS,
            colSpan: 3
          }
        ]
      }
    ],
    cols: [
      {
        id: 0,
        displayText: 'Year (ending June 30)',
        cssClass: 'odd first int'
      },
      {
        id: 1,
        displayText: 'Number',
        cssClass: 'even int'
      },
      {
        id: 2,
        displayText: 'Change in number',
        cssClass: 'even int'
      },
      {
        id: 3,
        displayText: 'Change in percent',
        cssClass: 'even int'
      },
      {
        id: 4,
        displayText: 'Number',
        cssClass: 'odd int'
      },
      {
        id: 5,
        displayText: 'Change in number',
        cssClass: 'odd int'
      },
      {
        id: 6,
        displayText: 'Change in percent',
        cssClass: 'odd int'
      },
      {
        id: 7,
        displayText: 'Number',
        cssClass: 'even int'
      },
      {
        id: 8,
        displayText: 'Change in number',
        cssClass: 'even int'
      },
      {
        id: 9,
        displayText: 'Change in percent',
        cssClass: 'even int'
      }
    ],
    footRows: [],
    rows: nodes.map(
      (
        {
          Year,
          Number,
          ChangeYear1Year2,
          Changeper,
          NumberSTE,
          ChangeYear1Year2STE,
          ChangeperSTE,
          NumberAUS,
          ChangeYear1Year2AUS,
          ChangeperAUS
        },
        i: number
      ) => ({
        data: [
          Year,
          Number,
          ChangeYear1Year2,
          Changeper,
          NumberSTE,
          ChangeYear1Year2STE,
          ChangeperSTE,
          NumberAUS,
          ChangeYear1Year2AUS,
          ChangeperAUS
        ],
        formattedData: [
          Year,
          formatNumber(Number),
          formatChangeNumber(ChangeYear1Year2, '--'),
          formatChangePercent(Changeper, '--'),
          formatNumber(NumberSTE),
          formatChangeNumber(ChangeYear1Year2STE, '--'),
          formatChangePercent(ChangeperSTE, '--'),
          formatNumber(NumberAUS),
          formatChangeNumber(ChangeYear1Year2AUS, '--'),
          formatChangePercent(ChangeperAUS, '--')
        ],
        id: i
      })
    ),
    noOfRowsOnInit: 0
  };
};
// #endregion

// #region chartLineBuilder
const chartLineBuilder = nodes => {
  const chartType = 'line';
  const chartTitle = 'Chart title here'
  const clientSerie = _.map(nodes, 'Changeper').reverse();
  const stateSerie = _.map(nodes, 'ChangeperSTE').reverse();
  const australiaSerie = _.map(nodes, 'ChangeperAUS').reverse();
  const categories = _.map(nodes, 'Year').reverse();
  const chartContainerID = 'makeMeUnique'
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const xAxisLegend = 'xAxis legend here'
  const yAxisLegend = 'yAxis legend here'
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: chartType
      },
      title: {
        text: chartTitle
      },
      tooltip: {
        pointFormatter: function() {
          return `<span class="highcharts-color-${
            this.colorIndex
          }">\u25CF</span> ${this.series.name}: ${formatShortDecimal(this.y)}`;
        }
      },
      series: [
        {
          name: nodes[0].Geoname,
          data: clientSerie
        },
        {
          name: nodes[0].GeonameSTE,
          data: stateSerie
        },
        {
          name: nodes[0].GeonameAUS,
          data: australiaSerie
        }
      ],
      xAxis: {
        categories,
        title: {
          text: xAxisLegend
        }
      },
      yAxis: [
        {
          title: {
            text: yAxisLegend
          },
          labels: {
            formatter: function() {
              const formatedNumber = `${formatChangePercent(this.value)}`;
              return formatedNumber;
            }
          }
        }
      ]
    },
    rawDataSource,
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo
  };
};
// #endregion

// #region  chartbuilder
const chartBuilder = nodes => {
  const chartType = 'column';
  const chartTitle = 'Chart title here'
  const chartSubtitle = nodes[0].Geoname
  const serieData = _.map(nodes, 'Number').reverse();
  const categories = _.map(nodes, 'Year').reverse();
  const rawDataSource =
    'Source: Australian Bureau of Statistics, Regional Population Growth, Australia (3218.0). Compiled and presented in economy.id by .id, the population experts.';
  const chartContainerID = 'makeMeUnique2';
  const xAxisLegend = 'xAxis legend here'
  const yAxisLegend = 'yAxis legend here'
  return {
    cssClass: '',
    highchartOptions: {
      chart: {
        type: chartType
      },
      title: {
        text: chartTitle
      },
      subtitle: {
        text: chartSubtitle
      },
      series: [
        {
          name: nodes[0].Geoname,
          data: serieData
        }
      ],
      xAxis: {
        categories,
        title: {
          text: xAxisLegend
        }
      },
      yAxis: [
        {
          title: {
            text: yAxisLegend
          }
        }
      ]
    },
    rawDataSource,
    dataSource: <Source />,
    chartContainerID,
    logoUrl: idlogo
  };
};
// #endregion
