#!/usr/bin/env node

require('dotenv').config()

import { program } from "commander";
import { version } from "../package.json";

program.version(version)
  .option('--api-domain <domain>', `API domain of your Kiarga service (required if running as self hosted).`)
  .option('--project-token <token>', "Your project's token from Kiarga dashboard.")
  .option('-l, --locale <locale>', "Language on which the API will interact.")
  .option('-n, --no-interaction', 'Run the command as non interactive')
  .option('--no-progress', 'Run the command without progress bars');

// Import commands here...
import '@/commands/BlueprintList';
import '@/commands/BlueprintCreate';
import '@/commands/FieldList';
import '@/commands/FieldCreate';

program.parse(process.argv);
