import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  layoutRoot: {},
});

function Record() {
  const classes = useStyles();

  return <div className="p-24">Record</div>;
}

export default Record;
