/* eslint-disable react/jsx-no-bind */
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

const rows = [
  {
    id: "accountName",
    align: "left",
    disablePadding: false,
    label: "Account Name",
    sort: true,
  },
  {
    id: "login",
    align: "left",
    disablePadding: false,
    label: "Login",
    sort: true,
  },
  {
    id: "serverName",
    align: "right",
    disablePadding: false,
    label: "Server",
    sort: true,
  },
  {
    id: "tradeAllowed",
    align: "right",
    disablePadding: false,
    label: "Status",
    sort: true,
  },
  {
    id: "state",
    align: "right",
    disablePadding: false,
    label: "Active",
    sort: false,
  },
];

function AccountListTableHead(props) {
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === "right" ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default AccountListTableHead;
