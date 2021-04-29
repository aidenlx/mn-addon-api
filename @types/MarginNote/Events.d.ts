import { DocumentController } from "./Application";

export type EventHandler<T extends NotifySender = NotifySender> = (
  sender: T
) => void;

export type Event = NotifySender["name"];

export type NotifySender =
  | PopupMenuOnNote_Sender
  | PopupMenuOnSelection_Sender
  | ChangeExcerptRange_Sender
  | ProcessNewExcerpt_Sender;

export type Sender_Basic = {
  name: Event;
  object: UIView;
  userInfo: { [k: string]: any };

  performSelector(): void;
  performSelectorWithObject(): void;
  performSelectorWithObjectWithObject(): void;
  doesNotRecognizeSelector(): void;
  forwardingTargetForSelector(): void;
  methodSignatureForSelector(): void;
  retain(): void;
  retainCount(): void;
  autorelease(): void;
  copy(): void;
  finalize(): void;
  dealloc(): void;
  isEqual(): void;
  self(): void;
  isProxy(): void;
  conformsToProtocol(): void;
  hash(): void;
  description(): void;
  debugDescription(): void;
  retainWeakReference(): void;
  allowsWeakReference(): void;
  forwardInvocation(): void;
  mutableCopy(): void;
};

export interface PopupMenuOnNote_Sender extends Sender_Basic {
  name: "PopupMenuOnNote";
  userInfo: {
    note: MbBookNote;
  };
}
export interface PopupMenuOnSelection_Sender extends Sender_Basic {
  name: "PopupMenuOnSelection";
  userInfo: {
    documentController: DocumentController;
  };
}
export interface ChangeExcerptRange_Sender extends Sender_Basic {
  name: "ChangeExcerptRange";
  userInfo: {
    noteid: string;
  };
}
export interface ProcessNewExcerpt_Sender extends Sender_Basic {
  name: "ProcessNewExcerpt";
  userInfo: {
    noteid: string;
  };
}
