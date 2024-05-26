import {Bestelling} from "../types/Bestelling.ts";

function MakeQuote(quote: Bestelling) {
    try{
        fetch("/api/Quotation", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quote)
        }).then();}
    catch(err){
        console.log(err);
    }
}

export default MakeQuote;