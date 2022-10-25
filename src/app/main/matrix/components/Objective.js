import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  layoutRoot: {},
});

function Objective() {
  const classes = useStyles();

  return <div className="p-24">Objective</div>;
}

export default Objective;
