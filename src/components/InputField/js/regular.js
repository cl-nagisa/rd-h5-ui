export default {
  // 利率正则
  setApr(that) {
    if (that.value !== '') {
      if (that.value.search(/^([1-9]\d{0,1}|0)(?:\.\d{0,2})?$/) === -1) {
        that.value = '';
        that.value = that.value2 ? that.value2 : '';
      } else {
        that.value2 = that.value;
      }
    } else {
      that.value2 = '';
    }
  },
  // 金额正则
  setMoney(that) {
    if (that.value !== '') {
      if (that.value.search(/^([1-9]\d{0,20}|0)(?:\.\d{0,2})?$/) === -1) {
        that.value = '';
        that.value = that.value2 ? that.value2 : '';
      } else {
        that.value2 = that.value;
      }
    } else {
      that.value2 = '';
    }
  },
  // 数字正则
  setNumber(that) {
    if (that.value !== '') {
      if (that.value.search(/^([0-9]\d*)?$/) === -1) {
        that.value = '';
        that.value = that.value2 ? that.value2 : '';
      } else {
        that.value2 = that.value;
      }
    } else {
      that.value2 = '';
    }
  },
  // 手机正则
  setPhone(that) {
    if (that.value !== '') {
      if (that.value.search(/^(\d*)?$/) === -1) {
        that.value = '';
        that.value = that.value2 ? that.value2 : '';
      } else {
        that.value2 = that.value;
      }
    } else {
      that.value2 = '';
    }
  },
  // 禁止输入Emojimo表情符
  setComment(that) {
    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[A9|AE]\u3030|\uA9|\uAE|\u3030/ig;
    if (that.value !== '') {
      if (that.value.search(regStr) !== -1) {
        that.value = '';
        that.value = that.value2 ? that.value2 : '';
      } else {
        that.value2 = that.value;
      }
    } else {
      that.value2 = '';
    }
  },
  // 银行卡正则
  bankNo(that) {
    if (that.value !== '') {
      if (that.value.search(/^(\d*)?$/) === -1) {
        that.value = '';
        that.value = that.value2 ? that.value2 : '';
      } else {
        that.value2 = that.value;
      }
    } else {
      that.value2 = '';
    }
  }
};

