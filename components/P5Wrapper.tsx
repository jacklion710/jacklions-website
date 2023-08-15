import React, { useEffect } from 'react';
import p5 from 'p5';

interface P5WrapperProps {
  sketch: (p: p5) => void;
}

const P5Wrapper: React.FC<P5WrapperProps> = ({ sketch }) => {
  useEffect(() => {
    new p5(sketch, document.getElementById('p5CanvasContainer') as HTMLElement);

    // Cleanup function to remove the p5 canvas when the component is unmounted
    return function cleanup() {
      // As of now, there's no built-in method to remove a p5 sketch, but the canvas can be manually removed if needed
      let canvas = document.getElementById('defaultCanvas0');
      if (canvas) canvas.remove();
    };
  }, [sketch]);

  return <div id="p5CanvasContainer" />;
};

export default P5Wrapper;
