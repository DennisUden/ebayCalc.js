//const { read } = require("node:fs");
const { Table} = require("console-table-printer");

const readline = require("node:readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const recursiveAsyncReadLine = function () {
  readline.question(`Verkaufspreis_Ebay: `, (verkaufspreis_input) => {

    if (verkaufspreis_input == "ek") {
      readline.question(
        `Artikeleinkaufspreis: `,
        (artikeleinkaufspreis_input) => {
          artikeleinkaufspreis_toFloat = parseFloat(
            artikeleinkaufspreis_input.replace(",", ".")
          );
          recursiveAsyncReadLine();
        }
      );
    }

    verkaufspreis_toFloat = parseFloat(verkaufspreis_input.replace(",", "."));
    
    //put all calculations and outputs in here:
    if (verkaufspreis_input != "ek") {
//      const kosten = artikeleinkaufspreis_toFloat * menge_toFloat;
//      const umsatz = verkaufspreis_toFloat * menge_toFloat;
//      const gewinn = umsatz - kosten;
      
//      console.log(`\x1b[33m Umsatz: ${umsatz} \x1b[0m`);
//      console.log(`\x1b[31m Kosten: ${kosten} \x1b[0m`);
//      console.log(`\x1b[32m Gewinn: ${gewinn} \x1b[0m`);
      ebayProvision = Math.min(990,verkaufspreis_toFloat)*11/100 + Math.max(0,verkaufspreis_toFloat-990)*2/100;
      versandkosten = 5.5;
      verkaufspreis_ebay_netto = verkaufspreis_toFloat/1.19; 
      verkaufspreis_ebay_netto_minusAbgaben = verkaufspreis_ebay_netto - ebayProvision - versandkosten;
      discount_percent = [0,5,10,15,20];
      einkaufspreis_plusFracht = artikeleinkaufspreis_toFloat+(artikeleinkaufspreis_toFloat/100*frachtmarge_toFloat);
      verkaufspreis_webshop_brutto = parseFloat((verkaufspreis_toFloat-ebayProvision-versandkosten).toFixed(2));
/*      table_array = [];
      for (let i=0; i<5; i++) {
        table_array.push({
          "discount": discount_percent[i], 
          "gewinn": parseFloat(((verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)-(verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)/100*discount_percent[i]).toFixed(2)),
          "marge":  parseFloat((((verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)-(verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)/100*discount_percent[i])*100/verkaufspreis_ebay_netto_minusAbgaben).toFixed(2))
        })
      }
      console.table(table_array);*/

  const p = new Table();
  for (let i=0; i<5; i++) {
    p.addRow(
      {"discount": discount_percent[i], 
      "gewinn": parseFloat(((verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)-(verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)/100*discount_percent[i]).toFixed(2)),
      "marge":  parseFloat((((verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)-(verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)/100*discount_percent[i])*100/verkaufspreis_ebay_netto_minusAbgaben).toFixed(2)),
      "breakeven": Math.ceil((einkaufspreis_plusFracht*menge_toFloat)/((verkaufspreis_ebay_netto_minusAbgaben-verkaufspreis_ebay_netto_minusAbgaben/100*discount_percent[i])))},
      (function(){
        if(parseFloat((((verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)-(verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)/100*discount_percent[i])*100/verkaufspreis_ebay_netto_minusAbgaben).toFixed(2))<30) return {color: "red"};
        if(parseFloat((((verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)-(verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)/100*discount_percent[i])*100/verkaufspreis_ebay_netto_minusAbgaben).toFixed(2))>=30 && 
        parseFloat((((verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)-(verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)/100*discount_percent[i])*100/verkaufspreis_ebay_netto_minusAbgaben).toFixed(2))<50) return {color: "yellow"};
        if(parseFloat((((verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)-(verkaufspreis_ebay_netto_minusAbgaben-einkaufspreis_plusFracht)/100*discount_percent[i])*100/verkaufspreis_ebay_netto_minusAbgaben).toFixed(2))>=50 ) return {color: "green"};
      }())
    ); 
  }
  console.log(`\x1b[96m Verkaufspreis_Webshop: ${verkaufspreis_webshop_brutto} \x1b[0m`); 
  p.printTable();
  console.log(`Um den Einkaufspreis neu zu setzen, sende "ek"\nUm das Programm zu beenden, drücke STRG+C`)

    }
    recursiveAsyncReadLine();
  });
};

readline.question(`Artikeleinkaufspreis: `, (artikeleinkaufspreis_input) => {
  artikeleinkaufspreis_toFloat = parseFloat(
    artikeleinkaufspreis_input.replace(",", ".")
  );

  readline.question(`Frachtmarge: `, (frachtmarge_input) => {
    frachtmarge_toFloat = parseFloat(frachtmarge_input.replace(",", "."));

    readline.question(`Menge: `, (menge_input) => {
      menge_toFloat = parseFloat(menge_input.replace(",", "."));
      //        readline.question(`Verkaufspreis: `, (verkaufspreis_input) => {
      //          verkaufspreis_toFloat = parseFloat(verkaufspreis_input.replace(",","."))
      //          console.log(`Menge value is: ${menge_toFloat}\nand the type: ${typeof(menge_toFloat)}`);
      //          console.log(`Menge * Artikeleinkaufspreis = ${menge_toFloat*artikeleinkaufspreis_toFloat}`);
      //     readline.close();
      recursiveAsyncReadLine();
    });
  });
});
