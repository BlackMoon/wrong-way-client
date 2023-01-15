import { FC, useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { AnimatedSprite, Container, Sprite, Stage } from '@inlet/react-pixi';


import './Scene.scss';

import mountain_left from '../../assets/mountain_left.png';
import mountain_right from '../../assets/mountain_right.png';
import road from '../../assets/road.png';
import sky from '../../assets/sky.png';
import sideroad_left from '../../assets/sideroad_left.png';
import sideroad_right from '../../assets/sideroad_right.png';
import { Road } from '../Road/Road';

interface SceneProps {
  prop1?: string;
}

const texture1 = PIXI.Texture.from('../../assets/sideroad_left.png');
const texture2 = PIXI.Texture.from('../../assets/sideroad_left.png');

const SceneIntl: FC<SceneProps> = ({}) => {
  const mainRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<PIXI.ISize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      if (mainRef.current) {
        const { clientHeight, clientWidth } = mainRef.current;
        const dim = { width: clientWidth, height: clientHeight };
        setSize(dim);
        console.log(
          dim,
          Math.ceil(dim.height / 2),
          mainRef.current.getBoundingClientRect(),
        );
      }
    }
    window.onresize = handleResize;
    handleResize();
  }, [mainRef]);

  return (
    <main className="scene" ref={mainRef}>
      <Stage
        height={size.height}
        width={size.width}
        options={{
          backgroundAlpha: 0,
          resolution: 1,
        }}
      >
        <Container>
          <Road size={size}></Road>
          <Sprite
            image={sideroad_left}
            y={size.height / 2}
            height={size.height}
            scale={0.15}
          ></Sprite>
          <AnimatedSprite
           
           animationSpeed={0.5}
           isPlaying={true}
           textures={[texture1, texture2]}
           anchor={0.5}
          ></AnimatedSprite>
          {/* <Sprite
            image={mountain_left}
           
            
            height={dim.height}
            scale={0.15}
          ></Sprite> */}
        </Container>
      </Stage>
    </main>
  );
};

export const Scene = SceneIntl;
