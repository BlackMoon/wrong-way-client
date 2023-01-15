import { Container, Sprite } from '@inlet/react-pixi';
import * as PIXI from 'pixijs';
import { FC } from 'react';

import fade from '../../assets/mountain_fade.png';
import road from '../../assets/road.png';
import sky from '../../assets/sky.png';

interface RoadProps {
  size: PIXI.ISize;
}

export const Road: FC<RoadProps> = ({ size }) => {
  return (
    <Container>
      <Sprite image={sky} height={size.height} width={size.width}></Sprite>
      <Sprite
        image={fade}
        height={size.height}
        width={size.width}
      ></Sprite>
      <Sprite
        image={road}
        y={(2 * size.height) / 3}
        height={size.height / 2}
        width={size.width}
      ></Sprite>
    </Container>
  );
};
