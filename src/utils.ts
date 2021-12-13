import chalk from "chalk";
import inquirer, { DistinctQuestion } from "inquirer";

export interface CommonOptions {
  domain: string;
  token: string;
  locale: string;
  noInteraction: boolean;
  noProgress: boolean;
}

declare type PrintableType = 'error' | 'warning' | 'success' | 'debug' | 'raw';

export function print(msg: string | PrintableType = "", type: PrintableType = "raw"): void | ((msg: string) => void) | Record<PrintableType, (msg: string) => void> {
  const printsObj: Record<PrintableType, (msg: string) => void> = {
    error: (message: string) => printError(msg || message),
    warning: (message: string) => printWarning(msg || message),
    success: (message: string) => printSuccess(msg || message),
    debug: (message: string) => printDebug(msg || message),
    raw: (message: string) => console.log(msg || message),
  };

  if (msg && type) {
    return printsObj[type](msg);
  }

  if (msg in printsObj) {
    return printsObj[msg as PrintableType];
  }

  return printsObj;
}

export interface ConfirmablePrompt {
  confirmation: boolean;
}

export async function ask<T = Record<string, any>>(questions: ((interaction: boolean) => ReadonlyArray<DistinctQuestion<ConfirmablePrompt & T>>) | ReadonlyArray<DistinctQuestion<ConfirmablePrompt & T>>, options: Partial<CommonOptions & T>) {
  const resolvedQuestions = typeof questions === 'function' ? questions(!options.noInteraction) : questions;

  const confirmablePrompt: inquirer.QuestionCollection<ConfirmablePrompt & T> = [
    {
      name: "confirmation",
      message: "Do you want to add more information?",
      type: "confirm",
      default: false,
      when: () => !options.noInteraction,
    },
    ...resolvedQuestions.map(question => {
      if ('when' in question) {
        question.when = (answers) => answers.confirmation;
      }

      return question;
    })
  ];

  return await inquirer.prompt<ConfirmablePrompt & T>(confirmablePrompt);
}

export function printError(msg: string) {
  console.log(chalk.bgRedBright(msg))
}

export function printWarning(msg: string) {
  console.log(chalk.yellow(msg))
}

export function printSuccess(msg: string) {
  console.log(chalk.green(msg))
}

export function printDebug(msg: string) {
  if (process.env.DEBUG) {
    console.log(`[DEBUG] ${msg}`)
  }
}

// export async function wrapDebugInfo(callback: () => Promise<any>) {
//   const start = process.hrtime.bigint();

//   await callback();

//   const end = process.hrtime.bigint();
  
//   print().debug(`Process finished at ${end - start} ns`);
// }
