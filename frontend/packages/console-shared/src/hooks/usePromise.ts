import * as React from 'react';

export const usePromise = <T extends any>(loaded: boolean, value: T) => {
  const valueRef = React.useRef<T>();
  valueRef.current = value;
  const promiseRef = React.useRef<Promise<React.MutableRefObject<T>>>();
  const resolveRef = React.useRef<(value: React.MutableRefObject<T>) => void>();
  if (!promiseRef.current) {
    promiseRef.current = new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }
  if (loaded && resolveRef.current) {
    resolveRef.current(valueRef);
    resolveRef.current = undefined;
  }
  return promiseRef;
};
