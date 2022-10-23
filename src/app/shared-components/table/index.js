import MaterialTable from "material-table";
// import TableViewIcon from '@mui/icons-material/TableView';

const Editable = ({ columns, title, data, editable, options }) => {
  return (
    <MaterialTable
      // icons={}
      title={title}
      options={options}
      columns={columns}
      data={data}
      editable={editable}
    />
  );
};

export default Editable;
