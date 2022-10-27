import FusePageSimple from "@fuse/core/FusePageSimple";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";

import { getMatrix } from "app/main/redux/actions/matrixActions";
// import { useEffect, useState } from 'react';

import Chart from "./components/Chart";
import Detail from "./components/Detail";
import Objective from "./components/Objective";
import Record from "./components/Record";

const useStyles = makeStyles({
  layoutRoot: {},
});

function Matrix(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const routeParams = useParams();

  const historyTrade = useSelector(({ userAdmin }) => userAdmin.matrixReducer.historyTrade);

  const { accountInfo } = historyTrade;

  console.log("history::", historyTrade);

  useDeepCompareEffect(() => {
    const { login } = routeParams;
    dispatch(getMatrix(login));
  }, [dispatch, routeParams]);

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <Grid container className="p-24 flex justify-between items-center w-full">
          <Grid item className="flex" xs={6}>
            <Typography variant="h5" className="mr-8">
              Login:
            </Typography>
            <Typography variant="h6">{routeParams.login}</Typography>
          </Grid>
          <Grid item className="flex" xs={6}>
            <Typography variant="h5" className="mr-8">
              Balance:
            </Typography>
            <Typography variant="h6">{accountInfo && accountInfo.balance}</Typography>
          </Grid>
        </Grid>
      }
      content={
        <div className="p-24">
          <Chart data={historyTrade} />
          <Objective data={historyTrade} />
          <Detail data={historyTrade} />
          <Record data={historyTrade} />
        </div>
      }
    />
  );
}

export default Matrix;
