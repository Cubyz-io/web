import React from 'react';

import useRainbow from '@/hooks/use-rainbow';

const MagicRainbowText = ({
                            children,
                            intervalDelay = 1300,
                            ...delegated
                          }: { children: React.ReactNode, intervalDelay?: number | undefined, className: string }) => {
  const transitionDelay = intervalDelay * 1.25;

  const colors = useRainbow({intervalDelay});

  const colorKeys = Object.keys(colors);

  return (
    <span
      {...delegated}
      style={{
        ...colors,
        transition: `
          ${colorKeys[0]} ${transitionDelay}ms linear,
          ${colorKeys[1]} ${transitionDelay}ms linear,
          ${colorKeys[2]} ${transitionDelay}ms linear
        `,
        background: `
          radial-gradient(
            circle at top left,
            var(${colorKeys[2]}),
            var(${colorKeys[1]}),
            var(${colorKeys[0]})
          )
        `,
      }}
    >
      {children}
    </span>
  );
};


export default MagicRainbowText;