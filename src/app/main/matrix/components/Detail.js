import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import moment from "moment";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  layoutRoot: {},
});

function Detail(props) {
  const { history, accountInfo } = props.data;
  const classes = useStyles();
  const theme = useTheme();

  const [statics, setStatics] = useState([]);
  const [dailyResult, setDailyResult] = useState([]);

  function floorNumber(number) {
    // eslint-disable-next-line no-bitwise
    return ((number * 100) | 0) / 100;
  }
  useEffect(() => {
    function getStatics(hData, account) {
      const balance1 = account.balance;
      const { equity } = account;
      const originData = hData.map((val) => val).reverse();
      const initialBalance = hData.find((val) => val.type === "DEAL_TYPE_BALANCE").profit;
      const profit = [];
      let lots = 0;
      originData.slice(0, originData.length - 1).forEach((value1, index1) => {
        originData.slice(index1 + 1).forEach((value2, index2) => {
          if (value1.id === value2.id) {
            profit.unshift(value1.profit + value1.commission + value1.swap);
            lots += value1.volume;
          }
        });
      });
      const plusProfit = profit.filter((val) => val > 0);
      const loss = profit.filter((val) => val < 0);
      return {
        Equity: equity,
        Balance: balance1,
        "No. of Trades": profit.length,
        Lots: lots,
        // eslint-disable-next-line no-bitwise
        "Win Rate": floorNumber((plusProfit.length / profit.length) * 100),
        "Average Profit": floorNumber(
          plusProfit.reduce((total, value) => total + value, 0) / plusProfit.length
        ),
        "Average Loss": floorNumber(loss.reduce((total, value) => total + value, 0) / loss.length),
        "Average RRR": Math.abs(
          floorNumber(
            plusProfit.reduce((total, value) => total + value, 0) /
              ((loss.reduce((total, value) => total + value, 0) * plusProfit.length) / loss.length)
          )
        ),
        Expectancy: floorNumber((balance1 - initialBalance) / profit.length),
        "Profit factor": Math.abs(
          floorNumber(
            plusProfit.reduce((total, value) => total + value, 0) /
              loss.reduce((total, value) => total + value, 0)
          )
        ),
      };
    }
    function getDailyResult(hData) {
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
      return dailyArr.reduce((total, value) => {
        return {
          ...total,
          [value.day]: {
            number: total[value.day]?.number + 1 || 1,
            volume: total[value.day]?.volume + value.volume || value.volume,
            profit: total[value.day]?.profit + value.profit || value.profit,
          },
        };
      }, {});
    }
    if (history && accountInfo) {
      setStatics(getStatics(history, accountInfo));
      setDailyResult(getDailyResult(history, accountInfo));
    }
  }, [history, accountInfo]);

  console.log("DailyResult:::", dailyResult);

  if (!dailyResult || !statics) {
    return (
      <div className="p-24">
        <Typography variant="h4">Statistics</Typography>
        <div className="container relative h-320 sm:h-256 pb-16 flex justify-center items-center">
          No data!
        </div>
      </div>
    );
  }
  return (
    <div className="p-24">
      <Typography variant="h4">Statistics</Typography>
      <Grid container className="relative pb-16" spacing={4}>
        <Grid item sm={6} xs={12}>
          <Typography variant="h5">Statistics</Typography>
          <div className="table-responsive flex">
            <Table className="w-1/2 sm:w-full">
              <TableBody>
                {Object.keys(statics)
                  .slice(0, parseInt(Object.keys(statics).length / 2, 10))
                  .map((key) => (
                    <TableRow key={key} className="h-64">
                      <TableCell component="th" scope="row">
                        <Typography className="inline text-12 font-700 px-8 py-4 rounded-4">
                          {key}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="inline text-11 font-500 px-8 py-4 rounded-4">
                          {statics[key]}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Table className="w-1/2 sm:w-full">
              <TableBody>
                {Object.keys(statics)
                  .slice(parseInt(Object.keys(statics).length / 2, 10))
                  .map((key) => (
                    <TableRow key={key} className="h-64">
                      <TableCell component="th" scope="row">
                        <Typography className="inline text-12 font-700 px-8 py-4 rounded-4">
                          {key}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="inline text-11 font-500 px-8 py-4 rounded-4">
                          {statics[key]}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Typography variant="h5">Daily Summary</Typography>
          <div className="table-responsive flex h-320 overflow">
            <Table className="w-full min--w-full">
              <TableHead>
                <TableRow className="h-64">
                  {["Date", "Trades", "Lots", "Result"].map((column) => (
                    <TableCell key={column}>
                      <Typography color="textSecondary" className="font-semibold whitespace-nowrap">
                        {column}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(dailyResult).map((key) => (
                  <TableRow key={key} className="h-64">
                    <TableCell component="th" scope="row">
                      <Typography className="inline text-12 font-700 px-8 py-4 rounded-4">
                        {key}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography className="inline text-11 font-500 px-8 py-4 rounded-4">
                        {dailyResult[key].number}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography className="inline text-11 font-500 px-8 py-4 rounded-4">
                        {floorNumber(dailyResult[key].volume)}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography className="inline text-11 font-500 px-8 py-4 rounded-4">
                        {floorNumber(dailyResult[key].profit)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Detail;
