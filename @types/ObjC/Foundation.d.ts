
declare type NSURL = any;

declare type JSValue = any;

declare type NSDictionary = any;

declare type NSData = any;

declare type NSIndexPath = any;

declare type NSMutableArray<T=any> = Array<T>;

declare type NSIndexSet = any;

declare class NSNotification {
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