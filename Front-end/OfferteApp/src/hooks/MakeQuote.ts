import {Bestelling} from "../types/Bestelling.ts";

function MakeQuote(quote: Bestelling) {
    console.log(JSON.stringify(quote));
    try{
        fetch("/api/Quotation", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quote)
        }).then(response => response.json())
        .then(data => console.log(data));}
    catch(err){
        console.log(err);
    }
}

export default MakeQuote;