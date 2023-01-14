import { FC, useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Container, Sprite, Stage } from '@inlet/react-pixi';
import './Scene.scss';
import fade from '../../assets/mountain_fade.png';
import road from '../../assets/road.png';
import sky from '../../assets/sky.png';
import { Dim } from '../../types/dim';

interface SceneProps {
  prop1?: string;
}

const SceneIntl: FC<SceneProps> = ({}) => {
  const mainRef = useRef<HTMLDivElement>(null);

  const [dim, setDim] = useState<Dim>({
    xNum: 0,
    yNum: 0,
  });

  useEffect(() => {
    if (mainRef.current) {
      const { clientHeight, clientWidth } = mainRef.current;
      const dim = { xNum: clientWidth - 4, yNum: clientHeight };
      setDim(dim);
    }
  }, [mainRef]);

  return (
    <main className="scene" ref={mainRef}>
      <Stage
        height={dim.yNum}
        width={dim.xNum}
        options={{
          backgroundAlpha: 0 
        }}
      >
        <Container>
          <Sprite image={sky} height={dim.yNum / 2} width={dim.xNum}></Sprite>
          <Sprite image={fade} height={dim.yNum / 2} width={dim.xNum}></Sprite>
          <Sprite
            image={road}
            y={(dim.yNum) / 2}
            height={dim.yNum / 2}
            width={dim.xNum}
          ></Sprite>
        </Container>
      </Stage>
    </main>
  );
};

export const Scene = SceneIntl;
