import OpenAI from "openai";
import chalk from "chalk";

const prompt = process.argv[2];
const version = process.argv[3] ? process.argv[3] : "gpt-3.5-turbo";

let versionFinal = "gpt-3.5-turbo";

if (version === "3.5") {
  versionFinal = "gpt-3.5-turbo";
} else if (version === "4") {
  versionFinal = "gpt-4.0-turbo";
} else if (version === "4o") {
  versionFinal = "gpt-4o";
} else if (
  version !== "gpt-3.5-turbo" &&
  version !== "gpt-4.0-turbo" &&
  version !== "gpt-4o"
) {
  console.log(
    chalk.yellow(`
    - - - - proper usage: "tessa 'prompt' [version]" - - - -
    `)
  );
  throw new Error("Please provide a valid version. (3.5, 4, 4o)");
}

if (!prompt) {
  throw new Error("Please provide a prompt.");
}

const openai = new OpenAI();

async function caller(promptArg) {
  const completion = await openai.chat.completions.create({
    model: versionFinal,
    messages: [
      {
        role: "system",
        content: "you are a helpful AI assistant.",
      },
      { role: "user", content: promptArg },
    ],
  });

  return completion;
}

console.log(
  chalk.yellow(`-
Calling... with version: ${versionFinal}`)
);
console.log(
  chalk.yellow(
    `To use a different version, provide it as an argument after your prompt.
-`
  )
);
caller(prompt).then((result) =>
  console.log(
    chalk.green(`-
response:    
${result.choices[0].message.content}
-`)
  )
);
