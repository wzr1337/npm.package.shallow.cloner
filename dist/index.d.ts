export interface IDependencies {
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
}
export declare class Cloner {
    static loadProject(url: string): Promise<void>;
    static parsePackageJSON(path?: string): Promise<IDependencies>;
    static cloneShallow(deps: IDependencies, only?: "prod" | "dev", outDir?: string): Promise<void>;
    private static cloneRepo(name, url, tagOrBranch, outDir?);
}
