import  { useEffect, useState } from 'react';
import Navbar from './navbar';
import { Option } from './interfaces/Options';




function PriceList() {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/Options')
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
        setLoading(false);
      })
      .catch((err) => {
         console.log(err);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1>YOYO Price List Here</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {options.map((option) => (
            <li key={option.id}>
              <h2>{option.name}</h2>
              <p>Prijs per M2: €{option.prijsPerM2}</p>
              <p>Spatrand: {option.spatrand}</p>
              <p>Vensterbank: {option.vensterbank}</p>
              <p>Randafwerking per M: €{option.randafwerkingPerM}</p>
              <p>Spatrand per M: €{option.spatrandPerM}</p>
              <p>Vensterbank per M: €{option.vensterbankPerM}</p>
              <p>Uitsparing Onderbouw: €{option.uitsparingOnderbouw}</p>
              <p>Uitsparing Inleg: €{option.uitsparingInleg}</p>
              <p>Uitsparing Ruw: €{option.uitsparingRuw}</p>
              <p>Kraangat: €{option.kraangat}</p>
              <p>Zeepdispenser: €{option.zeepdispenser}</p>
              <p>Boorgaten per Stuk: {option.boorgatenPerStuk ? 'Yes' : 'No'}</p>
              <p>WCD: {option.wcd ? 'Yes' : 'No'}</p>
              <p>Randafwerking: {option.randafwerking ? 'Yes' : 'No'}</p>
              <p>Boorgaten per Stuk Prijs: €{option.boorgatenPerStukPrijs}</p>
              <p>WCD Prijs: €{option.wcdPrijs}</p>
              <p>Achterwand per M: €{option.achterwandPerM}</p>
              <p>Randafwerking per M Price: €{option.randafwerkingPerMPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default PriceList;