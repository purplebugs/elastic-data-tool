import { format } from "date-fns";

const datePretty = (date) => {
  try {
    return format(date, "dd LLL yyyy");
  } catch (error) {
    console.error(error);
    throw new Error("🧨 datePretty: Could not transform");
  }
};

export const dateTransformer = (date, label = "") => {
  try {
    if (date === null || date === undefined || date === "") {
      return null;
    }

    if (label === "") {
      console.log("[LOG] Missing label for date object");
      return null;
    }

    let obj = {};

    // obj[label] = {} // sets name of key on object, eg if label = "DOB" create object:  "DOB": {}

    obj[label] = {
      pretty: datePretty(date),
      original: date,
    };

    return obj;
  } catch (error) {
    console.error(error);
    throw new Error("🧨 dateTransformer: Could not transform");
  }
};
