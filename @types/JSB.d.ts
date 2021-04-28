import JSExtension from "./JSExtension";

declare const JSB : {
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
  defineClass(declar: string, inst: InstMembers, cls: ClsMembers): newAddonClass;
  log(message?: any, ...optionalParams: any[]): void;
}

type newAddonClass = any;

type InstMembers = {
  [k in Exclude<keyof JSExtension,"window">]?: JSExtension[k]
};

type ClsMembers = {
  [k in Exclude<keyof typeof JSExtension,"prototype">]?: typeof JSExtension[k]
};

declare const self : {
  [k:string]: any;
  window: any;
  view: any;
  navigationItem: any;
  webView: any;
}