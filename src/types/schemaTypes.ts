export type BaseField = {
  label?: string;
  hint?: string;
  placeholder?: string;
} & Record<string, any>;

export type TextField = BaseField & {
  type: "text" | "date" | "textarea";
};

export type SelectField = BaseField & {
  type: "select";
  options: [string | number, string][];
};

export type SchemaField = BaseField & {
  type: "schema";
  schema: Schema;
};

export type Field = TextField | SelectField | SchemaField;

export type Schema = Record<string, Field>;
