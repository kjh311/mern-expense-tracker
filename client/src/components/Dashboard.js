import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";

const Dashboard = () => {
  return (
    <div className="dashboard p-4">
      <h1 className="text-center">Dashboard</h1>
      <SubCategoriesWithTransactions
        name={"EXPENSES"}
        category={"expense"}
        backgroundColor={"red"}
      />
      <br />
      <SubCategoriesWithTransactions
        name={"BILLS"}
        category={"bills"}
        backgroundColor={"orange"}
      />
      <br />
      <SubCategoriesWithTransactions
        name={"SAVINGS"}
        category={"savings"}
        backgroundColor={"yellow"}
      />
      <br />
      <SubCategoriesWithTransactions
        name={"INCOME"}
        category={"income"}
        backgroundColor={"green"}
      />
    </div>
  );
};

export default Dashboard;
