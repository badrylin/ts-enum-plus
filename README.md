# ts-enum-plus

This repo contains a typescript enum expand class and decorators

## Getting started

```bash
npm i ts-enum-plus --save

or 

yarn add ts-enum-plus --save
```

## Simple Example

``` tsx
class SimpleEnums extends EnumPlus {
    @EnumDesc(1, '销售出货')
    static test1: SimpleEnums;

    @EnumDesc(2, '货物调拨')
    static test2: SimpleEnums;
}

SimpleEnums.test1.getKey() // 1
SimpleEnums.test1.getValue() // 销售出货
SimpleEnums.test2.getKey() // 2
SimpleEnums.test2.getValue() // 货物调拨
SimpleEnums.findKey(1) // 销售出货
SimpleEnums.findKey(2) // 货物调拨
SimpleEnums.findKey('销售出货') // 1
SimpleEnums.findKey('货物调拨') // 2

```
