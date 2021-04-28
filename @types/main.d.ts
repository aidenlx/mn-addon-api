export {};

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

  type newAddonClass = any;

  type InstMembers = {
    [k in Exclude<keyof JSExtension, "window">]?: JSExtension[k];
  } & { [k: string]: any };

  type ClsMembers = {
    [k in Exclude<
      keyof typeof JSExtension,
      "prototype"
    >]?: typeof JSExtension[k];
  } & { [k: string]: any };
}
