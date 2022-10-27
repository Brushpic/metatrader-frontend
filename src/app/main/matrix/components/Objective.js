import _ from "@lodash";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  layoutRoot: {},
});

function Onjective(props) {
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
              100) | 0) / 100
        ),
        id,
      };
    }
    if (history) {
      setData(getBalance(history));
    }
  }, [history]);

  console.log("hData:::", data);

  if (!data) {
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
      <div className="container relative h-320 sm:h-256 pb-16">
        Objective
      </div>
    </div>
  );
}

export default Onjective;
