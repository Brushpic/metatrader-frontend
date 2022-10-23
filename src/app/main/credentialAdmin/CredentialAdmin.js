import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Editable from "app/shared-components/table";
import {
  getCredentialList,
  addNewCredential,
  deleteCredential,
} from "app/main/redux/actions/credentialAdminActions";
import { Grid } from "@material-ui/core";

const Credential = () => {
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
        backgroundColor: rowData.status ? "#888" : "#e88",
      };
    },
  };

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
      lookup: { false: "Inactive", true: "Active" },
    },
    { title: "User Email", field: "userEmail" },
    { title: "Login", field: "login" },
    { title: "Server Name", field: "serverName" },
    { title: "Platform", field: "platform" },
    { title: "Password", field: "password" },
    { title: "Investor Password", field: "investorPassword" },
  ];

  return (
    <Grid>
      {credentials && (
        <Editable
          data={credentials}
          title="Credentials"
          columns={fields}
          editable={editable}
          options={options}
        />
      )}
    </Grid>
  );
};

export default Credential;
