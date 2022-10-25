import FusePageCarded from "@fuse/core/FusePageCarded";
import AccountListHeader from "./AccountListHeader";
import AccountListTable from "./AccountListTable";
import CredentialDialog from "./CredentialDialog";

function AccountList() {
  return (
    <>
      <FusePageCarded
        classes={{
          content: "flex",
          contentCard: "overflow-hidden",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        }}
        header={<AccountListHeader />}
        content={<AccountListTable />}
        innerScroll
      />
      <CredentialDialog />
    </>
  );
}

export default AccountList;
