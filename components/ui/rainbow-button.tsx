import React from 'react';

import useRainbow from '@/hooks/use-rainbow';
import {Button} from "@/components/ui/button";

const MagicRainbowButton = ({
                              children,
                              intervalDelay = 1300,
                              ...delegated
                            }: {children: React.ReactNode, intervalDelay: number}) => {
  const transitionDelay = intervalDelay * 1.25;

  const colors = useRainbow({intervalDelay});

  const colorKeys = Object.keys(colors);

  return (
    <Button
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
    </Button>
  );
};


export default MagicRainbowButton;