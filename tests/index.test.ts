import { EnumDesc, EnumMember, EnumPlus } from '../src/index';

/** 简单枚举测试类 */
class SimpleEnums {
    /** 销售出货 */
    @EnumDesc(1, '销售出货')
    test1: EnumMember;

    /** 货物调拨 */
    @EnumDesc(2, '货物调拨')
    test2: EnumMember;

    /** 空指针测试1 */
    @EnumDesc(3, '')
    OTHER1: EnumMember;

    /** 空指针测试2 */
    @EnumDesc('', 4)
    OTHER2: EnumMember;

    /** 空指针测试3 */
    @EnumDesc('', '')
    OTHER3: EnumMember;

    /** 非枚举属性测试 */
    OTHER4: number = 1;
}

/** 拓展枚举测试类 */
class FromSourceEnums extends EnumPlus {
    /** 销售出货 */
    @EnumDesc(1, '销售出货')
    test1: EnumMember;

    /** 货物调拨 */
    @EnumDesc(2, '货物调拨')
    test2: EnumMember;
    
    /** 相同key测试 */
    @EnumDesc(2, '销售出货')
    test3: EnumMember;

    /** 相同value测试 */
    @EnumDesc(3, '货物调拨')
    test4: EnumMember;

    /** 空指针测试1 */
    @EnumDesc(3, '')
    OTHER1: EnumMember;

    /** 空指针测试2 */
    @EnumDesc('', 4)
    OTHER2: EnumMember;

    /** 空指针测试3 */
    @EnumDesc('', '')
    OTHER3: EnumMember;

    /** 非枚举属性测试 */
    OTHER4: number = 1;
} 
/** 空枚举拓展测试类 */
class EmptyEnums extends EnumPlus {}

const simpleEnums = new SimpleEnums()
const fromSourceEnums = new FromSourceEnums()
const emptyEnums = new EmptyEnums()

describe('枚举类测试', () => {
    it('简单枚举：成员变量测试', () => {
        expect(simpleEnums.test1.getCode()).toEqual(1)
        expect(simpleEnums.test1.getValue()).toEqual('销售出货')
        expect(simpleEnums.test2.getCode()).toEqual(2)
        expect(simpleEnums.test2.getValue()).toEqual('货物调拨')
    })
    it('拓展枚举：成员变量测试', () => {
        expect(fromSourceEnums.test1.getCode()).toEqual(1)
        expect(fromSourceEnums.test1.getValue()).toEqual('销售出货')
        expect(fromSourceEnums.test2.getCode()).toEqual(2)
        expect(fromSourceEnums.test2.getValue()).toEqual('货物调拨')
    })
    it('拓展枚举：拓展方法测试(findCode)', () => {
        expect(fromSourceEnums.findCode('销售出货')).toEqual(1)
        expect(fromSourceEnums.findCode('货物调拨')).toEqual(2)
    })
    it('拓展枚举：拓展方法测试(findValue)', () => {
        expect(fromSourceEnums.findValue(1)).toEqual('销售出货')
        expect(fromSourceEnums.findValue(2)).toEqual('货物调拨')
    })
    it('拓展枚举：拓展方法测试(createOptions)', () => {
        expect(fromSourceEnums.createOptions()).toHaveLength(4)
        expect(fromSourceEnums.createOptions()).toMatchObject([
            {key: '1', value: '销售出货'}, 
            {key: '2', value: '货物调拨'},
            {key: '2', value: '销售出货'},
            {key: '3', value: '货物调拨'},
        ])
        expect(fromSourceEnums.createOptions({excludeKey: [fromSourceEnums.test1.getCode()]})).toMatchObject([
            {key: '2', value: '货物调拨'},
            {key: '2', value: '销售出货'},
            {key: '3', value: '货物调拨'},
        ])
        expect(fromSourceEnums.createOptions({excludeKey: [fromSourceEnums.test2.getCode()]})).toMatchObject([
            {key: '1', value: '销售出货'},
            {key: '3', value: '货物调拨'},
        ])
        expect(fromSourceEnums.createOptions({format: 'K-V'})[0].value).toEqual('1-销售出货')
        expect(fromSourceEnums.createOptions({format: 'KKKK-V'})[0].value).toEqual('1111-销售出货')
        expect(fromSourceEnums.createOptions({format: 'K-V-K-V'})[0].value).toEqual('1-销售出货-1-销售出货')
        expect(fromSourceEnums.createOptions({format: 'test-V'})[0].value).toEqual('test-销售出货')
        expect(fromSourceEnums.createOptions({format: 'K-test'})[0].value).toEqual('1-test')
    })
    it('空拓展测试', () => {
        expect(emptyEnums.findValue(0)).toEqual(void 0)
        expect(emptyEnums.findCode(0)).toEqual(void 0)
        expect(emptyEnums.createOptions()).toHaveLength(0)
    })
})