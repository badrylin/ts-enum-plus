(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.index = {}));
}(this, (function (exports) { 'use strict';

    /*
     * ts枚举拓展
     * @Author: linzeqin
     * @Date: 2019-06-28 10:18:13
     * @Last Modified by: linzeqin
     * @Last Modified time: 2021-03-19 13:57:27
     */
    /**
     * 枚举类拓展，提供一些枚举类的便捷操作方法
     * @export
     * @class EnumPlus
     */
    var EnumPlus = /** @class */ (function () {
        function EnumPlus(key, value) {
            this.key = key;
            this.value = value;
        }
        /**
         * 获取枚举成员的key
         * @returns {K}
         * @memberof EnumPlus
         */
        EnumPlus.prototype.getKey = function () {
            return this.key;
        };
        /**
         *
         * 获取枚举成员的value
         * @returns {V}
         * @memberof EnumPlus
         */
        EnumPlus.prototype.getValue = function () {
            return this.value;
        };
        /**
         * 根据传入的value获取key
         * @static
         * @param {EnumType} value
         * @returns
         * @memberof EnumPlus
         */
        EnumPlus.findKey = function (value) {
            for (var k in this) {
                var member = this[k];
                if (member instanceof EnumPlus && member.getValue() === value) {
                    return member.getKey();
                }
            }
            return;
        };
        /**
         * 根据传入的key获取value
         * @static
         * @param {EnumType} key
         * @returns
         * @memberof EnumPlus
         */
        EnumPlus.findValue = function (value) {
            for (var k in this) {
                var member = this[k];
                if (member instanceof EnumPlus && member.getKey() === value) {
                    return member.getValue();
                }
            }
            return;
        };
        /**
         * 转化为数组
         * @static
         * @returns {{key: any, value: any}[]}
         * @memberof EnumPlus
         */
        EnumPlus.toArray = function () {
            var arr = [];
            for (var k in this) {
                var member = this[k];
                if (!(member instanceof EnumPlus)) {
                    continue;
                }
                var key = member.getKey();
                var value = member.getValue();
                /** 过滤取不到key的成员 */
                if (key === null || key === undefined || key === '') {
                    continue;
                }
                /** 过滤取不到value的成员 */
                if (value === null || value === undefined || value === '') {
                    continue;
                }
                arr.push({
                    key: key,
                    value: value,
                });
            }
            return arr;
        };
        return EnumPlus;
    }());
    /** 枚举成员修饰器 */
    function EnumDesc(key, value) {
        return function (target, name) {
            Object.defineProperty(target, name, {
                enumerable: true,
                configurable: true,
                value: new EnumPlus(key, value),
            });
        };
    }

    exports.EnumDesc = EnumDesc;
    exports.EnumPlus = EnumPlus;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
