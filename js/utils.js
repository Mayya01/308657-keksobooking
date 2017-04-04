'use strict';


/*
 * Вспомогательные функции, утилиты
 */

// случайное число в диапазоне
function randomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// 1 случайный элемент массива
function randomArrItem(arr) {
  return arr[randomInteger(0, arr.length - 1)];
}

