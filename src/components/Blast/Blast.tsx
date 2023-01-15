import { Sprite } from '@inlet/react-pixi';
import * as PIXI from 'pixijs';
import { FC } from 'react';

import blast from '../../assets/blast.png';

const BLAST_HEIGTH = 420;
const BLAST_WIDTH = 420;

interface BlastProps {
  pos: PIXI.IPointData;
}

export const Blast: FC<BlastProps> = ({ pos }) => {
  return (
    <Sprite
      image={blast}
      anchor={{ x: 0, y: 1 }}
      x={pos.x /2 }
      y={pos.y}
      width={BLAST_WIDTH}
      height={BLAST_HEIGTH}
    ></Sprite>
  );
};
