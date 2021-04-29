/**
 * For Objective-C instances that do not derive from the set of types listed above, 
 * a wrapper object to provide a retaining handle to the Objective-C instance from 
 * JavaScript. For more information on these wrapper objects, see JSExport.h. When 
 * a JavaScript wrapper object is converted back to Objective-C the Objective-C 
 * instance being retained by the wrapper is returned.
 */
declare type WrapperObj<T> = T;

declare type DictObj = {
  [k: string]: any;
};export {};

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

declare class JSExtension {
  readonly window?: UIWindow; 
  /** Window initialize */
  sceneWillConnect(): void; 
  /** Window disconnect */
  sceneDidDisconnect(): void; 
  /** Window resign active */
  sceneWillResignActive(): void; 
  /** Window become active */
  sceneDidBecomeActive(): void; 
  /**
   * @param topicid NSString*
   */
  notebookWillOpen(topicid: string): void; 
  /**
   * @param topicid NSString*
   */
  notebookWillClose(topicid: string): void; 
  /**
   * @param docmd5 NSString*
   */
  documentDidOpen(docmd5: string): void; 
  /**
   * @param docmd5 NSString*
   */
  documentWillClose(docmd5: string): void; 
  /**
   * @returns NSDictionary*
   */
  queryAddonCommandStatus(): {
    /** path to icon file */
    image: string,
    object: WrapperObj<any>,
    /** the function name of handler to toggle plugin in {@link InstMember} */
    selector: string,
    checked: boolean,
  } | null;
  /**
   * @returns NSArray*
   * @param topicid NSString*
   */
  additionalTitleLinksOfNotebook(topicid: string): Array<any>; 
  /**
   * @returns UIViewController*
   * @param titleLink NSString*
   */
  viewControllerForTitleLink(titleLink: string): UIViewController; 
  /**
   * @param controller UIViewController*
   */
  controllerWillLayoutSubviews(controller: UIViewController): void; 
  /**
   * @returns NSArray*
   */
  additionalShortcutKeys(): Array<any>; 
  /**
   * @returns NSDictionary*
   * @param command NSString*
   * @param keyFlags NSInteger
   */
  queryShortcutKey(command: string, keyFlags: number): DictObj; 
  /**
   * @param command NSString*
   * @param keyFlags NSInteger
   */
  processShortcutKey(command: string, keyFlags: number): void; 
  static addonDidConnect(): void; 
  static addonWillDisconnect(): void; 
  static applicationDidEnterBackground(): void; 
  static applicationWillEnterForeground(): void; 
  /**
   * @param notify UILocalNotification*
   */
  static applicationDidReceiveLocalNotification(notify: UILocalNotification): void; 
}export {};

declare global {
  type NotifySender = {
    [k: string]: any;
    userInfo: {
      [k: string]: any;
      note?: MbBookNote;
      documentController?: DocumentController;
    };
  };

  type EventHandler = (sender: NotifySender) => void;

  type Events =
    | "PopupMenuOnNote"
    | "PopupMenuOnSelection"
    | "ChangeExcerptRange"
    | "ProcessNewExcerpt";
}
export {};

declare global {
  class MbBookNote {
    excerptText?: string;
    noteTitle?: string;
    /**int */
    colorIndex: number;
    /**int */
    fillIndex: number;
    mindmapPosition: CGPoint;

    readonly noteId?: string;
    readonly docMd5?: string;
    readonly notebookId?: string;
    readonly startPage?: number;
    readonly endPage?: number;
    readonly startPos?: string;
    readonly endPos?: string;
    readonly excerptPic?: excerptPic;
    readonly createDate?: Date;
    readonly modifiedDate?: Date;
    readonly mediaList?: string;
    readonly originNoteId?: string;
    readonly mindmapBranchClose?: number;
    readonly notesText?: string;
    readonly groupNoteId?: string;

    readonly comments: noteComment[];

    readonly parentNote?: MbBookNote;
    readonly linkedNotes: LinkedNote[];
    readonly childNotes: MbBookNote[];
    /**
     * Array of summarized note-id
     */
    readonly summaryLinks: string[];

    readonly zLevel?: number | boolean;
    readonly hidden?: number | boolean;
    readonly toc?: number | boolean;
    readonly annotation?: number | boolean;
    readonly textFirst?: number | boolean;
    readonly groupMode?: number | boolean;
    readonly flashcard?: number | boolean;
    readonly summary: boolean;
    readonly flagged?: number | boolean;
    readonly textHighlight?: {
      highlight_text: string;
      coords_hash: string;
    };
    readonly options?: DictObj;

    paste(): void;
    clearFormat(): void;
    /**
     * @returns NSString*
     */
    allNoteText(): string;
    /**
     * @param note MbBookNote*
     */
    merge(note: MbBookNote): void;
    /**
     * @param html NSString*
     * @param text NSString*
     * @param tag NSString*
     */
    appendHtmlComment(html: string, text: string, tag: string): void;
    /**
     * @param text NSString*
     */
    appendTextComment(text: string): void;
    /**
     * @param note MbBookNote*
     */
    appendNoteLink(note: MbBookNote): void;
    /**
     * @param index NSInteger
     */
    removeCommentByIndex(index: number): void;
    /**
     * @returns MbBookNote*
     * @param title NSString*
     * @param topic MbTopic*
     * @param book MbBook*
     */
    static createWithTitle(
      title: string,
      topic: MbTopic,
      book: MbBook
    ): MbBookNote;
  }

  interface pic {
    paint: string;
    size: unknown;
  }

  interface excerptPic extends pic {
    selLst: {
      [key: number]: {
        rotation: number;
        imgRect: unknown;
        rect: unknown;
        pageNo: number;
      };
    };
  }

  type noteComment = textComment | htmlComment | linkComment | paintComment;
  /**
   * 基本的Comment，合并Note时其title也被合并为此类型
   */
  interface textComment {
    type: "TextNote";
    text: string;
    /**为被合并Note的内容时存在*/
    noteid?: string;
  }
  /**
   * 复制html内容进Note时产生
   */
  interface htmlComment {
    type: "HtmlNote";
    htmlSize: NSDictionary;
    rtf: NSDictionary;
    html: string;
    text: string;
    /**为被合并Note的内容时存在*/
    noteid?: string;
  }
  /**
   * 合并Note时产生
   */
  type linkComment = linkComment_text | linkComment_pic;

  interface linkComment_text {
    type: "LinkNote";
    noteid: string;
    q_htext: textComment["text"];
  }

  interface linkComment_pic {
    type: "LinkNote";
    noteid: string;
    q_htext?: textComment["text"];
    q_hpic: pic;
  }

  interface paintComment extends pic {
    type: "PaintNote";
  }

  interface LinkedNote {
    summary: boolean;
    noteid: string;
    linktext: string;
  }
}
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
export {};

declare global {}export {};


declare global {
  class MbBook {
    readonly currentTopicId?: string;
    readonly lastVisit?: Date;
    readonly docMd5?: string;
    readonly pathFile?: string;
    readonly docTitle?: string;
  }

  class MbTopic {
    title?: string;
    readonly topicId?: string;
    readonly lastVisit?: Date;
    readonly mainDocMd5?: string;
    readonly historyDate?: Date;
    readonly syncMode?: number | boolean;
    readonly categoryList?: string;
    readonly hashtags?: string;
    readonly docList?: string;
    readonly options?: DictObj;
    readonly documents?: Array<any>;
    readonly notes?: Array<any>;
    hideLinksInMindMapNode: boolean;
  }

  const Database: {
    /**
     * accessor to MbModelTool in global scope
     * @returns MbModelTool*
     */
    sharedInstance(): MbModelTool;
  };

  class MbModelTool {
    /**
     * not accessible as a static function in global scope, use {@link Database} instead
     * @returns MbModelTool*
     */
    // static sharedInstance(): MbModelTool;
    /**
     * @param topicid NSString*
     */
    getNotebookById(topicid: string): WrapperObj<MbTopic>|undefined;
    /**
     * @returns NSData*
     * @param hash NSString*
     */
    getMediaByHash(hash: string): NSData|undefined;
    /**
     * @param noteid NSString*
     */
    getNoteById(noteid: string): WrapperObj<MbBookNote>|undefined;
    /**
     * @param md5 NSString*
     */
    getDocumentById(md5: string): WrapperObj<MbBook>|undefined;
    /**
     * @param noteid NSString*
     * @param topicid NSString*
     */
    getFlashcardByNoteId(noteid: string, topicid: string): WrapperObj<MbBookNote>|undefined;
    /**
     * @returns NSArray*
     * @param noteid NSString*
     */
    getFlashcardsByNoteId(noteid: string): Array<MbBookNote>|undefined;
    /**
     * @param noteid NSString*
     */
    hasFlashcardByNoteId(noteid: string): boolean;
    savedb(): void;
    /**
     * @returns NSArray*
     */
    allNotebooks(): Array<MbTopic>;
    /**
     * @returns NSArray*
     */
    allDocuments(): Array<MbBook>;
    /**
     * @param topicid NSString*
     */
    setNotebookSyncDirty(topicid: string): void;
    /**
     * @returns NSArray*
     * @param topicid NSString*
     * @param key NSString*
     */
    saveHistoryArchive(topicid: string, key: string): Array<any>;
    /**
     * @returns NSArray*
     * @param topicid NSString*
     * @param key NSString*
     */
    loadHistoryArchive(topicid: string, key: string): Array<any>;
    /**
     * @param noteid NSString*
     */
    deleteBookNote(noteid: string): void;
    /**
     * @param noteid NSString*
     */
    deleteBookNoteTree(noteid: string): void;
    /**
     * @returns NSArray*
     * @param notes NSArray*
     * @param topicid NSString*
     */
    cloneNotes(notes: Array<MbBookNote>, topicid: string): Array<MbBookNote>;
    /**
     * @returns NSArray*
     * @param notes NSArray*
     * @param topicid NSString*
     */
    cloneNotesToFlashcards(notes: Array<MbBookNote>, topicid: string): Array<MbBookNote>;
    /**
     * @param topicid NSString*
     * @param storePath NSString*
     */
    exportNotebook(topicid: string, storePath: string): boolean;
    /**
     * @param storePath NSString*
     */
    importNotebookFromStorePath(
      storePath: string,
      merge: boolean
    ): WrapperObj<any>;
  }
}

export {};

declare global {
  class Application {
    static sharedInstance(): Application;

    readonly currentTheme?: string;
    readonly defaultTintColorForDarkBackground?: UIColor;
    readonly defaultTintColorForSelected?: UIColor;
    readonly defaultTintColor?: UIColor;
    readonly defaultBookPageColor?: UIColor;
    readonly defaultNotebookColor?: UIColor;
    readonly defaultTextColor?: UIColor;
    readonly defaultDisableColor?: UIColor;
    readonly defaultHighlightBlendColor?: UIColor;
    readonly focusWindow?: UIWindow;
    readonly dbPath?: string;
    readonly documentPath?: string;
    readonly cachePath?: string;
    readonly tempPath?: string;
    readonly osType: osType;
    /**
     * @param topicid NSString*
     */
    refreshAfterDBChanged(topicid: string): void;
    /**
     * @returns NSDictionary*
     * @param command NSString*
     * @param keyFlags NSInteger
     * @param window UIWindow*
     */
    queryCommandWithKeyFlagsInWindow(
      command: string,
      keyFlags: number,
      window: UIWindow
    ): DictObj;
    /**
     * @param command NSString*
     * @param keyFlags NSInteger
     * @param window UIWindow*
     */
    processCommand(command: string, keyFlags: number, window: UIWindow): void;
    /**
     * @param url NSURL*
     */
    openURL(url: NSURL): void;
    /**
     * @param message NSString*
     */
    alert(message: string): void;
    /**
     * @param message NSString*
     * @param view UIView*
     * @param duration double
     */
    showHUD(message: string, view: UIView, duration: number): void;
    /**
     * @param message NSString*
     * @param view UIView*
     */
    waitHUD(message: string, view: UIView): void;
    /**
     * @param view UIView*
     */
    stopWaitHUDOnView(view: UIView): void;
    /**
     * @param mfile NSString*
     * @param uti NSString*
     */
    saveFile(mfile: string, uti: string): void;
    /**
     * @returns id<JSBStudyController>
     * @param window UIWindow*
     */
    studyController(window: UIWindow): WrapperObj<StudyController>;
    /**
     * @param window UIWindow*
     */
    checkNotifySenderInWindow(obj: WrapperObj<any>, window: UIWindow): boolean;
    /**
     * @param types NSArray<NSString*>*
     * @param controller UIViewController*
     * @param block JSValue*
     */
    openFileWithUTIs(
      types: Array<string>,
      controller: UIViewController,
      block: JSValue
    ): void;
    /**
     * @param commentEditor NSDictionary*
     * @param htmlEditor JSValue*
     * @param htmlRender JSValue*
     * @param commentTag NSString*
     */
    regsiterHtmlCommentEditor(
      commentEditor: DictObj,
      htmlEditor: JSValue,
      htmlRender: JSValue,
      commentTag: string
    ): void;
    /**
     * @param commentTag NSString*
     */
    unregsiterHtmlCommentEditor(commentTag: string): void;
  }

  const enum osType {
    iPadOS = 0,
    iPhoneOS = 1,
    macOS = 2,
  }

  class DocumentController {
    readonly document?: MbBook;
    readonly docMd5?: string;
    readonly notebookId?: string;
    readonly focusNote?: MbBookNote;
    readonly visibleFocusNote?: MbBookNote;
    readonly selectionText?: string;
  }

  class MindMapNode {
    readonly note?: MbBookNote;
    readonly parentNode?: MindMapNode;
    readonly summaryLinks?: Array<any>;
    readonly childNodes?: Array<MindMapNode>;
    readonly frame: CGRect;
  }

  class MindMapView {
    readonly mindmapNodes?: Array<MindMapNode>;
    readonly selViewLst?: Array<any>;
  }

  class NotebookController {
    readonly outlineView: WrapperObj<OutlineView>;
    readonly mindmapView: WrapperObj<MindMapView>;
    readonly notebookId?: string;
    readonly focusNote?: MbBookNote;
    readonly visibleFocusNote?: MbBookNote;
  }

  class OutlineView {
    /**
     * @returns MbBookNote*
     * @param indexPath NSIndexPath*
     */
    noteFromIndexPath(indexPath: NSIndexPath): MbBookNote;
  }

  class ReaderController {
    readonly currentDocumentController: WrapperObj<DocumentController>;
    readonly documentControllers?: NSMutableArray;
  }

  const enum studyMode {
    doc0 = 0,
    doc1 = 1,
    study = 2,
    review = 3,
  }

  const enum docMapSplitMode {
    allMap = 0,
    /** halfMap or halfDoc */
    half = 1,
    allDoc = 2,
  }

  class StudyController {
    readonly studyMode: studyMode;
    readonly narrowMode: boolean; //when narrowmode, book split mode 1 is disabled
    /**
     *  int
     */
    docMapSplitMode: docMapSplitMode;
    rightMapMode: boolean;
    readonly notebookController: WrapperObj<NotebookController>;
    readonly readerController: WrapperObj<ReaderController>;
    /**
     * @param noteId NSString*
     */
    focusNoteInMindMapById(noteId: string): void;
    /**
     * @param noteId NSString*
     */
    focusNoteInDocumentById(noteId: string): void;
    refreshAddonCommands(): void;
  }
}
export {};

declare global {
  type UIWindow = any;

  type UIView = any;

  type UIViewController = any;

  type UILocalNotification = any;

  type UITableView = any;

  type UIColor = any;

  /** https://developer.apple.com/documentation/coregraphics/cgpoint */
  type CGPoint = any;

  type CGRect = any;

  type CGSize = any;

  type CGFloat = any;

  type CGBlendMode = any;

  type UIEdgeInsets = any;

  class UIPasteboard {
    persistent: boolean;
    string?: string;
    /**
     *  NSInteger
     */
    readonly numberOfItems: number;
    URL?: NSURL;
    color?: UIColor;
    colors?: Array<UIColor>;
    image?: UIImage;
    /**
     *  NSInteger
     */
    readonly changeCount: number;
    URLs?: Array<NSURL>;
    images?: Array<UIImage>;
    strings?: Array<string>;
    items?: Array<any>;
    readonly name?: string;
    /**
     * @returns UIPasteboard*
     */
    static generalPasteboard(): UIPasteboard;
    /**
     * @returns UIPasteboard*
     * @param pasteboardName NSString*
     */
    static pasteboardWithName(
      pasteboardName: string,
      create: boolean
    ): UIPasteboard;
    /**
     * @returns UIPasteboard*
     */
    static pasteboardWithUniqueName(): UIPasteboard;
    /**
     * @param pasteboardName NSString*
     */
    static removePasteboardWithName(pasteboardName: string): void;
    /**
     * @returns NSArray*
     */
    pasteboardTypes(): Array<any>;
    /**
     * @param pasteboardTypes NSArray*
     */
    containsPasteboardTypes(pasteboardTypes: Array<any>): boolean;
    /**
     * @returns NSData*
     * @param pasteboardType NSString*
     */
    dataForPasteboardType(pasteboardType: string): NSData;
    /**
     * @param pasteboardType NSString*
     */
    valueForPasteboardType(pasteboardType: string): WrapperObj<any>;
    /**
     * @param pasteboardType NSString*
     */
    setValue(value: WrapperObj<any>, pasteboardType: string): void;
    /**
     * @param data NSData*
     * @param pasteboardType NSString*
     */
    setData(data: NSData, pasteboardType: string): void;
    /**
     * @returns NSArray*
     * @param itemSet NSIndexSet*
     */
    pasteboardTypesForItemSet(itemSet: NSIndexSet): Array<any>;
    /**
     * @param pasteboardTypes NSArray*
     * @param itemSet NSIndexSet*
     */
    containsPasteboardTypes(
      pasteboardTypes: Array<any>,
      itemSet: NSIndexSet
    ): boolean;
    /**
     * @returns NSIndexSet*
     * @param pasteboardTypes NSArray*
     */
    itemSetWithPasteboardTypes(pasteboardTypes: Array<any>): NSIndexSet;
    /**
     * @returns NSArray*
     * @param pasteboardType NSString*
     * @param itemSet NSIndexSet*
     */
    valuesForPasteboardType(
      pasteboardType: string,
      itemSet: NSIndexSet
    ): Array<any>;
    /**
     * @returns NSArray*
     * @param pasteboardType NSString*
     * @param itemSet NSIndexSet*
     */
    dataForPasteboardType(
      pasteboardType: string,
      itemSet: NSIndexSet
    ): Array<any>;
    /**
     * @param items NSArray*
     */
    addItems(items: Array<any>): void;
  }

  class UIImage {
    readonly scale: CGFloat;
    /**
     *  NSInteger
     */
    readonly leftCapWidth: number;
    readonly CGImage: WrapperObj<any>;
    readonly size: CGSize;
    /**
     *  NSInteger
     */
    readonly topCapHeight: number;
    readonly imageOrientation: UIImageOrientation;
    /**
     * @returns UIImage*
     * @param name NSString*
     */
    static imageNamed(name: string): UIImage;
    /**
     * @returns UIImage*
     * @param path NSString*
     */
    static imageWithContentsOfFile(path: string): UIImage;
    /**
     * @returns UIImage*
     * @param data NSData*
     */
    static imageWithData(data: NSData): UIImage;
    /**
     * @returns UIImage*
     * @param data NSData*
     */
    static imageWithData(data: NSData, scale: CGFloat): UIImage;
    /**
     * @returns UIImage*
     */
    static imageWithCGImage(cgImage: WrapperObj<any>): UIImage;
    /**
     * @returns UIImage*
     */
    static imageWithCGImage(
      cgImage: WrapperObj<any>,
      scale: CGFloat,
      orientation: UIImageOrientation
    ): UIImage;

    drawAtPoint(point: CGPoint): void;
    drawAtPoint(point: CGPoint, blendMode: CGBlendMode, alpha: CGFloat): void;
    drawInRect(rect: CGRect): void;
    drawInRect(rect: CGRect, blendMode: CGBlendMode, alpha: CGFloat): void;
    drawAsPatternInRect(rect: CGRect): void;
    /**
     * @returns UIImage*
     */
    resizableImageWithCapInsets(capInsets: UIEdgeInsets): UIImage;
    /**
     * @returns UIImage*
     */
    imageWithAlignmentRectInsets(alignmentInsets: UIEdgeInsets): UIImage;
    /**
     * @returns UIImage*
     * @param leftCapWidth NSInteger
     * @param topCapHeight NSInteger
     */
    stretchableImageWithLeftCapWidth(
      leftCapWidth: number,
      topCapHeight: number
    ): UIImage;
    /**
     * @returns NSData*
     * @param compressionQuality double
     */
    jpegData(compressionQuality: number): NSData;
    /**
     * @returns NSData*
     */
    pngData(): NSData;
  }

  const enum UIImageOrientation {
    /** Rotated 180 degrees.  */
    Down = 1,

    /** Flipped about its vertical axis and then rotated 180 degrees.  */
    DownMirrored = 5,

    /** Rotated 90 degrees counterclockwise.  */
    Left = 2,

    /** Flipped about its horizontal axis and then rotated 90 degrees counterclockwise.  */
    LeftMirrored = 6,

    /** Rotated 90 degrees clockwise.  */
    Right = 3,

    /** Flipped about its horizontal axis and then rotated 90 degrees clockwise.  */
    RightMirrored = 7,

    /** Default orientation.  */
    Up = 0,

    /** Flipped about its vertical axis.  */
    UpMirrored = 4,
  }
}
export {};

declare global {
  type NSURL = any;

  type JSValue = any;

  type NSDictionary = any;

  type NSData = any;

  type NSIndexPath = any;

  type NSMutableArray<T = any> = Array<T>;

  type NSIndexSet = any;

  class NSNotification {
    /**
     * @param aName NSString*
     */
    static notificationWithName(
      aName: string,
      anObject: WrapperObj<any>
    ): NSNotification;
    /**
     * @param aName NSString*
     * @param aUserInfo NSDictionary*
     */
    static notificationWithName(
      aName: string,
      anObject: WrapperObj<any>,
      aUserInfo: DictObj
    ): NSNotification;
    readonly name?: string;
    readonly object: WrapperObj<any>;
    readonly userInfo?: DictObj;
    /**
     * @param name NSString*
     * @param userInfo NSDictionary*
     */
    initWithName(
      name: string,
      object: WrapperObj<any>,
      userInfo: DictObj
    ): NSNotification;
  }

  class NSLocale {
    static autoupdatingCurrentLocale(): WrapperObj<NSLocale>;
    static currentLocale(): WrapperObj<NSLocale>;
    static systemLocale(): WrapperObj<NSLocale>;
    /**
     * @param ident NSString*
     */
    static localeWithLocaleIdentifier(ident: string): NSLocale;
    /**
     * @returns NSArray*
     */
    static availableLocaleIdentifiers(): Array<string>;
    /**
     * @returns NSArray*
     */
    static ISOLanguageCodes(): Array<string>;
    /**
     * @returns NSArray*
     */
    static ISOCountryCodes(): Array<string>;
    /**
     * @returns NSArray*
     */
    static ISOCurrencyCodes(): Array<string>;
    /**
     * @returns NSArray*
     */
    static commonISOCurrencyCodes(): Array<string>;
    /**
     * @returns NSArray*
     */
    static preferredLanguages(): Array<string>;
    /**
     * @returns NSDictionary*
     * @param string NSString*
     */
    static componentsFromLocaleIdentifier(string: string): DictObj;
    /**
     * @returns NSString*
     * @param dict NSDictionary*
     */
    static localeIdentifierFromComponents(dict: DictObj): string;
    /**
     * @returns NSString*
     * @param string NSString*
     */
    static canonicalLocaleIdentifierFromString(string: string): string;
    /**
     * @returns NSString*
     * @param string NSString*
     */
    static canonicalLanguageIdentifierFromString(string: string): string;
    /**
     * @returns NSString*
     * @param lcid uint32_t
     */
    static localeIdentifierFromWindowsLocaleCode(lcid: number): string;
    /**
     * @returns uint32_t
     * @param localeIdentifier NSString*
     */
    static windowsLocaleCodeFromLocaleIdentifier(
      localeIdentifier: string
    ): number;
    /**
     * @param isoLangCode NSString*
     */
    static characterDirectionForLanguage(
      isoLangCode: string
    ): NSLocaleLanguageDirection;
    /**
     * @param isoLangCode NSString*
     */
    static lineDirectionForLanguage(
      isoLangCode: string
    ): NSLocaleLanguageDirection;
    objectForKey(key: WrapperObj<any>): WrapperObj<any>;
    /**
     * @returns NSString*
     */
    displayNameForKey(key: WrapperObj<any>, value: WrapperObj<any>): string;
    /**
     * @returns NSString*
     */
    localeIdentifier(): string;
  }

  enum NSLocaleLanguageDirection {
    BottomToTop = 4,
    LeftToRight = 1,
    RightToLeft = 2,
    TopToBottom = 3,
    Unknown = 0,
  }

  class NSNotificationCenter {
    static defaultCenter(): NSNotificationCenter;
    init(): NSNotificationCenter;
    /**
     * @param aSelector the function name of {@link EventHandler} in {@link InstMember}
     * @param aName event name
     */
    addObserverSelectorName(
      observer: WrapperObj<any>,
      aSelector: string,
      aName: Events
    ): void;
    /**
     * @param notification NSNotification*
     */
    postNotification(notification: NSNotification): void;
    /**
     * @param aName NSString*
     */
    postNotificationName(aName: string, anObject: WrapperObj<any>): void;
    /**
     * @param aName NSString*
     * @param aUserInfo NSDictionary*
     */
    postNotificationName(
      aName: string,
      anObject: WrapperObj<any>,
      aUserInfo: DictObj
    ): void;
    removeObserver(observer: WrapperObj<any>): void;
    /**
     * @param aName NSString*
     */
    removeObserverName(observer: WrapperObj<any>, aName: Events): void;
  }

  class NSUserDefaults {
    /**
     * @returns NSUserDefaults*
     */
    static standardUserDefaults(): NSUserDefaults;
    static resetStandardUserDefaults(): void;
    /**
     * @param defaultName NSString*
     */
    objectForKey(defaultName: string): WrapperObj<any>;
    /**
     * @param defaultName NSString*
     */
    setObject(value: WrapperObj<any>, defaultName: string): void;
    /**
     * @param defaultName NSString*
     */
    removeObjectForKey(defaultName: string): void;
    /**
     * @returns NSString*
     * @param defaultName NSString*
     */
    stringForKey(defaultName: string): string;
    /**
     * @returns NSArray*
     * @param defaultName NSString*
     */
    arrayForKey(defaultName: string): Array<any>;
    /**
     * @returns NSDictionary*
     * @param defaultName NSString*
     */
    dictionaryForKey(defaultName: string): DictObj;
    /**
     * @returns NSData*
     * @param defaultName NSString*
     */
    dataForKey(defaultName: string): NSData;
    /**
     * @returns NSArray*
     * @param defaultName NSString*
     */
    stringArrayForKey(defaultName: string): Array<any>;
    /**
     * @returns NSInteger
     * @param defaultName NSString*
     */
    integerForKey(defaultName: string): number;
    /**
     * @returns float
     * @param defaultName NSString*
     */
    floatForKey(defaultName: string): number;
    /**
     * @returns double
     * @param defaultName NSString*
     */
    doubleForKey(defaultName: string): number;
    /**
     * @param defaultName NSString*
     */
    boolForKey(defaultName: string): boolean;
    /**
     * @returns NSURL*
     * @param defaultName NSString*
     */
    URLForKey(defaultName: string): NSURL;
    /**
     * @param value NSInteger
     * @param defaultName NSString*
     */
    setInteger(value: number, defaultName: string): void;
    /**
     * @param value float
     * @param defaultName NSString*
     */
    setFloat(value: number, defaultName: string): void;
    /**
     * @param value double
     * @param defaultName NSString*
     */
    setDouble(value: number, defaultName: string): void;
    /**
     * @param defaultName NSString*
     */
    setBool(value: boolean, defaultName: string): void;
    /**
     * @param url NSURL*
     * @param defaultName NSString*
     */
    setURL(url: NSURL, defaultName: string): void;
    /**
     * @param registrationDictionary NSDictionary*
     */
    registerDefaults(registrationDictionary: DictObj): void;
    /**
     * @param suiteName NSString*
     */
    addSuiteNamed(suiteName: string): void;
    /**
     * @param suiteName NSString*
     */
    removeSuiteNamed(suiteName: string): void;
    /**
     * @returns NSDictionary*
     */
    dictionaryRepresentation(): DictObj;
    /**
     * @returns NSArray*
     */
    volatileDomainNames(): Array<any>;
    /**
     * @returns NSDictionary*
     * @param domainName NSString*
     */
    volatileDomainForName(domainName: string): DictObj;
    /**
     * @param domain NSDictionary*
     * @param domainName NSString*
     */
    setVolatileDomain(domain: DictObj, domainName: string): void;
    /**
     * @param domainName NSString*
     */
    removeVolatileDomainForName(domainName: string): void;
    /**
     * @returns NSArray*
     */
    persistentDomainNames(): Array<any>;
    /**
     * @returns NSDictionary*
     * @param domainName NSString*
     */
    persistentDomainForName(domainName: string): DictObj;
    /**
     * @param domain NSDictionary*
     * @param domainName NSString*
     */
    setPersistentDomain(domain: DictObj, domainName: string): void;
    /**
     * @param domainName NSString*
     */
    removePersistentDomainForName(domainName: string): void;
    synchronize(): boolean;
    /**
     * @param key NSString*
     */
    objectIsForcedForKey(key: string): boolean;
    /**
     * @param key NSString*
     * @param domain NSString*
     */
    objectIsForcedForKey(key: string, domain: string): boolean;
  }
}
