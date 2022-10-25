import { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Editable from "app/shared-components/table";
import {
  getUserList,
  addNewUser,
  updateUser,
  deleteUser,
} from "app/main/redux/actions/userAdminActions";
import { Grid } from "@material-ui/core";

const Users = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);
  const users = useSelector(({ userAdmin }) => userAdmin.userReducer?.users?.results);

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

  const editable = {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(addNewUser({ ...newData, password: "aaaa1111" }));
          resolve();
        }, 1000);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(updateUser(oldData.id, newData));
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(deleteUser(oldData.id));
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
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phoneNumber" },
    {
      title: "Role",
      field: "role",
      lookup: { admin: "Admin", user: "User" },
    },
    { title: "Street", field: "street" },
    { title: "City", field: "city" },
    { title: "Postal Code", field: "postalCode" },
    { title: "Country", field: "country" },
  ];

  return (
    <Grid className="mt-64">
      <Editable data={users} title="Users" columns={fields} editable={editable} options={options} />
    </Grid>
  );
};

export default Users;
