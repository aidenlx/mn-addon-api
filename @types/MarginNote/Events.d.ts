
declare type NotifySender = {
  [k:string]: any;
  userInfo: {
    [k:string]: any;
    note: MbBookNote;
    documentController: DocumentController;
  }
}

declare type EventHandler = (sender: NotifySender) => void;

declare type Events =
  | "PopupMenuOnNote"
  | "PopupMenuOnSelection"
  | "ChangeExcerptRange"
  | "ProcessNewExcerpt";