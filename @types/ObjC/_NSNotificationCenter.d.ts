import { Events } from "MarginNote/Events";
import { WrapperObj, DictObj } from "misc";
import { NSNotification } from "./Foundation";


export class NSNotificationCenter {
  static defaultCenter(): NSNotificationCenter;
  init(): NSNotificationCenter;
  /**
   * @param aSelector the function name of {@link EventHandler} in {@link InstMember}
   * @param aName event name
   */
  addObserverSelectorName(observer: WrapperObj<any>, aSelector: string, aName: Events): void;
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
  postNotificationName(aName: string, anObject: WrapperObj<any>, aUserInfo: DictObj): void;
  removeObserver(observer: WrapperObj<any>): void;
  /**
   * @param aName NSString*
   */
  removeObserverName(observer: WrapperObj<any>, aName: Events): void;
}
