const verkaufspreis_toFloat = 1500;

let ebayProvision = Math.min(990,verkaufspreis_toFloat)*11/100 + Math.max(0,verkaufspreis_toFloat-990)*2/100;

console.log(ebayProvision);
console.log(typeof(ebayProvision));
