/// <reference path="./JSExtension.d.ts" />

export * from "./misc"

/// <reference path="./Objc/Foundation.d.ts" />
export * from "./Objc/Foundation"
/// <reference path="./Objc/UIKit.d.ts" />
export * from "./Objc/UIKit"

/// <reference path="./MarginNote/Application.d.ts" />
export * from "./MarginNote/Application"
/// <reference path="./MarginNote/Events.d.ts" />
export * from "./MarginNote/Events"
/// <reference path="./MarginNote/NoteDatabase.d.ts" />
export * from "./MarginNote/NoteDatabase"
/// <reference path="./MarginNote/Utility.d.ts" />
export * from "./MarginNote/Utility"

export type newAddonClass = any;

export type InstMembers = {
  [k in Exclude<keyof JSExtension, "window">]?: JSExtension[k];
} & { [k: string]: any };

export type ClsMembers = {
  [k in Exclude<
    keyof typeof JSExtension,
    "prototype"
  >]?: typeof JSExtension[k];
} & { [k: string]: any };

declare global {
  const JSB: {
    /**
     * Load addon to MarginNote
     */
    newAddon(mainPath: any): newAddonClass;
    /**
     * Define the main body of the addon
     * @param declar define class interface in Objective C: `${addonName} : JSExtension`
     * @param inst all instance member in the addon class
     * @param cls all class (static) member in the addon class
     */
    defineClass(
      declar: string,
      inst: InstMembers,
      cls: ClsMembers
    ): newAddonClass;
    log(message?: any, ...optionalParams: any[]): void;
  };

  const self: {
    [k: string]: any;
    window: any;
    view: any;
    navigationItem: any;
    webView: any;
  };

  const WebViewController: {
    [k: string]: any;
    new (): any;
  };
}
