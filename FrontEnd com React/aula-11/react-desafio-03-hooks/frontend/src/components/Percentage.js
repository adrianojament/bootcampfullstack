import React from 'react';
import CountUp from 'react-countup';

export default function Percentage({ value, previous }) {
  return (
    <div>
      <CountUp
        suffix="%"
        decimals={2}
        decimal=","
        start={previous || 0}
        end={value || 0}
        duration={0.6}
        separator="."
      >
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  );
}
