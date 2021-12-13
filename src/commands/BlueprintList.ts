import { program } from "commander";
import { listAllBlueprints } from "@/api/blueprints";

program
  .command('blueprint:list')
  .description('List all blueprints from your project.')
  .action(() => {
    const opts = program.opts() as Record<string, any>;

    listAllBlueprints(opts).then(({ data }) => {
      console.table(data);
    });
  });

