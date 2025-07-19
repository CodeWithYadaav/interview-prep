

function isAnagram(str,str2){
    const resp1= str.split('').sort().join('')
    const resp2= str2.split('').sort().join('')
    if(resp1==resp2) return 'isAnagram'
    else return `no anagram`


}

const str='rapm'
const str2='arm'

console.log(isAnagram(str,str2));
