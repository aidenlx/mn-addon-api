export {};


declare global {
  class MenuController {
    menuTableView?: UITableView;
    commandTable?: Array<any>;
    sections?: Array<any>;
    /**
     *  int
     */
    rowHeight: number;
    /**
     *  int
     */
    secHeight: number;
    /**
     *  int
     */
    fontSize: number;
  }

  class SpeechManager {
    /**
     * @param notes NSArray*
     */
    startSpeechNotes(notes: Array<any>): void;
    stopSpeech(): void;
    pauseSpeech(): void;
    continueSpeech(): void;
    prevSpeech(): void;
    nextSpeech(): void;
    canPrev(): boolean;
    canNext(): boolean;
    /**
     * @param text NSString*
     */
    playText(text: string): void;
    /**
     * @param text NSString*
     * @param languageTxt NSString*
     */
    playText(text: string, languageTxt: string): void;
    readonly speaking: boolean;
    readonly paused: boolean;
    sceneWindow?: UIWindow;
    languageCode?: string;
    /**
     * @returns SpeechManager*
     */
    static sharedInstance(): SpeechManager;
  }

  class UndoManager {
    /**
     * @returns id<JSBUndoManager>
     */
    static sharedInstance(): WrapperObj<UndoManager>;
    /**
     * @param actionName NSString*
     * @param topicid NSString*
     * @param block JSValue*
     */
    undoGrouping(actionName: string, topicid: string, block: JSValue): void;
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    clearAll(): void;
  }

  class ZipArchive {
    /**
     * @param path NSString*
     * @param destination NSString*
     */
    static unzipFileAtPath(path: string, destination: string): boolean;
    /**
     * @param path NSString*
     * @param destination NSString*
     * @param password NSString*
     */
    static unzipFileAtPath(
      path: string,
      destination: string,
      overwrite: boolean,
      password: string
    ): boolean;
    /**
     * @param path NSString*
     * @param filenames NSArray*
     */
    static createZipFileAtPath(path: string, filenames: Array<any>): boolean;
    /**
     * @param path NSString*
     * @param directoryPath NSString*
     */
    static createZipFileAtPath(path: string, directoryPath: string): boolean;
    /**
     * @param path NSString*
     */
    initWithPath(path: string): WrapperObj<any>;
    open(): boolean;
    /**
     * @param path NSString*
     */
    writeFile(path: string): boolean;
    /**
     * @param data NSData*
     * @param filename NSString*
     */
    writeData(data: NSData, filename: string): boolean;
    close(): boolean;
  }
}
