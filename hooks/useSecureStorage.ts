import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function useSecureStorage<T>(key: string, initialState: T) {
  const [value, setValue] = useState<T>(initialState);

  const initilizeState = useCallback(
    async () => {
      const result = await SecureStore.getItemAsync(key);
      if (result) {
        setValue(JSON.parse(result));
      } else if (initialState) {
        setValue(initialState);
      }
    }, [initialState, key]
  );

  useEffect(() => {
    initilizeState();
  }, [initilizeState]);

  useEffect(() => {
    if (value !== undefined) {
      SecureStore.setItemAsync(key, JSON.stringify(value)).catch((err) => console.log(err));
    }
  }, [value, key]);

  return [value, setValue] as const;
}