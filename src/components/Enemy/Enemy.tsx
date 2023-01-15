import { Sprite } from '@inlet/react-pixi';
import * as PIXI from 'pixijs';
import { FC } from 'react';
import { Distance, Maybe, Move } from '../../types';

import enemy_center from '../../assets/cars/enemy_center.png';
import enemy_left from '../../assets/cars/enemy_left.png';
import enemy_right from '../../assets/cars/enemy_right.png';
import { IPointData } from 'pixijs';

interface EnemyProps {
  distance: Maybe<Distance>;
  move: Move;
  pos: PIXI.IPointData;
}

const ENEMY_HEIGTH = 100;
const ENEMY_WIDTH = 120;

const ENEMY_FAR_SCALE = 7;
const ENEMY_MIDDLE_SCALE = 3;
const ENEMY_NEAR_SCALE = 1;

const ENEMY_FAR_OFFSET = 0;
const ENEMY_MIDDLE_OFFSET = 30;
const ENEMY_NEAR_OFFSET = 90;

const offsetMap = new Map<string, IPointData>([
  [JSON.stringify([Distance.Far, Move.Left]), { x: -40, y: ENEMY_FAR_OFFSET }],
  [
    JSON.stringify([Distance.Far, Move.Center]),
    { x: -24, y: ENEMY_FAR_OFFSET },
  ],
  [JSON.stringify([Distance.Far, Move.Right]), { x: -10, y: ENEMY_FAR_OFFSET }],
  [
    JSON.stringify([Distance.Middle, Move.Left]),
    { x: -60, y: ENEMY_MIDDLE_OFFSET },
  ],
  [
    JSON.stringify([Distance.Middle, Move.Center]),
    { x: -20, y: ENEMY_MIDDLE_OFFSET },
  ],
  [
    JSON.stringify([Distance.Middle, Move.Right]),
    { x: 20, y: ENEMY_MIDDLE_OFFSET },
  ],
  [
    JSON.stringify([Distance.Near, Move.Left]),
    { x: -140, y: ENEMY_NEAR_OFFSET },
  ],
  [
    JSON.stringify([Distance.Near, Move.Center]),
    { x: -10, y: ENEMY_NEAR_OFFSET },
  ],
  [
    JSON.stringify([Distance.Near, Move.Right]),
    { x: 140, y: ENEMY_NEAR_OFFSET },
  ],
]);

const getEnemyImage = (move: Move) => {
  switch (move) {
    case Move.Center:
      return enemy_center;
    case Move.Left:
      return enemy_left;
    case Move.Right:
      return enemy_right;
  }
};

const getZoom = (distance: Distance) => {
  switch (distance) {
    case Distance.Far:
      return ENEMY_FAR_SCALE;
    case Distance.Middle:
      return ENEMY_MIDDLE_SCALE;
    case Distance.Near:
      return ENEMY_NEAR_SCALE;
  }
};

export const Enemy: FC<EnemyProps> = ({
  pos,
  distance,
  move = Move.Center,
}) => {
  if (!distance) {
    return null;
  }
  const offset = offsetMap.get(JSON.stringify([distance, move])) ?? {
    x: 0,
    y: 0,
  };
  const zoom = getZoom(distance);

  return (
    <Sprite
      image={getEnemyImage(move)}
      height={ENEMY_HEIGTH / zoom}
      width={ENEMY_WIDTH / zoom}
      anchor={{ x: 0.5, y: 0.5 }}
      x={pos.x + offset.x}
      y={pos.y + offset.y}
    ></Sprite>
  );
};
