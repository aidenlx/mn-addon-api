export {};

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
