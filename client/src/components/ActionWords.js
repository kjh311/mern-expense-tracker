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

export const getColorActionWords = (category, dayTheme) => {
  switch (category) {
    case "savings":
      return "text-red-200";
    case "bills":
      return "text-red-200";
    case "income":
      return "text-red-200";
    case "expense":
      return "text-green-200";
    default:
      return "";
  }
};

export const PostNewTransactionHeaderColors = (category, dayTheme) => {
  let color = "";

  switch (category) {
    case "savings":
      color = "yellow";
      break;
    case "expense":
      color = "red";
      break;
    case "income":
      color = "green";
      break;
    case "bills":
      color = "orange";
      break;
    default:
      color = "gray"; // fallback color
  }

  return `accordion-header-${dayTheme ? "day" : "night"}-${color}`;
};

export const PostNewTransactionHighestHeaderColors = (category, dayTheme) => {
  let color = "";

  switch (category) {
    case "savings":
      color = "yellow";
      break;
    case "expense":
      color = "red";
      break;
    case "income":
      color = "green";
      break;
    case "bills":
      color = "orange";
      break;
    default:
      color = "gray";
  }

  return `accordion-header-highest-${dayTheme ? "day" : "night"}-${color}`;
};

export const PostNewTransactionBodyColors = (category, dayTheme) => {
  let color = "";

  switch (category) {
    case "savings":
      color = "yellow";
      break;
    case "expense":
      color = "red";
      break;
    case "income":
      color = "green";
      break;
    case "bills":
      color = "orange";
      break;
    default:
      color = "gray";
  }

  return `overview-accordion-body-${dayTheme ? "day" : "night"}-${color}`;
};

export const PostNewTransactionHighestBodyColors = (category, dayTheme) => {
  let color = "";

  switch (category) {
    case "savings":
      color = "yellow";
      break;
    case "expense":
      color = "red";
      break;
    case "income":
      color = "green";
      break;
    case "bills":
      color = "orange";
      break;
    default:
      color = "gray";
  }

  return `overview-highest-accordion-body-${
    dayTheme ? "day" : "night"
  }-${color}`;
};
