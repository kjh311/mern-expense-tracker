import { useState } from "react";
import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";
import Overview from "./Overview";

const Dashboard = () => {
  const [mainAccordionKey, setMainAccordionKey] = useState(null);
  const [userName, setUserName] = useState(
    localStorage.getItem("expense-tracker-username")
  );

  return (
    <>
      <div className="dashboard p-4">
        {userName && <h3 className="text-center">Welcome {userName}!</h3>}
        <Overview
          mainKey="0"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />

        <SubCategoriesWithTransactions
          name={"  💸 EXPENSES"}
          category={"expense"}
          backgroundColor={"red"}
          mainKey="1"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"🧾 BILLS"}
          category={"bills"}
          backgroundColor={"orange"}
          mainKey="2"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"🏦 SAVINGS"}
          category={"savings"}
          backgroundColor={"yellow"}
          mainKey="3"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"💰 INCOME"}
          category={"income"}
          backgroundColor={"green"}
          mainKey="4"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
      </div>
    </>
  );
};

export default Dashboard;
