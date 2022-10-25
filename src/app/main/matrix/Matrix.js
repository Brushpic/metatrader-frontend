import FusePageSimple from "@fuse/core/FusePageSimple";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import { useDispatch, useSelector } from "react-redux";
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
        <div className="p-24">
          <h4>Head</h4>
        </div>
      }
      content={
        <div className="p-24">
          <Chart />
          <Objective />
          <Detail />
          <Record />
        </div>
      }
    />
  );
}

export default Matrix;
