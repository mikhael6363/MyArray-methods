'use strict';

class MyArray {
  constructor() {
    this.length = 0;
    for(let i = 0; i < arguments.length; i++) {
      this.push(arguments[i]);
    }
  }
  // 1. Method - MyArray.isMyArray(obj)
  static isMyArray(obj) {
    return obj instanceof MyArray; 
  }
  
  // 2. Method .push()
  push() {
    for(let i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    }
    return this.length;
  }

  // 3. Method .pop()
  pop() {
    if(this.length === 0) {
      return;
    }
    const lastItem = this[this.length - 1];
    delete this[--this.length];
    return lastItem;
  }

  // 4. Method .unshift()
  unshift() {
    for(let i = this.length - 1; i >= 0; i--){
      this[i + arguments.length] = this[i];
      this[i] = arguments[i];
    }
    return this.length += arguments.length;
  }

  // 5. Method .shift()
  shift() {
    if(this.length === 0) {
      return;
    }
    const firstItem = this[0];
    for(let i = 0; i < this.length; i++) {
      this[i] = this[i + 1];
    }
    delete this[--this.length];  
    return firstItem;
  }

  // 6. Method .concat()
  concat() {
    const newArray = new MyArray();
    for(let i = 0; i < this.length; i++) {
      newArray.push(this[i]);
    }
    for(let i = 0; i < arguments.length; i++) {
      for(let j = 0; j < arguments[i].length; j++) {
        newArray.push(arguments[i][j]);
      }
    }
    // for(let i = 0; i < arguments.length; i++) {
    //   newArray.push(arguments[i]);
    // }
    return newArray;
  }

  // 7. Method .reverse()
  reverse() {
    for(let i = 0; i < this.length / 2; i++) {
      const savedItem = this[i]
      this[i] = this[this.length - i - 1];
      this[this.length - i - 1] = savedItem;
    }
    return this;

    // 2nd version 
    //  const newRevesedArray = new MyArray();
    //  for(let i = this.length - 1; i >= 0; i--) {
    //    newRevesedArray.push(this[i]);
    //  }
    //  return newRevesedArray;
  }


  /* Advanced tasks */

  // 8. Method .forEach()
  forEach(func) {
    for(let i = 0; i < this.length; i++) {
      func(this[i], i, this);
    }
    return;
  }

  // 9. Method .map()
  map(func) {
    const newArray = new MyArray();
    // 1st variant
    // newArray.forEach().push(func(this[i]));
  
    // 2nd variant
    for(let i = 0; i < this.length; i++) {
      newArray.push(func(this[i], i, this));
    }
    return newArray;
  }
  

  /* Additional tasks */

  // 10. Method .flat()
  flat(depth = 1) {
    let newArray = new MyArray();
    /* Императивный стиль кода: 
    for (let i = 0; i < this.length; i++) {
      if(MyArray.isMyArray(this[i]) && depth) { // или depth > 0
        newArray = newArray.concat(this[i].flat(depth - 1));
      } else if(this[i] !== undefined) {
        newArray.push(this[i]);
      }
    } */

    /* Функциональный (декларативный) стиль кода: */
    this.forEach((item) => {
      if(MyArray.isMyArray(item) && depth) { // или depth > 0
        newArray = newArray.concat(item.flat(depth - 1));
      } else if(item !== undefined) {
        newArray.push(item);
      }
    });
    return newArray;
  }

  // 11. Method .every()
  every(func) {
    for(let i = 0; i < this.length; i++) {
      if(!func([i], i, this)) {
        return false;
      }
      return true;
    }
  }

  // 12. Method .some()
  some(func) {
    for(let i = 0; i < this.length; i++) {
      if(func(this[i], i, this)) {
        return true;
      }
      return false;
    }
  }

  // 13. Method .filter()
  filter(func) {
    const filteredNums = new MyArray();
    for(let i = 0; i < this.length; i++) {
      if(func(this[i], i, this)) {
        filteredNums.push(this[i]);
      }
    }
    return filteredNums;
  }

  // 14. Method [Symbol.iterator]()
  [Symbol.iterator]() {
    return new MyArrayIterator(this);
  }
}

class MyArrayIterator {
  /**
   * 
   * @param {MyArray} myArray 
   */
  constructor(myArray) {
    this.array = myArray;
    this.currentItem = 0;
  }
  next() {
    return {
      value: this.array[this.currentItem++],
      done: this.currentItem > this.array.length,
    }
  }
}

const array = new MyArray(1, 2, 3, 4, 5);