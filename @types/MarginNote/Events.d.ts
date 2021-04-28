import { DocumentController } from "./Application";
import { MbBookNote } from "./NoteDatabase";

export declare type NotifySender = {
  [k:string]: any;
  userInfo: {
    [k:string]: any;
    note: MbBookNote;
    documentController: DocumentController;
  }
}

export declare type EventHandler = (sender: NotifySender) => void;

export declare type Events =
  | "PopupMenuOnNote"
  | "PopupMenuOnSelection"
  | "ChangeExcerptRange"
  | "ProcessNewExcerpt";