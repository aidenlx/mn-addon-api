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
    static createWithTitleNotebookDocument(
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
