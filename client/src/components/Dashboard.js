import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-center">Dashboard</h1>
      <SubCategoriesWithTransactions name={"EXPENSES"} category={"expense"} />
      <br />
      <SubCategoriesWithTransactions name={"BILLS"} category={"bills"} />
      <br />
      <SubCategoriesWithTransactions name={"SAVINGS"} category={"savings"} />
      <br />
      <SubCategoriesWithTransactions name={"INCOME"} category={"income"} />
    </div>
  );
};

export default Dashboard;
