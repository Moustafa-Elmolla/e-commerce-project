import { createContext, useState } from "react";

export let CounterContext = createContext(0)

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState("Moustafa");

  function increment() {
    setCounter(counter+1)
  }
  function decrement() {
    setCounter(counter-1)
  }
  return <CounterContext.Provider value={{counter, userName, increment, decrement}}>

    {props.children}
  </CounterContext.Provider>
}