/* 
 * ts枚举拓展
 * @Author: linzeqin
 * @Date: 2019-06-28 10:18:13
 * @Last Modified by: linzeqin
 * @Last Modified time: 2020-09-25 17:13:10
 */

/** 基础枚举数据类型 */
type EnumType = string | number

/** 下拉框Options属性 */
interface SelectOptions {
    key: string;
    value: string;
}

/** 枚举数据转下拉数据配置参数 */
interface EnumCreateOptionsParams {
    /** 需要过滤的成员，不在下拉框中显示的 */
    excludeKey?: EnumType[];
    /** value格式化 K = key, V = value */
    format?: string
}

class EnumMemberClass<C extends EnumType = string, V extends EnumType = string> {
    private code: C;
    private value: V;
    constructor(code: C, value: V) {
        this.code = code;
        this.value = value;
    }

    /**
     * 获取枚举成员的code
     * @returns {C}
     * @memberof EnumMemberClass
     */
    getCode(): C {
        return this.code
    }

    /**
     *
     * 获取枚举成员的value
     * @returns {V}
     * @memberof EnumMemberClass
     */
    getValue(): V {
        return this.value
    }
}

/** 枚举类成员类型 */
export interface EnumMember {
    /**
     * 获取枚举成员的code
     * @returns {C}
     * @memberof EnumMember
     */
    readonly getCode: () => EnumType;

    /**
     *
     * 获取枚举成员的value
     * @returns {V}
     * @memberof EnumMember
     */
    readonly getValue: () => EnumType;

}

/** 枚举成员修饰器 */
export function EnumDesc(code: EnumType, value: EnumType){
    return (target: Object, key: string) => {
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            value: new EnumMemberClass(code, value),
        });
    }
}

/**
 * 枚举类拓展，提供一些枚举类的便捷操作方法
 * @export
 * @class EnumPlus
 */
export class EnumPlus {
    /**
     * 根据传入的value获取code
     * @static
     * @param {EnumType} value
     * @returns
     * @memberof EnumPlus
     */
    findCode(value: EnumType) {
        for (const key in this) {
            const member = this[key] as unknown as EnumMemberClass
            if (member instanceof EnumMemberClass && member.getValue() === value) {
                return member.getCode();
            }
        }
        return
    }
    /**
     * 根据传入的code获取value
     * @static
     * @param {EnumType} code
     * @returns
     * @memberof EnumPlus
     */
    findValue(value: EnumType) {
        for (const key in this) {
            const member = this[key] as unknown as EnumMemberClass
            if (member instanceof EnumMemberClass && member.getCode() === value) {
                return member.getValue();
            } 
        }
        return
    }
    
    /**
     * 将可枚举成员转为options选项集合,多用于下拉选择框赋值
     * @static
     * @param {EnumCreateOptionsParams} [params]
     * @returns {SelectOptions[]}
     * @memberof EnumPlus
     */
    createOptions(params?: EnumCreateOptionsParams): SelectOptions[] {
        const arr: SelectOptions[] = [];
        for (const key in this) {
            const member = this[key] as unknown as EnumMemberClass;
            if (!(member instanceof EnumMemberClass)) {
                continue;
            }
            /** 过滤取不到code的成员 */
            if (member.getCode() === null || member.getCode() === undefined || member.getCode() === '') {
                continue;
            }
            /** 过滤取不到value的成员 */
            if (member.getValue() === null || member.getValue() === undefined || member.getValue() === '') {
                continue;
            }
            /** 过滤需要移除的成员 */
            if (params && params.excludeKey && params.excludeKey.indexOf(member.getCode()) >= 0) {
                continue;
            }
            const code: string = member.getCode().toString();
            const value: string = member.getValue().toString();
            /** 判断是否需要格式化 */
            if (params && params.format) {
                arr.push({
                    key: code,
                    value: params.format.split('').map((item) => {
                        if (item === 'K') return code;
                        if (item === 'V') return value;
                        return item
                    }).join(''),
                })
            } else {
                arr.push({
                    key: code,
                    value,
                })
            }
        }
        return arr;
    }
}