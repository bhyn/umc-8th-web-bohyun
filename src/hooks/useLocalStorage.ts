export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
      try {
        const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
        window.localStorage.setItem(key, valueToStore);
      } catch (error) {
        console.log(error);
      }
    };

    const getItem = () => {
        try {
            const item : string | null = localStorage.getItem(key)
            return item;
        } catch(e) {
            console.log(e);
        }
    }

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.log(error);
        }
    }

    return {setItem, getItem, removeItem}
  };
 