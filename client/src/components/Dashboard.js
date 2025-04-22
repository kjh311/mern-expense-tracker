import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-center">Dashboard</h1>
      <SubCategoriesWithTransactions name={"Expenses"} category={"expense"} />
      <br />
      <SubCategoriesWithTransactions name={"Bills"} category={"bills"} />
      <br />
      <SubCategoriesWithTransactions name={"Savings"} category={"savings"} />
      <br />
      <SubCategoriesWithTransactions name={"Income"} category={"income"} />
    </div>
  );
};

export default Dashboard;
