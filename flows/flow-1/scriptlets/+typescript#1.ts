import type { Context } from "@oomol/types/oocana";

type Inputs = {
  input: unknown;
}
type Outputs = {
  output: unknown;
}

export default async function(
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {

  // your code

  return { output: params.input };
};
