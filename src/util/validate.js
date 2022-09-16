// 表单校验
// 不能输入特殊字符
// const specialCharactersValidation = /^[\u4e00-\u9fa50-9A-Za-z]*$/;

// 只能为英文及数字
// const englishNumbersValidation = /^[A-Za-z0-9]+$/;

// 只能为英文
// const englishValidation = /^[A-Za-z]+$/;
export const validateForm = {
  // 验证自然数
  naturalNumber: /^(([0-9]*[1-9][0-9]*)|(0+))$/,
  // 银行卡号码
  bankCard: /^[1-9]\d{9,19}$/,
  // 校验身份证
  IdCard:
    /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/g,
  Tel: /^(?:(?:\+|00)86)?1\d{10}$/g,
  Email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,

  // 只能为英文
  english: /^[A-Za-z]+$/,
  // 只能为英文及数字
  englishNumber: /^[A-Za-z0-9]+$/,
  // 特殊字符
  specialCharacters: /^[\u4e00-\u9fa50-9A-Za-z]*$/
};
/**
 * class
 * 静态方法，在class指专属于class本身的方法，而且不会被类的实例所继承。
 * 静态方法里的this指向类本身。
 * new.target
 */
class Validate {
  constructor(rules, form) {
    if (new.target === Validate) {
      this.valid = true; // 校验结果
      this.errorMessage = []; // 错误信息
      if (rules === undefined || typeof rules !== 'object') {
        throw new Error('必须传入规则对象');
      } else {
        this.rules = rules; // 规则对象
      }
      if (form === undefined || typeof form !== 'object') {
        throw new Error('必须传入表单对象');
      } else {
        this.form = form; // 表单对象
      }
    } else {
      throw new Error('必须使用 new 命令生成实例');
    }
  }

  // 校验必填
  checkRequired(field) {
    if (!field) return false;
    return true;
  }

  // 校验身份证
  checkIdCard(field) {
    if (
      !/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/g.test(
        field
      )
    ) {
      return false;
    }
    return true;
  }

  // 校验手机号(最宽松)
  checkTel(field) {
    if (!/^(?:(?:\+|00)86)?1\d{10}$/g.test(field)) return false;
    return true;
  }

  // 校验邮箱
  checkEmail(field) {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        field
      )
    ) {
      return false;
    }
    return true;
  }

  // 校验min
  checkMin(min, field) {
    if (typeof min !== 'number' || typeof field !== 'number') return false;
    if (field < min) return false;
    return true;
  }

  // 校验max
  checkMax(max, field) {
    if (typeof max !== 'number' || typeof field !== 'number') return false;
    if (field > max) return false;
    return true;
  }

  // 进行校验
  __validateForm() {
    // 遍历规则对象去表单数据匹配
    for (const ruleItemKey of Object.keys(this.rules)) {
      const ruleItem = this.rules[ruleItemKey];
      for (let i = 0; i < ruleItem.length; i++) {
        if (ruleItem[i].required !== undefined && ruleItem[i].required) {
          this.valid = this.valid && this.checkRequired(this.form[ruleItemKey]);
          if (!this.checkRequired(this.form[ruleItemKey])) {
            this.errorMessage.push(ruleItem[i].message);
          }
        }
        // 该字段必填或者该字段不为空
        if (ruleItem[i].required || this.form[ruleItemKey]) {
          if (ruleItem[i].idcard !== undefined && ruleItem[i].idcard) {
            this.valid = this.valid && this.checkIdCard(this.form[ruleItemKey]);
            if (!this.checkIdCard(this.form[ruleItemKey])) {
              this.errorMessage.push(ruleItem[i].message);
            }
          }
        }
        if (ruleItem[i].required || this.form[ruleItemKey]) {
          if (ruleItem[i].tel !== undefined && ruleItem[i].tel) {
            this.valid = this.valid && this.checkTel(this.form[ruleItemKey]);
            if (!this.checkTel(this.form[ruleItemKey])) {
              this.errorMessage.push(ruleItem[i].message);
            }
          }
        }
        if (ruleItem[i].required || this.form[ruleItemKey]) {
          if (ruleItem[i].email !== undefined && ruleItem[i].email) {
            this.valid = this.valid && this.checkEmail(this.form[ruleItemKey]);
            if (!this.checkEmail(this.form[ruleItemKey])) {
              this.errorMessage.push(ruleItem[i].message);
            }
          }
        }
        if (ruleItem[i].required || this.form[ruleItemKey]) {
          if (ruleItem[i].min !== undefined && ruleItem[i].min) {
            this.valid =
              this.valid &&
              this.checkMin(ruleItem[i].min, this.form[ruleItemKey]);
            if (!this.checkMin(ruleItem[i].min, this.form[ruleItemKey])) {
              this.errorMessage.push(ruleItem[i].message);
            }
          }
        }
        if (ruleItem[i].required || this.form[ruleItemKey]) {
          if (ruleItem[i].max !== undefined && ruleItem[i].max) {
            this.valid =
              this.valid &&
              this.checkMax(ruleItem[i].max, this.form[ruleItemKey]);
            if (!this.checkMax(ruleItem[i].max, this.form[ruleItemKey])) {
              this.errorMessage.push(ruleItem[i].message);
            }
          }
        }
      }
    }
    return this.valid;
  }
}
export default Validate;
