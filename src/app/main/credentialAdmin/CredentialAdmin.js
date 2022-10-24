import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import Editable from "app/shared-components/table";
import {
  getCredentialList,
  addNewCredential,
  deleteCredential,
  openCreateAccountDialog,
  registeCredential,
} from "app/main/redux/actions/credentialAdminActions";
import { Box, Grid, Icon, IconButton } from "@material-ui/core";
import CreateAccountDialog from "./CreateAccountDialog";

const Credential = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCredentialList());
  }, [dispatch]);
  const credentials = useSelector(({ userAdmin }) => userAdmin.credentialReducer.credentials);

  const options = {
    actionsColumnIndex: -1,
    tableLayout: "auto",
    paging: true,
    pageSize: 10, // make initial page size
    emptyRowsWhenPaging: false, // To avoid of having empty rows
    pageSizeOptions: [10, 20, 30, 50], // rows selection options
    rowStyle: (rowData) => {
      return {
        backgroundColor: rowData.status ? theme.palette.primary.dark : theme.palette.primary[400],
        color: theme.palette.secondary.light,
      };
    },
  };

  const actions = [
    {
      icon: "save",
      tooltip: "Register user to cloud!",
      // eslint-disable-next-line no-alert
      onClick: (event, rowData) => !rowData.status && dispatch(registeCredential(rowData)),
    },
  ];

  const editable = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(addNewCredential(newData));
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(deleteCredential(oldData.login));
          resolve();
        }, 1000);
      }),
  };
  const fields = [
    {
      title: "Status",
      field: "status",
      lookup: { false: "Unregisterd", true: "Registered" },
    },
    { title: "Name", field: "name" },
    { title: "User Email", field: "userEmail" },
    { title: "Login", field: "login" },
    { title: "Server Name", field: "serverName" },
    { title: "Platform", field: "platform" },
    { title: "Password", field: "password" },
    { title: "Investor Password", field: "investorPassword" },
  ];

  return (
    <Grid>
      <Box className="flex justify-end items-center my-12 mx-24">
        <IconButton
          sx={{ backgroundColor: theme.palette.primary.dark }}
          className="bg-blue-600"
          size="large"
          onClick={() => dispatch(openCreateAccountDialog())}
        >
          <Icon>add</Icon>
        </IconButton>
      </Box>
      {credentials && (
        <Editable
          data={credentials}
          title="Credentials"
          columns={fields}
          editable={editable}
          options={options}
          actions={actions}
        />
      )}
      <CreateAccountDialog />
    </Grid>
  );
};

export default Credential;
