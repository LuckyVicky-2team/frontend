const useLocalStorage = () => {
  //   const setSaveItem = (value: number) => {
  //     setState((prev: number[]) => {
  //       prev.includes(value)
  //         ? prev.filter((el: number) => el !== value)
  //         : [...prev, value];
  //     });
  //   };
  //   const getLocalStorage = () => {
  //     const item = localStorage.getItem(key);
  //     if (item === null) return initialState;
  //     const parsedItem = JSON.parse(item);
  //     console.log(parsedItem ?? '왕!');
  //     const now = new Date();
  //     if (parsedItem.expiration && now.getTime() > parsedItem.expireTime) {
  //       window.localStorage.removeItem(key);
  //       return initialState;
  //     }
  //     return parsedItem.value;
  //   };
  //   const [state, setState] = useState(() => getLocalStorage());
  //   useEffect(() => {
  //     const now = new Date();
  //     const expiration = now.getTime() + days * 24 * 60 * 60 * 1000;
  //     localStorage.setItem(key, JSON.stringify({ value: state, expiration }));
  //   }, [key, state, days]);
  //   return [state, setSaveItem];
  return [];
};

export default useLocalStorage;
