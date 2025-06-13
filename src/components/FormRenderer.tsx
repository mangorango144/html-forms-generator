import React from "react";
import type { Field, Schema } from "../types";
import { capitalize } from "../utils";

export function renderSchema(
  schema: Schema,
  parentKey = ""
): React.JSX.Element[] {
  return Object.entries(schema).map(([field, config]) => {
    const {
      type,
      label,
      hint,
      options,
      schema: nestedSchema,
      ...attributes
    } = config as Field;

    const fieldName = parentKey ? `${parentKey}[${field}]` : field; // Use brackets for nested fields e.g. "adress[zip]"
    const fieldId = fieldName.replace(/\[|\]/g, "_"); // Replace brackets with underscores for HTML ID compatibility e.g. "adress_zip"
    const labelText = label || capitalize(field);

    if (type === "schema") {
      return (
        <fieldset
          key={fieldName}
          className="space-y-3 bg-stone-900 p-4 border border-stone-700 rounded-md"
        >
          <legend className="mb-2 font-semibold text-white text-lg">
            {labelText}
          </legend>
          {renderSchema(nestedSchema as Schema, fieldName)}
        </fieldset>
      );
    }

    return (
      <div key={fieldName}>
        <label
          htmlFor={fieldId}
          className="block mb-1 font-medium text-stone-300"
        >
          {labelText}
        </label>

        {type === "select" ? (
          <select
            id={fieldId}
            name={fieldName}
            className="bg-stone-800 p-2 border border-stone-700 rounded w-full text-white"
            {...attributes}
          >
            {attributes.placeholder && (
              <option value="">{attributes.placeholder}</option>
            )}
            {(options as [string | number, string][]).map(([val, text]) => (
              <option key={String(val)} value={val}>
                {text}
              </option>
            ))}
          </select>
        ) : type === "textarea" ? (
          <textarea
            id={fieldId}
            name={fieldName}
            className="bg-stone-800 p-2 border border-stone-700 rounded-md w-full text-white"
            {...attributes}
          />
        ) : (
          <input
            type={type}
            id={fieldId}
            name={fieldName}
            className="bg-stone-800 p-2 border border-stone-700 rounded-md w-full text-white"
            {...attributes}
          />
        )}

        {hint && <div className="mt-1 text-stone-400 text-sm">{hint}</div>}
      </div>
    );
  });
}
