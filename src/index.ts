/* 
 * ts枚举拓展
 * @Author: linzeqin
 * @Date: 2019-06-28 10:18:13
 * @Last Modified by: linzeqin
 * @Last Modified time: 2021-03-19 13:57:27
 */

/** 基础枚举数据类型 */
type EnumType = string | number

/**
 * 枚举类拓展，提供一些枚举类的便捷操作方法
 * @export
 * @class EnumPlus
 */
export class EnumPlus<K = string, V = string> {
    private key: K;
    private value: V;
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    /**
     * 获取枚举成员的key
     * @returns {K}
     * @memberof EnumPlus
     */
    getKey(): K {
        return this.key
    }

    /**
     *
     * 获取枚举成员的value
     * @returns {V}
     * @memberof EnumPlus
     */
    getValue(): V {
        return this.value
    }

    /**
     * 根据传入的value获取key
     * @static
     * @param {EnumType} value
     * @returns
     * @memberof EnumPlus
     */
    static findKey(value: EnumType) {
        for (const k in this) {
            const member = (this as any)[k] as EnumPlus;
            if (member instanceof EnumPlus && member.getValue() === value) {
                return member.getKey();
            }
        }
        return
    }
    /**
     * 根据传入的key获取value
     * @static
     * @param {EnumType} key
     * @returns
     * @memberof EnumPlus
     */
    static findValue(value: EnumType) {
        for (const k in this) {
            const member = (this as any)[k] as EnumPlus;
            if (member instanceof EnumPlus && member.getKey() === value) {
                return member.getValue();
            } 
        }
        return
    }
    
    /**
     * 转化为数组
     * @static
     * @returns {{key: any, value: any}[]}
     * @memberof EnumPlus
     */
    static toArray(): {key: any, value: any}[] {
        const arr: {key: any, value: any}[] = [];
        for (const k in this) {
            const member = (this as any)[k] as EnumPlus;
            if (!(member instanceof EnumPlus)) {
                continue;
            }
            const key: string = member.getKey();
            const value: string = member.getValue();
            
            /** 过滤取不到key的成员 */
            if (key === null || key === undefined || key === '') {
                continue;
            }
            /** 过滤取不到value的成员 */
            if (value === null || value === undefined || value === '') {
                continue;
            }
            arr.push({
                key,
                value,
            })
        }
        return arr;
    }
}

/** 枚举成员修饰器 */
export function EnumDesc(key: EnumType, value: EnumType) {
    return (target: Object, name: string) => {
        Object.defineProperty(target, name, {
            enumerable: true,
            configurable: true,
            value: new EnumPlus(key, value),
        });
    }
}
