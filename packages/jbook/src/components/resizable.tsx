import './resizable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = function ({ direction, children }) {
  let resizableBoxProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(Math.floor(window.innerWidth * 0.75));

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      //   timer = setTimeout(() => {
      //     setInnerHeight((prevHeight) => {
      //       if (prevHeight !== window.innerHeight) return window.innerHeight;
      //       return prevHeight;
      //     });
      //     setInnerWidth((prevWidth) => {
      //       const newWidth = Math.floor(window.innerWidth);
      //       if (prevWidth !== newWidth) return newWidth;
      //       return prevWidth;
      //     });
      //     if (window.innerWidth * 0.75 < width)
      //       setWidth(Math.floor(window.innerWidth * 0.75));
      //   }, 100);
      // };

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(Math.floor(window.innerWidth * 0.75));
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  if (direction === 'horizontal') {
    resizableBoxProps = {
      className: 'resize-horizontal',
      minConstraints: [Math.floor(innerWidth * 0.2), Infinity],
      maxConstraints: [Math.floor(innerWidth * 0.75), Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableBoxProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, Math.floor(innerHeight * 0.9)],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
