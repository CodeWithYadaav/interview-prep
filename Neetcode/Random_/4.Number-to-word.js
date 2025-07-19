function numberToWords(n) {
    if (n === 0) return 'zero';

    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "million", "billion"];

    function convertToWords(num) {
        let word = '';

        if (num >= 1000) {
            word += convertToWords(Math.floor(num / 1000)) + " thousand ";
            num %= 1000;
        }
        if (num >= 100) {
            word += ones[Math.floor(num / 100)] + " hundred ";
            num %= 100;
        }
        if (num >= 20) {
            word += tens[Math.floor(num / 10)] + " ";
            num %= 10;
        }
        if (num >= 11 && num <= 19) {
            word += teens[num - 10] + " ";
            return word.trim();
        }
        if (num >= 1 && num <= 9) {
            word += ones[num] + " ";
        }

        if (num === 10) {
            word += tens[1] + " ";
        }

        return word.trim();
    }

    return convertToWords(n).trim();
}

const N = 111111;
console.log(numberToWords(N));
