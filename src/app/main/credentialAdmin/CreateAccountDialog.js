import { yupResolver } from "@hookform/resolvers/yup";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import _ from "@lodash";
import * as yup from "yup";

import { createAccount, closeCreateAccountDialog } from "../redux/actions/credentialAdminActions";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  serverName: "",
  accountType: "",
  balance: "",
  leverage: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

function CreateAccountDialog(props) {
  const dispatch = useDispatch();
  const dialogStatus = useSelector(({ userAdmin }) => userAdmin.credentialReducer.props);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch("id");
  const name = watch("name");
  const avatar = watch("avatar");

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'new'
     */

    reset({
      ...defaultValues,
    });
  }, [reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (dialogStatus.open) {
      initDialog();
    }
  }, [dialogStatus.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return dispatch(closeCreateAccountDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    dispatch(createAccount(data));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: "m-24",
      }}
      {...dialogStatus}
      // eslint-disable-next-line react/jsx-no-bind
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Create New Account
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: "p-24" }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Name"
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone"
                  id="phone"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  id="email"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">domain</Icon>
            </div>
            <Controller
              control={control}
              name="serverName"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="ServerName"
                  id="serverName"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <Controller
              control={control}
              name="accountType"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Account Type"
                  id="accountType"
                  name="accountType"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="balance"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Balance"
                  id="balance"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <Controller
              control={control}
              name="leverage"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Leverage"
                  id="leverage"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Add
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateAccountDialog;
