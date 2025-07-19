// Input:  1 → 2 → 3 → 4 → 5
// Output: 5 → 4 → 3 → 2 → 1

// Iterative Solution – O(n) Time, O(1) Space
// 🔹 Logic:
// Use three pointers: prev, curr, next
// Reverse curr.next to point to prev
// Move prev and curr forward


// Definition for a singly-linked list node
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
  }
  
  // Helper: Build a linked list from array
  function buildList(arr) {
    let dummy = new ListNode(-1);
    let current = dummy;
  
    for (let val of arr) {
      current.next = new ListNode(val);
      current = current.next;
    }
  
    return dummy.next; // head of the actual list
  }
  
  // Helper: Print linked list as string
  function printList(head) {
    let result = [];
    while (head) {
      result.push(head.val);
      head = head.next;
    }
    console.log(result.join(" -> "));
  }
  
  // 🔁 Core Function: Reverse a linked list
  function reverseList(head) {
    let prev = null;
    let curr = head;
  
    while (curr) {
      let next = curr.next; // save next node
      curr.next = prev;     // reverse pointer
      prev = curr;          // move prev forward
      curr = next;          // move curr forward
    }
  
    return prev; // new head
  }
  
  // 🚀 Test Case
  const inputArray = [1, 2, 3, 4, 5];
  const head = buildList(inputArray);
  
  console.log("Original List:");
  printList(head);
  
  const reversedHead = reverseList(head);
  
  console.log("Reversed List:");
  printList(reversedHead);
  