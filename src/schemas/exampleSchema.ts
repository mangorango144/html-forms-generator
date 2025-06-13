import type { Schema } from "../types";

export const exampleSchema: Schema = {
  birthdate: {
    type: "date",
    label: "Date of birth",
    hint: "We will send you a gift!",
  },
  gender: {
    type: "select",
    options: [
      [0, "Male"],
      [1, "Female"],
      [9, "Do not specify"],
    ],
    placeholder: "Please select",
  },
  address: {
    type: "schema",
    schema: {
      zip: {
        type: "text",
        pattern: "[1-9]{1}[0-9]{3}",
        placeholder: "1000",
      },
      street: {
        type: "textarea",
        placeholder: "Enter street...",
      },
    },
  },
};
