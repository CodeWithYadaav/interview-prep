function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function buildList(arr) {
    let dummy = new ListNode(-1);
    let curr = dummy;
    for (let val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    return dummy.next;
}

function printList(head) {
    const res = [];
    while (head) {
        res.push(head.val);
        head = head.next;
    }
    console.log(res.join(" -> "));
}

// 🔁 Remove Nth node from end
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(-1, head);
    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i < n; i++) fast = fast.next;

    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummy.next;
}

// ✅ Example
const head = buildList([1, 2, 3, 4, 5]);
const n = 2;

console.log("Original:");
printList(head);

const updated = removeNthFromEnd(head, n);

console.log(`After removing ${n}th node from end:`);
printList(updated);
