import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import moment from "moment";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  layoutRoot: {},
});

function floorNumber(number, digit) {
  // eslint-disable-next-line no-bitwise
  return ((number * 100) | 0) / 100;
}

function Onjective(props) {
  const { history } = props.data;
  const [objective, setObjective] = useState();
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    function getObjective(hData) {
      const originData = hData.map((val) => val).reverse();
      const initialBalance = hData.find((val) => val.type === "DEAL_TYPE_BALANCE").profit;
      const dailyArr = [];
      originData.slice(0, originData.length - 1).forEach((value1, index1) => {
        originData.slice(index1 + 1).forEach((value2, index2) => {
          if (value1.id === value2.id) {
            const day = moment(value1.time).format("MMM Do");
            const vol = value1.volume;
            const profit = value1.profit + value1.commission + value1.swap;

            dailyArr.unshift({
              id: value1.id,
              day,
              volume: vol,
              profit,
            });
          }
        });
      });

      const dailyObj = dailyArr.reduce((total, value) => {
        return {
          ...total,
          [value.day]: {
            number: total[value.day]?.number + 1 || 1,
            volume: total[value.day]?.volume + value.volume || value.volume,
            profit: total[value.day]?.profit + value.profit || value.profit,
          },
        };
      }, {});
      const tradingDay = Object.keys(dailyObj).length;
      const maxDailyLoss = Math.min(...dailyArr.map((value) => value.profit));
      const maxLoss = Math.min(
        // eslint-disable-next-line no-shadow
        ...dailyArr.map((_, index) =>
          dailyArr.slice(0, index + 1).reduce((total, va) => total + va.profit, 0)
        )
      );
      const maxProfit = Math.max(
        // eslint-disable-next-line no-shadow
        ...dailyArr.map((_, index) =>
          dailyArr.slice(0, index + 1).reduce((total, va) => total + va.profit, 0)
        )
      );
      return {
        tradingDay: {
          value: tradingDay,
          title: `Minimun 10 trading days`,
          passed: tradingDay >= 10,
        },
        maxDailyLoss: {
          value: maxDailyLoss,
          title: `Max Daily Loss -$${initialBalance * 0.05}.`,
          passed: maxDailyLoss >= initialBalance * 0.05,
        },
        maxLoss: {
          value: maxLoss,
          title: `Max Loss -$${initialBalance * 0.1}.`,
          passed: maxLoss >= initialBalance * 0.1,
        },
        maxProfit: {
          value: maxProfit,
          title: `Profit target ${initialBalance * 0.1}`,
          passed: maxProfit >= initialBalance * 0.1,
        },
      };
    }
    if (history) {
      setObjective(getObjective(history));
    }
  }, [history]);

  console.log("Objective:::", objective);

  if (!objective) {
    return (
      <div className="p-24">
        <Typography variant="h4">Objective</Typography>
        <div className="container relative h-320 sm:h-256 pb-16 flex justify-center items-center">
          No data!
        </div>
      </div>
    );
  }
  return (
    <div className="p-24">
      <Typography variant="h4">Objective</Typography>
      <div className="container relative pb-16">
        <Grid item xs={12}>
          <Typography variant="h5">Statistics</Typography>
          <div className="table-responsive flex">
            <Table className="w-1/2 sm:w-full">
              <TableHead className="sticky top-0">
                <TableRow className="h-64">
                  {["Trading Objectives", "Results", "Summery"].map((column) => (
                    <TableCell key={column}>
                      <Typography color="textSecondary" className="font-semibold whitespace-nowrap">
                        {column}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(objective).map((key) => (
                  <TableRow key={key} className="h-64">
                    <TableCell component="th" scope="row">
                      <Typography className="inline text-12 font-700 px-8 py-4 rounded-4">
                        {objective[key].title}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography className="inline text-12 font-700 px-8 py-4 rounded-4">
                        {floorNumber(objective[key].value)}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography className="inline text-12 font-700 px-8 py-4 rounded-4">
                        {objective[key].passed ? "Passed" : "Not Passed"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default Onjective;
