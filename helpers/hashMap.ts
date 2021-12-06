export const filter = <K,V>(m:Map<K,V>, filter: ([key,value]:[K,V]) => Boolean):Map<K,V> => new Map([...m].filter(filter));
