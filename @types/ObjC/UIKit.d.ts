import { WrapperObj } from "../misc";

export {};

declare global {
  type UIWindow = unknown;

  type UIView = unknown;

  type UIViewController = unknown;

  type UILocalNotification = unknown;

  type UITableView = unknown;

  type UIColor = unknown;

  /** https://developer.apple.com/documentation/coregraphics/cgpoint */
  type CGPoint = unknown;

  type CGRect = unknown;

  type CGSize = unknown;

  type CGFloat = unknown;

  type CGBlendMode = unknown;

  type UIEdgeInsets = unknown;

  type UITextField = unknown;

  class UIAlertView {
    /**
     *  NSInteger
     */
    readonly numberOfButtons: number;
    readonly visible: boolean;
    /**
     *  NSInteger
     */
    cancelButtonIndex: number;
    title?: string;
    message?: string;
    delegate: WrapperObj<any>;
    alertViewStyle: UIAlertViewStyle;
    /**
     *  NSInteger
     */
    readonly firstOtherButtonIndex: number;
    /**
     * @param title NSString*
     * @param message NSString*
     * @param cancelButtonTitle NSString*
     * @param otherButtonTitles NSArray*
     */
    static makeWithTitleMessageDelegateCancelButtonTitleOtherButtonTitles(
      title: string,
      message: string,
      delegate: WrapperObj<any>,
      cancelButtonTitle: string,
      otherButtonTitles: string[]
    ): UIAlertView;
    /**
     * @param title NSString*
     * @param message NSString*
     * @param cancelButtonTitle NSString*
     * @param otherButtonTitles NSArray*
     * @param tapBlock JSValue*
     */
    static showWithTitleMessageStyleCancelButtonTitleOtherButtonTitlesTapBlock(
      title: string,
      message: string,
      style: UIAlertViewStyle,
      cancelButtonTitle: string,
      otherButtonTitles: string[],
      tapBlock: (alert: UIAlertView, tappedButtonIndex: number) => any
    ): UIAlertView;
    /**
     * @returns NSInteger
     * @param title NSString*
     */
    addButtonWithTitle(title: string): number;
    /**
     * @returns NSString*
     * @param buttonIndex NSInteger
     */
    buttonTitleAtIndex(buttonIndex: number): string;
    show(): void;
    /**
     * @param buttonIndex NSInteger
     */
    dismissWithClickedButtonIndexAnimated(
      buttonIndex: number,
      animated: boolean
    ): void;
    /**
     * @returns UITextField*
     * @param textFieldIndex NSInteger
     */
    textFieldAtIndex(textFieldIndex: number): UITextField;
  }

  class UIPasteboard {
    persistent: boolean;
    string?: string;
    /**
     *  NSInteger
     */
    readonly numberOfItems: number;
    URL?: NSURL;
    color?: UIColor;
    colors?: Array<any>;
    image?: UIImage;
    /**
     *  NSInteger
     */
    readonly changeCount: number;
    URLs?: Array<NSURL>;
    images?: Array<UIImage>;
    strings?: Array<string>;
    items?: Array<any>;
    readonly name?: string;
    /**
     * @returns UIPasteboard*
     */
    static generalPasteboard(): UIPasteboard;
    /**
     * @returns UIPasteboard*
     * @param pasteboardName NSString*
     */
    static pasteboardWithNameCreate(
      pasteboardName: string,
      create: boolean
    ): UIPasteboard;
    /**
     * @returns UIPasteboard*
     */
    static pasteboardWithUniqueName(): UIPasteboard;
    /**
     * @param pasteboardName NSString*
     */
    static removePasteboardWithName(pasteboardName: string): void;
    /**
     * @returns NSArray*
     */
    pasteboardTypes(): Array<any>;
    /**
     * @param pasteboardTypes NSArray*
     */
    containsPasteboardTypes(pasteboardTypes: Array<any>): boolean;
    /**
     * @returns NSData*
     * @param pasteboardType NSString*
     */
    dataForPasteboardType(pasteboardType: string): NSData;
    /**
     * @param pasteboardType NSString*
     */
    valueForPasteboardType(pasteboardType: string): WrapperObj<any>;
    /**
     * @param pasteboardType NSString*
     */
    setValueForPasteboardType(
      value: WrapperObj<any>,
      pasteboardType: string
    ): void;
    /**
     * @param data NSData*
     * @param pasteboardType NSString*
     */
    setDataForPasteboardType(data: NSData, pasteboardType: string): void;
    /**
     * @returns NSArray*
     * @param itemSet NSIndexSet*
     */
    pasteboardTypesForItemSet(itemSet: NSIndexSet): Array<any>;
    /**
     * @param pasteboardTypes NSArray*
     * @param itemSet NSIndexSet*
     */
    containsPasteboardTypesInItemSet(
      pasteboardTypes: Array<any>,
      itemSet: NSIndexSet
    ): boolean;
    /**
     * @returns NSIndexSet*
     * @param pasteboardTypes NSArray*
     */
    itemSetWithPasteboardTypes(pasteboardTypes: Array<any>): NSIndexSet;
    /**
     * @returns NSArray*
     * @param pasteboardType NSString*
     * @param itemSet NSIndexSet*
     */
    valuesForPasteboardTypeInItemSet(
      pasteboardType: string,
      itemSet: NSIndexSet
    ): Array<any>;
    /**
     * @returns NSArray*
     * @param pasteboardType NSString*
     * @param itemSet NSIndexSet*
     */
    dataForPasteboardTypeInItemSet(
      pasteboardType: string,
      itemSet: NSIndexSet
    ): Array<any>;
    /**
     * @param items NSArray*
     */
    addItems(items: Array<any>): void;
  }

  class UIImage {
    readonly scale: CGFloat;
    /**
     *  NSInteger
     */
    readonly leftCapWidth: number;
    readonly CGImage: WrapperObj<any>;
    readonly size: CGSize;
    /**
     *  NSInteger
     */
    readonly topCapHeight: number;
    readonly imageOrientation: UIImageOrientation;
    /**
     * @returns UIImage*
     * @param name NSString*
     */
    static imageNamed(name: string): UIImage;
    /**
     * @returns UIImage*
     * @param path NSString*
     */
    static imageWithContentsOfFile(path: string): UIImage;
    /**
     * @returns UIImage*
     * @param data NSData*
     */
    static imageWithData(data: NSData): UIImage;
    /**
     * @returns UIImage*
     * @param data NSData*
     */
    static imageWithDataScale(data: NSData, scale: CGFloat): UIImage;
    /**
     * @returns UIImage*
     */
    static imageWithCGImage(cgImage: WrapperObj<any>): UIImage;
    /**
     * @returns UIImage*
     */
    static imageWithCGImageScaleOrientation(
      cgImage: WrapperObj<any>,
      scale: CGFloat,
      orientation: UIImageOrientation
    ): UIImage;
    drawAtPoint(point: CGPoint): void;
    drawAtPointBlendModeAlpha(
      point: CGPoint,
      blendMode: CGBlendMode,
      alpha: CGFloat
    ): void;
    drawInRect(rect: CGRect): void;
    drawInRectBlendModeAlpha(
      rect: CGRect,
      blendMode: CGBlendMode,
      alpha: CGFloat
    ): void;
    drawAsPatternInRect(rect: CGRect): void;
    /**
     * @returns UIImage*
     */
    resizableImageWithCapInsets(capInsets: UIEdgeInsets): UIImage;
    /**
     * @returns UIImage*
     */
    imageWithAlignmentRectInsets(alignmentInsets: UIEdgeInsets): UIImage;
    /**
     * @returns UIImage*
     * @param leftCapWidth NSInteger
     * @param topCapHeight NSInteger
     */
    stretchableImageWithLeftCapWidthTopCapHeight(
      leftCapWidth: number,
      topCapHeight: number
    ): UIImage;
    /**
     * @returns NSData*
     * @param compressionQuality double
     */
    jpegData(compressionQuality: number): NSData;
    /**
     * @returns NSData*
     */
    pngData(): NSData;
  }

  const enum UIImageOrientation {
    /** Rotated 180 degrees.  */
    Down = 1,

    /** Flipped about its vertical axis and then rotated 180 degrees.  */
    DownMirrored = 5,

    /** Rotated 90 degrees counterclockwise.  */
    Left = 2,

    /** Flipped about its horizontal axis and then rotated 90 degrees counterclockwise.  */
    LeftMirrored = 6,

    /** Rotated 90 degrees clockwise.  */
    Right = 3,

    /** Flipped about its horizontal axis and then rotated 90 degrees clockwise.  */
    RightMirrored = 7,

    /** Default orientation.  */
    Up = 0,

    /** Flipped about its vertical axis.  */
    UpMirrored = 4,
  }
  const enum UIAlertViewStyle {
    /** A standard alert. */
    Default = 0,

    /** Allows the user to enter a login id and a password. */
    LoginAndPasswordInput = 3,

    /** Allows the user to enter text. */
    PlainTextInput = 2,

    /** Allows the user to enter text, but the text field is obscured. */
    SecureTextInput = 1,
  }
}
