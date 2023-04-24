import Bisektionsverfahren from './nichtlineare-gleichungssysteme/bisektionsverfahren';


type Interval = {
  a: number,
  b: number
  // toString(): () => string
}


const intervalToString = (interval: Interval) => {
  return `[${interval.a},${interval.b}]`
}

export default function Home() { 

  return (
    <Bisektionsverfahren/>
  )
}
