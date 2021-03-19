/** 基础枚举数据类型 */
declare type EnumType = string | number;
/**
 * 枚举类拓展，提供一些枚举类的便捷操作方法
 * @export
 * @class EnumPlus
 */
export declare class EnumPlus<K = string, V = string> {
    private key;
    private value;
    constructor(key: K, value: V);
    /**
     * 获取枚举成员的key
     * @returns {K}
     * @memberof EnumPlus
     */
    getKey(): K;
    /**
     *
     * 获取枚举成员的value
     * @returns {V}
     * @memberof EnumPlus
     */
    getValue(): V;
    /**
     * 根据传入的value获取key
     * @static
     * @param {EnumType} value
     * @returns
     * @memberof EnumPlus
     */
    static findKey(value: EnumType): string | undefined;
    /**
     * 根据传入的key获取value
     * @static
     * @param {EnumType} key
     * @returns
     * @memberof EnumPlus
     */
    static findValue(value: EnumType): string | undefined;
    /**
     * 转化为数组
     * @static
     * @returns {{key: any, value: any}[]}
     * @memberof EnumPlus
     */
    static toArray(): {
        key: any;
        value: any;
    }[];
}
/** 枚举成员修饰器 */
export declare function EnumDesc(key: EnumType, value: EnumType): (target: Object, name: string) => void;
export {};
