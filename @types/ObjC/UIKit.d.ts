export {};

declare global {
  type UIWindow = any;

  type UIView = any;

  type UIViewController = any;

  type UILocalNotification = any;

  type UITableView = any;

  type UIColor = any;

  /** https://developer.apple.com/documentation/coregraphics/cgpoint */
  type CGPoint = any;

  type CGRect = any;

  type CGSize = any;

  type CGFloat = any;

  type CGBlendMode = any;

  type UIEdgeInsets = any;

  class UIPasteboard {
    persistent: boolean;
    string?: string;
    /**
     *  NSInteger
     */
    readonly numberOfItems: number;
    URL?: NSURL;
    color?: UIColor;
    colors?: Array<UIColor>;
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
    static pasteboardWithName(
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
    setValue(value: WrapperObj<any>, pasteboardType: string): void;
    /**
     * @param data NSData*
     * @param pasteboardType NSString*
     */
    setData(data: NSData, pasteboardType: string): void;
    /**
     * @returns NSArray*
     * @param itemSet NSIndexSet*
     */
    pasteboardTypesForItemSet(itemSet: NSIndexSet): Array<any>;
    /**
     * @param pasteboardTypes NSArray*
     * @param itemSet NSIndexSet*
     */
    containsPasteboardTypes(
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
    valuesForPasteboardType(
      pasteboardType: string,
      itemSet: NSIndexSet
    ): Array<any>;
    /**
     * @returns NSArray*
     * @param pasteboardType NSString*
     * @param itemSet NSIndexSet*
     */
    dataForPasteboardType(
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
    static imageWithData(data: NSData, scale: CGFloat): UIImage;
    /**
     * @returns UIImage*
     */
    static imageWithCGImage(cgImage: WrapperObj<any>): UIImage;
    /**
     * @returns UIImage*
     */
    static imageWithCGImage(
      cgImage: WrapperObj<any>,
      scale: CGFloat,
      orientation: UIImageOrientation
    ): UIImage;

    drawAtPoint(point: CGPoint): void;
    drawAtPoint(point: CGPoint, blendMode: CGBlendMode, alpha: CGFloat): void;
    drawInRect(rect: CGRect): void;
    drawInRect(rect: CGRect, blendMode: CGBlendMode, alpha: CGFloat): void;
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
    stretchableImageWithLeftCapWidth(
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
}
