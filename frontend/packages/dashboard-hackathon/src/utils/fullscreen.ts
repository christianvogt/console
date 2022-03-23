import * as React from 'react';

type FullScreenAPI = {
  requestFullscreen: string;
  exitFullscreen: string;
  fullscreenElement: string;
  fullscreenEnabled: string;
  fullscreenchange: string;
  fullscreenerror: string;
};

const spec: FullScreenAPI = {
  requestFullscreen: 'requestFullscreen',
  exitFullscreen: 'exitFullscreen',
  fullscreenElement: 'fullscreenElement',
  fullscreenEnabled: 'fullscreenEnabled',
  fullscreenchange: 'fullscreenchange',
  fullscreenerror: 'fullscreenerror',
};

const moz: FullScreenAPI = {
  requestFullscreen: 'mozRequestFullscreen',
  exitFullscreen: 'mozExitFullscreen',
  fullscreenElement: 'mozFullscreenElement',
  fullscreenEnabled: 'mozFullscreenEnabled',
  fullscreenchange: 'mozfullscreenchange',
  fullscreenerror: 'mozfullscreenerror',
};

const webkit: FullScreenAPI = {
  requestFullscreen: 'webkitRequestFullscreen',
  exitFullscreen: 'webkitExitFullscreen',
  fullscreenElement: 'webkitFullscreenElement',
  fullscreenEnabled: 'webkitFullscreenEnabled',
  fullscreenchange: 'webkitfullscreenchange',
  fullscreenerror: 'webkitfullscreenerror',
};

const ms: FullScreenAPI = {
  requestFullscreen: 'msRequestFullscreen',
  exitFullscreen: 'msExitFullscreen',
  fullscreenElement: 'msFullscreenElement',
  fullscreenEnabled: 'msFullscreenEnabled',
  fullscreenchange: 'msfullscreenchange',
  fullscreenerror: 'msfullscreenerror',
};

const allPrefixes: FullScreenAPI[] = [spec, moz, webkit, ms];

// TODO address error:
// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Document'.
const doc = document as any;

const nativeAPI: FullScreenAPI =
  (function () {
    return allPrefixes.find((x: FullScreenAPI) => !!doc[x.fullscreenEnabled]);
  })() ?? spec;

export const useFullscreen = <T extends HTMLElement>(): [
  boolean,
  (node: T) => void,
  () => void,
  boolean,
] => {
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);
  const fullscreenRef = React.useRef<boolean>(isFullscreen);
  fullscreenRef.current = isFullscreen;
  const elementRef = React.useRef<any>();

  const listener = React.useCallback((event) => {
    setIsFullscreen(doc[nativeAPI.fullscreenElement] === event.target);
  }, []);

  const targetCallbackRef = React.useCallback(
    (node: T) => {
      if (doc[nativeAPI.fullscreenEnabled]) {
        if (elementRef.current && elementRef.current !== node) {
          elementRef.current.removeEventListener(nativeAPI.fullscreenchange, listener);
          elementRef.current.removeEventListener(nativeAPI.fullscreenerror, listener);
        }
        if (node != null) {
          elementRef.current = node;
          node.addEventListener(nativeAPI.fullscreenchange, listener);
          node.addEventListener(nativeAPI.fullscreenerror, listener);
        }
      }
    },
    [listener],
  );

  const fullscreenToggleCallback = React.useCallback(() => {
    if (elementRef.current && doc[nativeAPI.fullscreenEnabled]) {
      fullscreenRef.current
        ? doc[nativeAPI.exitFullscreen]()
        : elementRef.current[nativeAPI.requestFullscreen]();
    }
  }, []);

  return [
    isFullscreen,
    targetCallbackRef,
    fullscreenToggleCallback,
    doc[nativeAPI.fullscreenEnabled],
  ];
};
