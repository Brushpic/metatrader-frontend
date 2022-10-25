import { yupResolver } from "@hookform/resolvers/yup";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";

import { closeCredentialAccountDialog } from "../redux/actions/accountListActions";

const defaultValues = {
  login: "",
  password: "",
  investorPassword: "",
  serverName: "",
  platform: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

function CredentialDialog(props) {
  const dispatch = useDispatch();
  const dialogStatus = useSelector(({ userAdmin }) => userAdmin.accountListReducer.props);

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
      ...dialogStatus.data,
    });
  }, [reset, dialogStatus.data]);

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
    return dispatch(closeCredentialAccountDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
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
            Credential details
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
              name="login"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Login"
                  id="login"
                  error={!!errors.login}
                  helperText={errors?.login?.message}
                  variant="filled"
                  required
                  disabled
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">vpn_key</Icon>
            </div>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  id="password"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">vpn_key</Icon>
            </div>
            <Controller
              control={control}
              name="investorPassword"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Investor Password"
                  id="investorPassword"
                  variant="outlined"
                  fullWidth
                  disabled
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
                  disabled
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
              name="platform"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Platform"
                  id="platform"
                  name="platform"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              )}
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default CredentialDialog;
