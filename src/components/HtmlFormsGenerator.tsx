import { useState, type ChangeEvent, type FormEvent } from "react";

import { renderSchema } from "./FormRenderer";
import type { Schema } from "../types";
import { exampleSchema } from "../schemas";

export function HtmlFormsGenerator() {
  const [schemaInput, setSchemaInput] = useState<string>("");
  const [parsedSchema, setParsedSchema] = useState<Schema | "INVALID" | null>(
    null
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const parsed: Schema = JSON.parse(schemaInput);
      setParsedSchema(parsed);
    } catch {
      setParsedSchema("INVALID");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSchemaInput(e.target.value);
  };

  return (
    <div className="bg-stone-900 p-6 min-h-screen font-sans text-gray-200">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 font-bold text-white text-3xl">
          HTML Forms Generator
        </h1>
        <p className="mb-6 text-stone-400">
          Paste a JSON schema and click Generate to render the form.
        </p>

        <button
          type="button"
          onClick={() => setSchemaInput(JSON.stringify(exampleSchema, null, 2))}
          className="bg-stone-700 hover:bg-stone-800 mb-4 px-4 py-2 rounded-xl text-white cursor-pointer"
        >
          Click to use example JSON Schema
        </button>

        <form onSubmit={handleSubmit}>
          <textarea
            value={schemaInput}
            onChange={handleChange}
            rows={10}
            className="bg-black p-3 border border-stone-700 rounded-l-xl outline-none w-full text-white resize-y"
            placeholder="Paste JSON schema here..."
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 mt-4 px-5 py-2 rounded-xl text-white cursor-pointer"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={() => setSchemaInput("")}
              className="bg-rose-700 hover:bg-rose-900 mt-4 px-5 py-2 rounded-xl text-white cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        <div className="space-y-6 mt-10">
          {parsedSchema === "INVALID" && (
            <div className="text-red-400">Invalid JSON schema.</div>
          )}

          {parsedSchema &&
            parsedSchema !== "INVALID" &&
            renderSchema(parsedSchema)}
        </div>
      </div>
    </div>
  );
}
