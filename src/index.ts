import { readFileSync } from "fs";
import { Logger } from "./Logger";
import { exec as executeCommand } from "child_process";
import * as path from "path";
import { existsSync as pathExists } from "fs";
import { sync as rimraf } from "rimraf";
import * as repositoryURL from "get-repository-url";
import * as semver from "semver";

export interface IDependencies {
  dependencies: {
    [key: string]: string
  }, devDependencies: {
    [key: string]: string
  }
};

export class Cloner {

  static async loadProject(url: string): Promise < void > {
    throw new Error("not implemented .. yet")
  }

  static async parsePackageJSON(path ? : string): Promise < IDependencies > {

    path = path || "./package.json";
    try {
      const pkg = JSON.parse(readFileSync(path, "utf-8").toString());
      Logger.info("Cloner parsing:", pkg.name)
      return {
        dependencies: pkg.dependencies || {},
        devDependencies: pkg.devDependencies || {}
      };
    } catch (error) {
      Logger.error("Cloner", error.message);
    }
  }

  static async cloneShallow(deps: IDependencies, only?: "prod" | "dev", outDir: string = "./tmp/") {
    var errors: Array <Error>;
    const promises: Array <Promise<void | {}>> = [];

    let _deps = {};
    switch (only) {
      case "prod":
        _deps = deps.dependencies;
        break;
      case "dev":
        _deps = deps.devDependencies;
        break;
      default:
        _deps = Object.assign(deps.dependencies, deps.devDependencies);
        break;
    }
    for (const repoName in _deps) {

      var url = _deps[repoName];
      var repoVersion:string;
      var repoUrl:string;
      if (null === url.match(/^(git)?\+?(https?|ssh)\:\/\/\S*$/)) {
        // this not a direct url
        repoVersion = semver.valid(semver.coerce(url));
        repoUrl = await repositoryURL(repoName);
        Logger.success(repoUrl, repoVersion);
      }
      else {
        repoUrl = url.split("#")[0].replace('git+', '');
        repoVersion = url.split("#")[1];
      }
      Logger.info("Cloner cloning", repoUrl, "@", repoVersion);
      promises.push(Cloner.cloneRepo(repoName, repoUrl, repoVersion, outDir).catch((reason) => {
        errors = errors || [];
        errors.push(reason);
      }));
    }

   // try {
    await Promise.all(promises);
    if (errors) {
      throw new Error("There were errors cloning: " + errors.map((err) => {
        return err.message
      }));
    }
  }

  private static async cloneRepo(name: string, url: string, tagOrBranch: string, outDir: string = "./tmp/"): Promise < {} > {
    outDir = path.join(outDir, name);
    return new Promise((resolve, reject) => {
      if (pathExists(outDir)) rimraf(outDir);
      const cmd = `git clone -b ${tagOrBranch} --depth 1 ${url} ${outDir}`;
      executeCommand(cmd, (error: Error) => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
}