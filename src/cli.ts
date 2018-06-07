import { Cloner, IDependencies } from "./";
import { Logger } from "./Logger";
import * as commandLineArgs from 'command-line-args';

const optionDefinitions = [
  { name: 'packageJSON', alias: 'p', type: String },
  { name: 'outDir', alias: 'o', type: String, defaultValue: "./tmp" }
]

const options: { packageJSON: string, outDir: string } = commandLineArgs(optionDefinitions) as { packageJSON: string, outDir: string }


if (!options.packageJSON) throw new Error("Missing argument --packageJSON");
if (options.packageJSON.indexOf("package.json") === -1) throw new Error("--packageJSON argument does not point to package.json file");

const time = Date.now();
Cloner.parsePackageJSON(options.packageJSON).then(async (data: IDependencies)=> {
  //console.log(data);
  try {
    await Cloner.cloneShallow(data, "prod", options.outDir);
    Logger.success(`Cloning took ${(Date.now() - time)/1000} seconds`)
  } catch (error) {
    Logger.error(error)
  }
});

