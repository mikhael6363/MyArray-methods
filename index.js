'use strict';

function MyArray() {
  this.length = 0;
  for(let i = 0; i < arguments.length; i++) {
    this.push(arguments[i]);
  }
}

// 1. Method - MyArray.isMyArray(arg)
MyArray.isMyArray = function isMyArray(obj) {
  return obj instanceof MyArray;
};

function MyArrayProto() {

 // 2. Method .push()
 this.push = function push() {
   for(let i = 0; i < arguments.length; i++) {
     this[this.length++] = arguments[i];
   }
   return this.length;
 };

 // 3. Method .pop()
 this.pop = function pop() {
   if(this.length === 0) {
     return;
   }
   const lastItem = this[this.length - 1];
   delete this[--this.length];
   return lastItem;
 };

 // 4. Method .unshift()
 this.unshift = function unshift() {
   for(let i = this.length - 1; i >= 0; i--) {                          
     this[i + arguments.length] = this[i];
     this[i] = arguments[i];
   }
   return this.length += arguments.length;
 };

 // 5. Method .shift()
 this.shift = function shift() {
   if(this.length === 0) {
     return;
   }
   const firstItem = this[0];
   for(let i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }
  delete this[--this.length];  
  return firstItem;
 };

 // 6. Method .concat()
this.concat = function concat() {
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
 this.reverse = function reverse() {
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
 };
 

 // Advanced tasks

 // 8. Method .forEach()
 this.forEach = function forEach(func) {
  for(let i = 0; i < this.length; i++) {
    func(this[i], i, this);
  }
  return;
};

 // 8. Method .map() // объединение forEach & filter
 this.map = function map(func) {
  const newArray = new MyArray();
   // 1st variant
  // newArray.forEach().push(func(this[i]));
  
  // 2nd variant
   for(let i = 0; i < this.length; i++) {
    newArray.push(func(this[i], i, this));
  }
  return newArray;
 };


 // Additional tasks

 // 9. Method .flat()
 this.flat = function flat() {
   const newArray = new MyArray();

   return newArray;
 };

 // 10. Method .every()
 this.every = function every(func) {
  for(let i = 0; i < this.length; i++) {
    if(!func([i], i, this)) {
      return false;
    }
    return true;
  }
};

 // 11. Method .some()
 this.some = function some(func) {
  for(let i = 0; i < this.length; i++) {
    if(func(this[i], i, this)) {
      return true;
    }
    return false;
  }
};

 // 12. Method .filter()
 this.filter = function filter(func) {
    const filteredNums = new MyArray();
    for(let i = 0; i < this.length; i++) {
      if(func(this[i], i, this)) {
        filteredNums.push(this[i]);
      }
    }
    return filteredNums;
  };
}

MyArray.prototype = new MyArrayProto();

const array1 = new MyArray(1, 2, 3, 4, 5);
const array22 = new MyArray(1, 2, 3, 4, 5);
const array2 = new Array(1, 2, 3, 4, 5);
const array3 = [
  {name: 'Mike', age: 18},
  {name: 'Helen', age: 13},
  {name: 'Brian', age: 23}
];