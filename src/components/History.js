import React, { useEffect, useRef } from 'react';
function History(props) {
    const historyRef = useRef(null);
  
    useEffect(() => {
      if (historyRef.current) {
        historyRef.current.scrollLeft = historyRef.current.scrollWidth;
      }
    }, [props.overs]);

  return (
    <div className='history'>
      <span className='recent--history'>Last Overs : </span>
      <div className='scrollable-content' ref={historyRef}>
        {props.overs.map((over, index) => (
          <span key={index} className='over'>
            {over}
          </span>
        ))}
      </div>
    </div>
  );
}

export default History;