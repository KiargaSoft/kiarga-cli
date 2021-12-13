import { call, CommonApiParams } from ".";

interface BlueprintPartials {
  identifier: string;
  singular: string;
  plural: string;
  description: string;
}

export function listAllBlueprints(params: Partial<CommonApiParams>) {
  return call(params).get('blueprints').json<Record<string, string>>();
}

export function createBlueprint(params: Partial<CommonApiParams>, body: Partial<BlueprintPartials>) {
  return call(params).post('blueprints', { json: body }).json<Record<string, any>>()
}