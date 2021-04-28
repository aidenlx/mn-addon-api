import { DocumentController } from "./Application";
import { MbBookNote } from "./NoteDatabase";

type NotifySender = {
  [k:string]: any;
  userInfo: {
    [k:string]: any;
    note: MbBookNote;
    documentController: DocumentController;
  }
}

export type EventHandler = (sender: NotifySender) => void;

export type Events =
  | "PopupMenuOnNote"
  | "PopupMenuOnSelection"
  | "ChangeExcerptRange"
  | "ProcessNewExcerpt";