function mergeSortedArrays(nums1, nums2) {
    let i = 0, j = 0;
    const result = [];
  
    while (i < nums1.length && j < nums2.length) {
      if (nums1[i] < nums2[j]) {
        result.push(nums1[i++]);
      } else {
        result.push(nums2[j++]);
      }
    }
  
    // Add remaining elements
    while (i < nums1.length) result.push(nums1[i++]);
    while (j < nums2.length) result.push(nums2[j++]);
  
    return result;
  }
  
  console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));
// Output: [1, 2, 3, 4, 5, 6]
