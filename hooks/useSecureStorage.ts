import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function useSecureStorage<T>(key: string, initialState: T) {
  const [value, setValue] = useState<T>(initialState);

  useEffect(() => {
    initilizeState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      SecureStore.setItemAsync(key, JSON.stringify(value)).catch((err) =>
        console.log(err)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  async function initilizeState() {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      await setValue(JSON.parse(result));
    } else if (initialState) {
      setValue(initialState);
    }
  }

  return [value, setValue] as const;
}
