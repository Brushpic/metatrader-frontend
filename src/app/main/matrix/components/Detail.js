import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  layoutRoot: {},
});

function Detail() {
  const classes = useStyles();

  return <div className="p-24">Detail</div>;
}

export default Detail;
