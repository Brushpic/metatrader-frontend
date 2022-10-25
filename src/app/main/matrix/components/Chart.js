import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  layoutRoot: {},
});

function Chart() {
  const classes = useStyles();

  return <div className="p-24">Chart</div>;
}

export default Chart;
