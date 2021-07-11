import React from 'react';

import {
  MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

export type DraggableHandler = (coords: [number, number]) => void;

export const useDraggable = <TRefType extends HTMLElement>(
  onMove: DraggableHandler
): [RefObject<TRefType>, MouseEventHandler] => {
  const ref = useRef<TRefType>(null);
  const [offset, setOffset] = useState<[number, number] | null>(null);

  useEffect(() => {
      if (offset) {
          const move = (e: MouseEvent) =>
              onMove([e.clientX - offset[0], e.clientY - offset[1]]);
          const up = () => setOffset(null);
          document.addEventListener('mousemove', move);
          document.addEventListener('mouseup', up);
          return () => {
              document.removeEventListener('mousemove', move);
              document.removeEventListener('mouseup', up);
          };
      }
  }, [onMove, offset]);

  const onMouseDown: MouseEventHandler = useCallback((e) => {
      const {x, y} = ref.current
          ? ref.current.getBoundingClientRect()
          : {x: 0, y: 0};
      setOffset([e.clientX - x, e.clientY - y]);
  }, []);

  return [ref, onMouseDown];
};