import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";
import Overview from "./Overview";
import { useState } from "react";

const Dashboard = () => {
  const [mainAccordionKey, setMainAccordionKey] = useState(null);

  return (
    <>
      <Overview />
      <div className="dashboard p-4">
        <h1 className="text-center">Dashboard</h1>
        <SubCategoriesWithTransactions
          name={"EXPENSES"}
          category={"expense"}
          backgroundColor={"red"}
          mainKey="0"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"BILLS"}
          category={"bills"}
          backgroundColor={"orange"}
          mainKey="1"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"SAVINGS"}
          category={"savings"}
          backgroundColor={"yellow"}
          mainKey="2"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"INCOME"}
          category={"income"}
          backgroundColor={"green"}
          mainKey="3"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
      </div>
    </>
  );
};

export default Dashboard;
