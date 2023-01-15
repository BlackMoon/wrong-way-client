import { Sprite, useTick } from '@inlet/react-pixi';
import * as PIXI from 'pixijs';
import { FC, useEffect, useState } from 'react';
import { Move } from '../../types';

import car_center from '../../assets/cars/car_center.png';
import car_left from '../../assets/cars/car_left.png';
import car_right from '../../assets/cars/car_right.png';

const CAR_HEIGTH = 100;
const CAR_WIDTH = 120;
const CAR_MAGNITUDE = 4;

let i = 1;

interface CarProps {
  move?: Move[];
  pos: PIXI.IPointData;
}

const getCarImage = (move: Move) => {
  switch (move) {
    case Move.Center:
      return car_center;
    case Move.Left:
      return car_left;
    case Move.Right:
      return car_right;
  }
};

export const Car: FC<CarProps> = ({ pos, move = [Move.Center] }) => {
  const [jump, setJump] = useState(0);

  const [carMove, setCarMove] = useState<Move>(Move.Center);
  const [x, setX] = useState(pos.x);

  useEffect(() => {
    setX(pos.x);
  }, [pos]);

  useEffect(() => {
    const [m] = move ?? Move.Center;
    setCarMove(m);
    const timer = setTimeout(() => setCarMove(Move.Center), 300);
    return () => clearTimeout(timer);
  }, [move]);

  useEffect(() => {
    const [m] = move ?? Move.Center;
    const shift = x === pos.x ? m : 0;
    setX(pos.x + shift * 140);
  }, [move, pos]);

  useTick((delta) => {
    i += 0.1 * delta;
    setJump(CAR_MAGNITUDE * Math.sin(i));
  });

  return (
    <Sprite
      image={getCarImage(carMove)}
      height={CAR_HEIGTH}
      width={CAR_WIDTH}
      anchor={{ x: 0.5, y: 1 }}
      x={x}
      y={pos.y - jump}
    ></Sprite>
  );
};
