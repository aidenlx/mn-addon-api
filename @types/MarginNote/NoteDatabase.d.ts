import { DictObj, WrapperObj } from "misc";
import { NSData } from "ObjC/Foundation";

export * from "./_MbBookNote"

export class MbBook{
  readonly currentTopicId?: string;
  readonly lastVisit?: Date;
  readonly docMd5?: string;
  readonly pathFile?: string;
  readonly docTitle?: string;
}

export class MbTopic {
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

export class MbModelTool {
  /**
   * @returns MbModelTool*
   */
  static sharedInstance(): MbModelTool; 
  /**
   * @param topicid NSString*
   */
  getNotebookById(topicid: string): WrapperObj<any>; 
  /**
   * @returns NSData*
   * @param hash NSString*
   */
  getMediaByHash(hash: string): NSData; 
  /**
   * @param noteid NSString*
   */
  getNoteById(noteid: string): WrapperObj<any>; 
  /**
   * @param md5 NSString*
   */
  getDocumentById(md5: string): WrapperObj<any>; 
  /**
   * @param noteid NSString*
   * @param topicid NSString*
   */
  getFlashcardByNoteId(noteid: string, topicid: string): WrapperObj<any>; 
  /**
   * @returns NSArray*
   * @param noteid NSString*
   */
  getFlashcardsByNoteId(noteid: string): Array<any>; 
  /**
   * @param noteid NSString*
   */
  hasFlashcardByNoteId(noteid: string): boolean; 
  savedb(): void; 
  /**
   * @returns NSArray*
   */
  allNotebooks(): Array<any>; 
  /**
   * @returns NSArray*
   */
  allDocuments(): Array<any>; 
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
  cloneNotes(notes: Array<any>, topicid: string): Array<any>; 
  /**
   * @returns NSArray*
   * @param notes NSArray*
   * @param topicid NSString*
   */
  cloneNotesToFlashcards(notes: Array<any>, topicid: string): Array<any>; 
  /**
   * @param topicid NSString*
   * @param storePath NSString*
   */
  exportNotebook(topicid: string, storePath: string): boolean; 
  /**
   * @param storePath NSString*
   */
  importNotebookFromStorePath(storePath: string, merge: boolean): WrapperObj<any>; 
}
