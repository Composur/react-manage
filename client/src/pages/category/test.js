const twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    for (let j = 0; j < nums.length; j++) {
      if (diff === nums[j]) {
        return [i, j];
      }
    }
  }
};
// var twoSum = function(nums, target) {
//   for (var i = 0; i < nums.length; i++) {
//       var dif = target - nums[i];
//       // j = i + 1 的目的是减少重复计算和避免两个元素下标相同
//       for (var j = i + 1; j < nums.length; j++) {
//           if(nums[j] == dif)
//               return [i,j];
//       }
//   }
// };


const arr = twoSum([2, 7, 11, 15], 9);
console.log(arr);
