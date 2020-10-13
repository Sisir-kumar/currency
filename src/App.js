import React,{useEffect ,useState} from 'react';
import Currencyrow from './Currencyrow'
import './App.css';

const BASE_URL="https://api.frankfurter.app/latest"

function App() {

   const [currencyOptions, setcurrencyOptions] = useState([])
   const [fromCurrency, setFromCurrency] = useState()
   const [toCurrency, setToCurrency] = useState()
   const [amount, setAmount] = useState(1)
   const [exchangerate, setExchangerate] = useState()
   const [amountInfromcurrency, setAmountInfromcurrency] = useState(true)

  let toAmount ,fromAmount
  if(amountInfromcurrency){
    fromAmount=toAmount
    toAmount=amount*exchangerate
  }else{
    toAmount=fromAmount
    fromAmount=amount/exchangerate
  }
 

  useEffect(()=>{
     fetch(BASE_URL)
         .then(res=>res.json())
         .then(data=>{
           const firstcurrency=Object.keys(data.rates)[0]
           setcurrencyOptions([data.base,...Object.keys(data.rates)])
           setFromCurrency(data.base)
           setToCurrency(firstcurrency)
           setExchangerate(data.rates[firstcurrency])
         })
  },[])

  useEffect(()=>{
     if(fromCurrency !=null && toCurrency!=null){
       fetch(`${BASE_URL}?from=${fromCurrency}&to${toCurrency}`)
       .then(res=>res.json())
       .then(data=> setExchangerate(data.rates[toCurrency]))
     }
  },[fromCurrency,toCurrency])

  function handlefromAmountchange(e){
    setAmount(e.target.value)
    setAmountInfromcurrency(true)

  }
  function handletoAmountchange(e){
    setAmount(e.target.value)
    setAmountInfromcurrency(false)
  }
     
  return (
    <div className="App">
       <h1>Convert</h1>
       <Currencyrow currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e=>setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handlefromAmountchange}
       />
       <h2>convert</h2>
       <Currencyrow currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e=>setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handletoAmountchange}
        />
    </div>
  );
}

export default App;
