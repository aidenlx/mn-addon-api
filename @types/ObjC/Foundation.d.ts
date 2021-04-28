import { WrapperObj, DictObj } from "../misc";

export type NSURL = any;

export type JSValue = any;

export type NSDictionary = any;

export type NSData = any;

export type NSIndexPath = any;

export type NSMutableArray<T=any> = Array<T>;

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

export * from "./_NSNotificationCenter";

export * from "./_NSUserDefaults";

export * from "./_NSLocale";