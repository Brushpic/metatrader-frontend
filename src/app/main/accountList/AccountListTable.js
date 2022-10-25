/* eslint-disable react/jsx-no-bind */
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Icon from "@material-ui/core/Icon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import history from "@history";

import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import {
  getAccountList,
  openCredentialAccountDialog,
} from "app/main/redux/actions/accountListActions";
import AccountTableHead from "./AccountTableHead";

function AccountListTable(props) {
  const dispatch = useDispatch();
  const accounts = useSelector(({ userAdmin }) => userAdmin.accountListReducer.accounts);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(accounts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  const theme = useTheme();

  useEffect(() => {
    dispatch(getAccountList()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setData(accounts);
  }, [accounts]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleClick(login) {
    history.push(`matrix/${login}`);
  }

  function handleCredential(event, login) {
    event.stopPropagation();
    dispatch(openCredentialAccountDialog(login));
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no accounts to show!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <AccountTableHead onRequestSort={handleRequestSort} order={order} />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case "categories": {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={n.id}
                    onClick={() => handleClick(n.login)}
                  >
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.accountName}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n.login}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.serverName}
                      <i
                        className={clsx(
                          "inline-block w-8 h-8 rounded mx-8",
                          n.connectionStatus === "DISCONNECTED" && "bg-red",
                          n.connectionStatus !== "DISCONNECTED" && "bg-blue"
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      {n.tradeAllowed ? (
                        <Icon className="text-green text-20">check_circle</Icon>
                      ) : (
                        <Icon className="text-red text-20">remove_circle</Icon>
                      )}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      <IconButton
                        sx={{ backgroundColor: theme.palette.primary.dark }}
                        className="bg-blue-600"
                        onClick={(e) => handleCredential(e, n.login)}
                      >
                        <Icon>vpn_key</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(AccountListTable);
