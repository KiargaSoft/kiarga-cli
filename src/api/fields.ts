import { call, CommonApiParams } from ".";

export const fieldComponents = ["line", "text", "number", "select", "code"] as const;

export type FieldComponent = typeof fieldComponents[number]

export interface BlueprintField {
  identifier: string;
  blueprint: string;
  component: FieldComponent;
  label: string;
  placeholder: string;
  help: string;
}

export function listAllFields(blueprint: string, params: Partial<CommonApiParams>) {
  return call(params).get(`blueprint/${blueprint}/fields`).json<Record<string, string>>();
}

export function createField(params: Partial<CommonApiParams>, body: Partial<BlueprintField>) {
  return call(params).post('fields', { json: body }).json<Record<string, any>>()
}