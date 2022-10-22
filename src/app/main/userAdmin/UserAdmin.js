import { useEffect } from "react";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);
  const users = useSelector(({ userAdmin }) => userAdmin.userReducer?.users?.results);

  const options = {
    actionsColumnIndex: -1,
    tableLayout: "auto",
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
      lookup: { admin: "admin", user: "user" },
    },
    { title: "Street", field: "street" },
    { title: "City", field: "city" },
    { title: "Postal Code", field: "postalCode" },
    { title: "Country", field: "country" },
  ];

  return (
    <Grid>
      <Editable data={users} title="Users" columns={fields} editable={editable} options={options} />
    </Grid>
  );
};

export default Users;
