import { program } from "commander";
import { ask, printSuccess } from "@/utils";
import { BlueprintField, createField, fieldComponents } from "@/api/fields";
import { CommonApiParams } from "@/api";

type BlueprintFieldOption = Omit<BlueprintField, 'identifier' | 'blueprint'> & CommonApiParams

program
  .command('field:create <blueprint> <identifier>')
  .option('--component', `Type of field to create, possible options: ${fieldComponents.join(', ')} (default: ${fieldComponents[0]})`)
  .description('Create field for structure the data of your blueprint.')
  .action(async (blueprint, identifier) => {
    const answers = await ask<BlueprintFieldOption>([
      {
        name: "component",
        message: "Which type is your component? (leave blank to default)",
        type: "list",
        choices: fieldComponents,
      },
      {
        name: "label",
        message: "Add a label to name your field (required)",
        type: "input",
      },
      {
        name: "help",
        message: "Add a help text line to your field",
        type: "input",
      },
      {
        name: "placeholder",
        message: "Add a placeholder text line to your field",
        type: "input",
      },
    ], program.opts<Partial<BlueprintFieldOption>>());

    createField(answers, {
      identifier,
      blueprint,
      label: answers?.label,
      help: answers?.help,
      placeholder: answers?.placeholder,
    }).then(res => {
      printSuccess(`Field "${res.slug}" (with ID: ${res.id}) has been created on blueprint "${res.blueprint_id}" successfully!`);
    }).catch(err => console.log({err}))
  });

