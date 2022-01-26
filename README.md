# MarginNote Addon API

[插件开发指南预览版](http://docs.test.marginnote.cn)

## objc - js object map

<https://stackoverflow.com/questions/23047512/how-is-an-objc-js-bridge-translated>
<https://developer.apple.com/documentation/javascriptcore/jsvalue>

When converting between JavaScript values and Objective-C objects a copy is performed. Values of types listed below are copied to the corresponding types on conversion in each direction. For NSDictionaries, entries in the dictionary that are keyed by strings are copied onto a JavaScript object. For dictionaries and arrays, conversion is recursive, with the same object conversion being applied to all entries in the collection.

| Objective-C type |     JavaScript type     |
| :--------------: | :---------------------: |
|       nil        |        undefined        |
|      NSNull      |          null           |
|     NSString     |         string          |
|     NSNumber     |     number, boolean     |
|     CGSize       |      Object object      |
|   NSDictionary   |      Object object      |
|     NSArray      |      Array object       |
|      NSDate      |       Date object       |
|   NSBlock [^1]   |  Function object [^1]   |
|     id [^2]      |   Wrapper object [^2]   |
|    Class [^3]    | Constructor object [^3] |

[^1]: Instances of NSBlock with supported arguments types will be presented to JavaScript as a callable Function object. For more information on supported argument types see JSExport.h. If a JavaScript Function originating from an Objective-C block is converted back to an Objective-C object the block will be returned. All other JavaScript functions will be converted in the same manner as a JavaScript object of type Object.
[^2]: For Objective-C instances that do not derive from the set of types listed above, a wrapper object to provide a retaining handle to the Objective-C instance from JavaScript. For more information on these wrapper objects, see JSExport.h. When a JavaScript wrapper object is converted back to Objective-C the Objective-C instance being retained by the wrapper is returned.
[^3]: For Objective-C Class objects a constructor object containing exported class methods will be returned. See JSExport.h for more information on constructor objects.
