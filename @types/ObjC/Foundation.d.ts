import { WrapperObj, DictObj } from "../misc";

export declare type NSURL = any;

export declare type JSValue = any;

export declare type NSDictionary = any;

export declare type NSData = any;

export declare type NSIndexPath = any;

export declare type NSMutableArray<T=any> = Array<T>;

export declare type NSIndexSet = any;

export declare class NSNotification {
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