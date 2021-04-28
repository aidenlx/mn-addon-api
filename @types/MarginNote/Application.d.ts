import { JSValue, NSDictionary, NSIndexPath, NSMutableArray, NSURL } from "../ObjC/Foundation";
import { UIWindow, UIView, UIViewController, UIColor, CGRect } from "../ObjC/UIKit";
import { MbBook, MbBookNote } from "./NoteDatabase";
import { WrapperObj, DictObj } from "../misc";

export class Application {
  static sharedInstance(): Application;

  readonly currentTheme? : string;
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
  readonly osType : osType;
  
  refreshAfterDBChanged(topicid:string): void;
  /**
   * 
   * @param command 
   * @param keyFlags must be int
   * @param window 
   */
  queryCommandWithKeyFlagsInWindow(command:string, keyFlags:number, window: UIWindow) : NSDictionary;
  /**
   * 
   * @param command 
   * @param keyFlags must be int
   * @param window 
   */
  processCommand(command:string, keyFlags:number, window: UIWindow) : void;

  openURL(url:NSURL) : void;

  alert(message:string) : void;

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
   queryCommandWithKeyFlagsInWindow(command: string, keyFlags: number, window: UIWindow): DictObj; 
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
   openFileWithUTIs(types: Array<string>, controller: UIViewController, block: JSValue): void; 
   /**
    * @param commentEditor NSDictionary*
    * @param htmlEditor JSValue*
    * @param htmlRender JSValue*
    * @param commentTag NSString*
    */
   regsiterHtmlCommentEditor(commentEditor: DictObj, htmlEditor: JSValue, htmlRender: JSValue, commentTag: string): void; 
   /**
    * @param commentTag NSString*
    */
   unregsiterHtmlCommentEditor(commentTag: string): void; 
 }

declare const enum osType {
  iPadOS = 0,
  iPhoneOS = 1,
  macOS = 2
}

export class DocumentController {
  readonly document?: MbBook; 
  readonly docMd5?: string; 
  readonly notebookId?: string; 
  readonly focusNote?: MbBookNote; 
  readonly visibleFocusNote?: MbBookNote; 
  readonly selectionText?: string; 
}

export class MindMapNode {
  readonly note?: MbBookNote; 
  readonly parentNode?: MindMapNode; 
  readonly summaryLinks?: Array<any>; 
  readonly childNodes?: Array<MindMapNode>; 
  readonly frame: CGRect; 
}

export class MindMapView {
  readonly mindmapNodes?: Array<MindMapNode>; 
  readonly selViewLst?: Array<any>; 
}

export class NotebookController {
  readonly outlineView: WrapperObj<OutlineView>; 
  readonly mindmapView: WrapperObj<MindMapView>; 
  readonly notebookId?: string; 
  readonly focusNote?: MbBookNote; 
  readonly visibleFocusNote?: MbBookNote; 
}

export class OutlineView {
  /**
   * @returns MbBookNote*
   * @param indexPath NSIndexPath*
   */
  noteFromIndexPath(indexPath: NSIndexPath): MbBookNote; 
}

export class ReaderController {
  readonly currentDocumentController: WrapperObj<DocumentController>; 
  readonly documentControllers?: NSMutableArray; 
}

declare const enum studyMode {
  doc0 = 0,
  doc1 = 1,
  study = 2,
  review = 3
}

declare const enum docMapSplitMode {
  allMap = 0,
  /** halfMap or halfDoc */
  half = 1, 
  allDoc = 2,
}


export class StudyController {

  readonly studyMode: studyMode;
  readonly narrowMode: boolean;  //when narrowmode, book split mode 1 is disabled
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