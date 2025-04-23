export const getActionWord = (category) => {
  switch (category) {
    case "savings":
      return "Save";
    case "expense":
      return "Spend";
    case "income":
      return "Earn";
    case "bills":
      return "Pay";
    default:
      return "";
  }
};

export const getActionWordPassedTense = (category) => {
  switch (category) {
    case "savings":
      return "Saved";
    case "expense":
      return "Spent";
    case "income":
      return "Earned";
    case "bills":
      return "Paid";
    default:
      return "";
  }
};

export const getColorActionWords = (category) => {
  switch (category) {
    case "savings":
      return "text-red-500";
    case "bills":
      return "text-red-500";
    case "income":
      return "text-red-500";
    case "expense":
      return "text-green-500";
    default:
      return "";
  }
};
