import type { Arguments, CommandBuilder } from "yargs"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

type Options = {
    name: string
    upper: boolean | undefined
}

export const command: string = "mdg <in> <out>"
export const desc: string = "mdg <input file> <output file>"

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .positional("input", { type: "string", demandOption: true })
        .positional("output", { type: "string", demandOption: true })

export const handler = (argv: Arguments<Options>): void => {
    const { input, output } = argv
    const greeting = `i: ${input}, o: ${output}!`
    console.log(greeting)
    process.exit(0)
}

yargs(hideBin(process.argv))
    // Use the commands directory to scaffold.
    .commandDir("commands")
    // Enable strict mode.
    .strict()
    // Useful aliases.
    .alias({ h: "help" }).argv
