import { format } from "date-fns";

const datePretty = (date) => {
  try {
    // Ensure UTC date to avoid different dates depending on local timezone where code is run
    const dateAsObject = new Date(date);
    const day = dateAsObject.getUTCDate();
    const month = dateAsObject.getUTCMonth();
    const year = dateAsObject.getUTCFullYear();

    return format(new Date(year, month, day), "dd LLLL yyyy");
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
