import { createBlueprint } from "@/api/blueprints";
import { program } from "commander";
import { ask, CommonOptions, printSuccess } from "@/utils";

interface BlueprintCommandOptions extends CommonOptions {
  singular: string;
  plural: string;
  description: string;
  fields: boolean;
}

program
  .command('blueprint:create <identifier>')
  .option('--singular <singular>', 'Force a singular name for your blueprint (default: capitalised identifier)')
  .option('--plural <plural>', 'Add a plural name for your blueprint')
  .option('--description <description>', 'Add a description for your blueprint')
  .option('--fields', 'Ask for fields after blueprint has been successfully created')
  .description('Create a blueprint for your project.')
  .action(async (args) => {
    const answers = await ask<BlueprintCommandOptions>([
      {
        name: "singular",
        message: "Name your blueprint in singular? (leave blank to default)",
        type: "input",
      },
      {
        name: "plural",
        message: "Do you want to add a name in plural? (leave blank to default)",
        type: "input",
      },
      {
        name: "description",
        message: "Do you want to add a description?",
        type: "input",
      },
    ], program.opts<Partial<BlueprintCommandOptions>>());

    createBlueprint(answers, {
      identifier: args,
      singular: answers?.singular,
      plural: answers?.plural,
      description: answers?.description,
    }).then(res => {
      printSuccess(`Blueprint "${res.slug}" (with ID: ${res.id}) has been created successfully!`);
    }).catch(err => console.log({err}))
  });

