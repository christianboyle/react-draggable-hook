import React from 'react';
import { useMemo, useState } from 'react';
import { useDraggable } from './useDraggable';

export const App = () => {
  const [[x, y], setCoords] = useState([0, 0]);
  const style= useMemo(
    () => ({position: 'absolute' as 'absolute', top: `${y}px`, left: `${x}px`}),
    [x, y]
  );
  const [ref, onMouseDown] = useDraggable(setCoords)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} onMouseDown={onMouseDown} style={style}>
      DRAG ME!
    </div>
  );
};