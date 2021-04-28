import { WrapperObj, DictObj } from "../misc";
import { NSData, NSURL } from "./Foundation";

export declare class NSUserDefaults {
  /**
   * @returns NSUserDefaults*
   */
  static standardUserDefaults(): NSUserDefaults; 
  static resetStandardUserDefaults(): void; 
  /**
   * @param defaultName NSString*
   */
  objectForKey(defaultName: string): WrapperObj<any>; 
  /**
   * @param defaultName NSString*
   */
  setObject(value: WrapperObj<any>, defaultName: string): void; 
  /**
   * @param defaultName NSString*
   */
  removeObjectForKey(defaultName: string): void; 
  /**
   * @returns NSString*
   * @param defaultName NSString*
   */
  stringForKey(defaultName: string): string; 
  /**
   * @returns NSArray*
   * @param defaultName NSString*
   */
  arrayForKey(defaultName: string): Array<any>; 
  /**
   * @returns NSDictionary*
   * @param defaultName NSString*
   */
  dictionaryForKey(defaultName: string): DictObj; 
  /**
   * @returns NSData*
   * @param defaultName NSString*
   */
  dataForKey(defaultName: string): NSData; 
  /**
   * @returns NSArray*
   * @param defaultName NSString*
   */
  stringArrayForKey(defaultName: string): Array<any>; 
  /**
   * @returns NSInteger
   * @param defaultName NSString*
   */
  integerForKey(defaultName: string): number; 
  /**
   * @returns float
   * @param defaultName NSString*
   */
  floatForKey(defaultName: string): number; 
  /**
   * @returns double
   * @param defaultName NSString*
   */
  doubleForKey(defaultName: string): number; 
  /**
   * @param defaultName NSString*
   */
  boolForKey(defaultName: string): boolean; 
  /**
   * @returns NSURL*
   * @param defaultName NSString*
   */
  URLForKey(defaultName: string): NSURL; 
  /**
   * @param value NSInteger
   * @param defaultName NSString*
   */
  setInteger(value: number, defaultName: string): void; 
  /**
   * @param value float
   * @param defaultName NSString*
   */
  setFloat(value: number, defaultName: string): void; 
  /**
   * @param value double
   * @param defaultName NSString*
   */
  setDouble(value: number, defaultName: string): void; 
  /**
   * @param defaultName NSString*
   */
  setBool(value: boolean, defaultName: string): void; 
  /**
   * @param url NSURL*
   * @param defaultName NSString*
   */
  setURL(url: NSURL, defaultName: string): void; 
  /**
   * @param registrationDictionary NSDictionary*
   */
  registerDefaults(registrationDictionary: DictObj): void; 
  /**
   * @param suiteName NSString*
   */
  addSuiteNamed(suiteName: string): void; 
  /**
   * @param suiteName NSString*
   */
  removeSuiteNamed(suiteName: string): void; 
  /**
   * @returns NSDictionary*
   */
  dictionaryRepresentation(): DictObj; 
  /**
   * @returns NSArray*
   */
  volatileDomainNames(): Array<any>; 
  /**
   * @returns NSDictionary*
   * @param domainName NSString*
   */
  volatileDomainForName(domainName: string): DictObj; 
  /**
   * @param domain NSDictionary*
   * @param domainName NSString*
   */
  setVolatileDomain(domain: DictObj, domainName: string): void; 
  /**
   * @param domainName NSString*
   */
  removeVolatileDomainForName(domainName: string): void; 
  /**
   * @returns NSArray*
   */
  persistentDomainNames(): Array<any>; 
  /**
   * @returns NSDictionary*
   * @param domainName NSString*
   */
  persistentDomainForName(domainName: string): DictObj; 
  /**
   * @param domain NSDictionary*
   * @param domainName NSString*
   */
  setPersistentDomain(domain: DictObj, domainName: string): void; 
  /**
   * @param domainName NSString*
   */
  removePersistentDomainForName(domainName: string): void; 
  synchronize(): boolean; 
  /**
   * @param key NSString*
   */
  objectIsForcedForKey(key: string): boolean; 
  /**
   * @param key NSString*
   * @param domain NSString*
   */
  objectIsForcedForKey(key: string, domain: string): boolean; 
}