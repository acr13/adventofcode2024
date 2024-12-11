import { p1 as dayOneP1, p2 as dayOneP2 } from './days/1';
import { p1 as dayTwoP1, p2 as dayTwoP2 } from './days/2';
import { p1 as dayThreeP1, p2 as dayThreeP2 } from './days/3';
import { p1 as dayFourP1, p2 as dayFourP2 } from './days/4';
import { run as dayFive } from './days/5';
import { run as daySix } from './days/6';
import { p1 as daySevenP1, p2 as daySevenP2 } from './days/7';
import { day8 } from './days/8';
import { p1 as dayNineP1, p2 as dayNineP2 } from './days/9';
import { p1 as dayTenP1 ,p2 as dayTenP2 } from './days/10';
import { p1 as dayElevenP1, p2 as dayElevenP2 } from './days/11';

console.log('Day One:');
console.log(dayOneP1());
console.log(dayOneP2());

console.log('Day Two:');
console.log(dayTwoP1());
console.log(dayTwoP2());

console.log('Day Three:');
console.log(dayThreeP1());
console.log(dayThreeP2());

console.log('Day Four:');
console.log(dayFourP1());
console.log(dayFourP2());

console.log('Day Five:');
console.log(dayFive());

// takes like ~20 secs so commenting out (Brute force lol)
console.log('Day Six:');
console.log([ 5239, 1753 ]);
// console.log(daySix());

console.log('Day Seven:');
console.log([4122618559853, 227615740238334]);
// console.log(daySevenP1());
// console.log(daySevenP2());

console.log('Day Eight:');
console.log(day8());

console.log('Day Nine:');
console.log([6323641412437, 6351801932670]);
// console.log(dayNineP1());
// console.log(dayNineP2());

console.log('Day 10:');
console.log(dayTenP1());
console.log(dayTenP2());

console.log('Day 11:');
console.log(dayElevenP1());
console.log(dayElevenP2());
