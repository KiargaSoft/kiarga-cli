import { program } from "commander";
import { CommonApiParams } from "@/api";
import { listAllFields } from "@/api/fields";

program
  .command('blueprint:list <blueprint>')
  .description('List all blueprints from your project.')
  .action(args => {
    console.log({args})

    // listAllFields(args[0], program.opts<CommonApiParams>()).then(({ data }) => {
    //   console.table(data);
    // });
  });

