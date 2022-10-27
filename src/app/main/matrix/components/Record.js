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

function Record(props) {
  const { history, accountList } = props.data;
  const classes = useStyles();
  const theme = useTheme();
  const [record, setRecord] = useState([]);

  function floorNumber(number, digit) {
    // eslint-disable-next-line no-bitwise
    return ((number * 100) | 0) / 100;
  }

  useEffect(() => {
    function getRecord(hData) {
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
              ticket: value1.id,
              open: moment(value2.time).format("MMM Do YYYY hh:mm:ss"),
              type: value2.type === "DEAL_TYPE_SELL" ? "sell" : "buy",
              volume: value1.volume,
              symbol: value1.symbol,
              oPrice: value2.price,
              stopLoss: value1.stopLoss || 0,
              takeProfit: value1.takeProfit || 0,
              close: moment(value1.time).format("MMM Do YYYY hh:mm:ss"),
              price: value1.price,
              swap: value1.swap,
              commission: value1.commission,
              profit: value1.profit,
              pips:
                value2.type === "DEAL_TYPE_SELL"
                  ? (value2.price - value1.price) * initialBalance
                  : (value1.price - value2.price) * initialBalance,
              duration: moment(value1.time).diff(value2.time, "second"),
            });
          }
        });
      });
      return dailyArr;
    }
    if (history) {
      setRecord(getRecord(history));
    }
  }, [history]);

  console.log("Record:::", record);

  if (!record) {
    return (
      <div className="p-24">
        <Typography variant="h4">Records</Typography>
        <div className="container relative h-320 sm:h-256 pb-16 flex justify-center items-center">
          No data!
        </div>
      </div>
    );
  }
  return (
    <div className="p-24">
      <Typography variant="h4">Records</Typography>
      <Grid item xs={12}>
        <div className="table-responsive flex h-320 overflow">
          <Table className="w-full min--w-full">
            <TableHead className="sticky top-0">
              <TableRow className="h-64">
                {[
                  "Ticket",
                  "Open",
                  "Type",
                  "Volume",
                  "Symbol",
                  "O.Price",
                  "SL",
                  "TP",
                  "Close",
                  "Price",
                  "Swap",
                  "Comm.",
                  "Profit",
                  "Pips",
                  "Duration",
                ].map((column) => (
                  <TableCell key={column}>
                    <Typography color="textSecondary" className="font-semibold whitespace-nowrap">
                      {column}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="sticky left-0">
              {record.map((value) => (
                <TableRow key={value.id} className="h-64">
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-12 font-700 px-4 py-4 rounded-4">
                      {value.ticket}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.open}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.type}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.volume}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.oPrice}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.stopLoss}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.takeProfit}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.close}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.price}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.swap}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.commission}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.profit}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {
                        // eslint-disable-next-line no-bitwise
                        value.pips | 0
                      }
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography className="inline text-11 font-500 px-4 py-4 rounded-4">
                      {value.duration}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Grid>
    </div>
  );
}

export default Record;
