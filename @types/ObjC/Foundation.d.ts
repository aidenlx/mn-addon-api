import { Events } from "MarginNote/Events";
import { WrapperObj, DictObj } from "misc";

export type NSURL = any;

export type JSValue = any;

export type NSDictionary = any;

export type NSData = any;

export type NSIndexPath = any;

export type NSMutableArray<T=any> = Array<T>;

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

export class NSNotification {
  /**
   * @param aName NSString*
   */
  static notificationWithName(aName: string, anObject: WrapperObj<any>): NSNotification; 
  /**
   * @param aName NSString*
   * @param aUserInfo NSDictionary*
   */
  static notificationWithName(aName: string, anObject: WrapperObj<any>, aUserInfo: DictObj): NSNotification; 
  readonly name?: string; 
  readonly object: WrapperObj<any>; 
  readonly userInfo?: DictObj; 
  /**
   * @param name NSString*
   * @param userInfo NSDictionary*
   */
  initWithName(name: string, object: WrapperObj<any>, userInfo: DictObj): NSNotification; 
}

export * from "./_NSUserDefaults"