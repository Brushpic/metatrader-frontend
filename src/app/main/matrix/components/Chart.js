import _ from "@lodash";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const useStyles = makeStyles({
  layoutRoot: {},
});

function Chart(props) {
  const { history } = props.data;
  const [data, setData] = useState();
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    function getBalance(hData) {
      const originData = hData.map((val) => val).reverse();
      const initialBalance = hData.find((val) => val.type === "DEAL_TYPE_BALANCE").profit;
      const id = [];
      const balance = [];
      originData.slice(0, originData.length - 1).forEach((value1, index1) => {
        originData.slice(index1 + 1).forEach((value2, index2) => {
          if (value1.id === value2.id) {
            balance.unshift(value1.profit + value1.commission + value1.swap);
            id.unshift(value1.id);
            // originData.splice(index2, 1);
          }
        });
      });
      balance.unshift(0);
      id.unshift(0);
      return {
        balance: balance.map(
          // eslint-disable-next-line no-shadow
          (_, index) =>
            // eslint-disable-next-line no-bitwise
            (((balance.slice(0, index + 1).reduce((total, va) => total + va, 0) + initialBalance) *
              100) |
              0) /
            100
        ),
        id,
      };
    }
    if (history) {
      setData(getBalance(history));
    }
  }, [history]);

  console.log("hData:::", data);
  const options = {
    chart: {
      type: "area",
      height: "100%",
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    theme: {
      mode: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
    },
    markers: {
      size: 3,
      strokeWidth: 1.5,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      shape: "circle",
      radius: 2,
      hover: {
        size: 5,
      },
    },
    fill: {
      type: "solid",
      opacity: 0.7,
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 1,
        opacityTo: 0.5,
        stops: [30, 100, 100],
      },
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    stroke: {
      show: true,
      curve: "straight",
      lineCap: "butt",
      width: 1.5,
      dashArray: 0,
    },
  };

  const series = [
    {
      name: "Balance",
      fill: "start",
    },
  ];
  _.setWith(options, "fill.colors", [theme.palette.secondary.main]);
  _.setWith(options, "markers.colors", [theme.palette.secondary.main]);
  _.setWith(options, "stroke.colors", [theme.palette.primary.contrastText]);
  _.setWith(options, "markers.strokeColors", [theme.palette.primary.contrastText]);
  _.setWith(options, "grid.borderColor", alpha(theme.palette.primary.contrastText, 0.3));

  if (!data) {
    return (
      <div className="p-24">
        <Typography variant="h4">Current Results</Typography>
        <div className="container relative h-320 sm:h-256 pb-16 flex justify-center items-center">
          No data!
        </div>
      </div>
    );
  }
  return (
    <div className="p-24 sm:p-8">
      <Typography variant="h4">Current Results</Typography>
      <div className="container relative h-320 sm:h-256 pb-16">
        <ReactApexChart
          options={{
            ...options,
            xaxis: {
              ...options.xaxis,
              categories: data.id,
            },
          }}
          series={[
            {
              ...series[0],
              data: data.balance,
            },
          ]}
          type={options.chart.type}
          height={options.chart.height}
        />
      </div>
    </div>
  );
}

export default Chart;
