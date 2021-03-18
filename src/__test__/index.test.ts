import { EnumDesc, EnumPlus } from '../index';

/** 简单枚举测试类 */
class SimpleEnums extends EnumPlus {
    /** 销售出货 */
    @EnumDesc(1, '销售出货')
    static test1: SimpleEnums;

    /** 货物调拨 */
    @EnumDesc(2, '货物调拨')
    static test2: SimpleEnums;
}

/** 拓展枚举测试类 */
class MultiEnums extends EnumPlus {
    /** 销售出货 */
    @EnumDesc(1, '销售出货')
    static test1: MultiEnums;

    /** 货物调拨 */
    @EnumDesc(2, '货物调拨')
    static test2: MultiEnums;
    
    /** 相同key测试 */
    @EnumDesc(2, '销售出货')
    static test3: MultiEnums;

    /** 相同value测试 */
    @EnumDesc(3, '货物调拨')
    static test4: MultiEnums;

    /** 空指针测试1 */
    @EnumDesc(3, '')
    static OTHER1: MultiEnums;

    /** 空指针测试2 */
    @EnumDesc('', 4)
    static OTHER2: MultiEnums;

    /** 空指针测试3 */
    @EnumDesc('', '')
    static OTHER3: MultiEnums;

    /** 非枚举属性测试 */
    static OTHER4: number = 1;
} 
/** 空枚举拓展测试类 */
class EmptyEnums extends EnumPlus {}

describe('枚举类测试', () => {
    it('简单枚举：成员变量测试', () => {
        expect(SimpleEnums.test1.getKey()).toEqual(1)
        expect(SimpleEnums.test1.getValue()).toEqual('销售出货')
        expect(SimpleEnums.test2.getKey()).toEqual(2)
        expect(SimpleEnums.test2.getValue()).toEqual('货物调拨')
    })
    it('拓展枚举：成员变量测试', () => {
        expect(MultiEnums.test1.getKey()).toEqual(1)
        expect(MultiEnums.test1.getValue()).toEqual('销售出货')
        expect(MultiEnums.test2.getKey()).toEqual(2)
        expect(MultiEnums.test2.getValue()).toEqual('货物调拨')
    })
    it('拓展枚举：拓展方法测试(findKey)', () => {
        expect(MultiEnums.findKey('销售出货')).toEqual(1)
        expect(MultiEnums.findKey('货物调拨')).toEqual(2)
    })
    it('拓展枚举：拓展方法测试(findValue)', () => {
        expect(MultiEnums.findValue(1)).toEqual('销售出货')
        expect(MultiEnums.findValue(2)).toEqual('货物调拨')
    })
    it('拓展枚举：拓展方法测试(toArray)', () => {
        expect(MultiEnums.toArray()).toHaveLength(4)
        expect(MultiEnums.toArray()).toMatchObject([
            {key: 1, value: '销售出货'}, 
            {key: 2, value: '货物调拨'},
            {key: 2, value: '销售出货'},
            {key: 3, value: '货物调拨'},
        ])
    })
    it('空拓展测试', () => {
        expect(EmptyEnums.findValue(0)).toEqual(void 0)
        expect(EmptyEnums.findKey(0)).toEqual(void 0)
        expect(EmptyEnums.toArray()).toHaveLength(0)
    })
})