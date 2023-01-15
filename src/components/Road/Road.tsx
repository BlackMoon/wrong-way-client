import { Container, Sprite, useTick } from '@inlet/react-pixi';
import * as PIXI from 'pixijs';
import { FC, useState } from 'react';

import fade from '../../assets/mountain_fade.png';
import mountain_left from '../../assets/mountain_left.png';
import mountain_right from '../../assets/mountain_right.png';
import sideroad_left from '../../assets/sideroad_left.png';
import sideroad_right from '../../assets/sideroad_right.png';
import road from '../../assets/road.png';
import sky from '../../assets/sky.png';

const MIN_SCALE = 1.8;
const MAX_SCALE = 6;
const SCALE_DELTA = 0.6;
const TICK_SPEED_LEFT = 50;
const TICK_SPEED_RIGHT = 50;

interface RoadProps {
  crash?: boolean;
  size: PIXI.ISize;
}

let i1 = 1;

const MountLeft: FC<RoadProps> = ({ crash, size }) => {
  const [zoom, setZoom] = useState(MAX_SCALE);

  useTick(() => {
    i1 += 1;
    let coef = zoom;
    if (!crash && i1 % TICK_SPEED_LEFT === 0) {
      coef = coef - SCALE_DELTA;
      if (coef <= MIN_SCALE) {
        coef = MAX_SCALE;
      }

      setZoom(coef);
    }
  });

  return zoom !== MAX_SCALE ? (
    <Sprite
      image={mountain_left}
      y={(4 * size.height) / 5}
      height={size.height / zoom}
      width={size.width / zoom}
      anchor={{ x: 0, y: 1 }}
    ></Sprite>
  ) : null;
};

let i2 = 1;

const MountRight: FC<RoadProps> = ({ crash, size }) => {
  const [zoom, setZoom] = useState(3);

  useTick(() => {
    i2 += 1;
    let coef = zoom;
    if (!crash && i2 % TICK_SPEED_RIGHT === 0) {
      coef = coef - SCALE_DELTA;
      if (coef <= MIN_SCALE) {
        coef = MAX_SCALE;
      }

      setZoom(coef);
    }
  });

  return zoom !== MAX_SCALE ? (
    <Sprite
      image={mountain_right}
      x={size.width / 2}
      y={(3 * size.height) / 4}
      height={size.height / zoom}
      width={size.width / zoom}
      anchor={{ x: 0, y: 1 }}
    ></Sprite>
  ) : null;
};

const SIDE_MAX_SCALE = 4;
const SIDE_MIN_SCALE = 3;
const SIDE_MAX_OFFSET = 60;
const SIDE_MIN_OFFSET = 40;
const SIDE_SPEED_LEFT = 100;
const SIDE_SPEED_RIGHT = 120;

let i3 = 0;

const SideLeft: FC<RoadProps> = ({ crash, size }) => {
  const [zoom, setZoom] = useState(SIDE_MAX_SCALE);
  const [offset, setOffset] = useState(SIDE_MIN_OFFSET);

  useTick(() => {
    i3 += 1;
    let pad = offset;
    let coeff = zoom;

    if (!crash && i3 % SIDE_SPEED_LEFT === 0) {
      pad = offset === SIDE_MAX_OFFSET ? SIDE_MIN_OFFSET : SIDE_MAX_OFFSET;
      coeff = zoom === SIDE_MAX_SCALE ? SIDE_MIN_SCALE : SIDE_MAX_SCALE;
      setOffset(pad);
      setZoom(coeff);
    }
  });

  return (
    <Sprite
      image={sideroad_left}
      y={size.height - offset}
      height={size.height / zoom}
      width={size.width / zoom}
      anchor={{ x: 0, y: 1 }}
    ></Sprite>
  );
};

let i4 = 0;

const SideRight: FC<RoadProps> = ({crash, size }) => {
  const [offset, setOffset] = useState(SIDE_MIN_OFFSET);

  useTick(() => {
    i4 += 1;
    let pad = offset;

    if (!crash && i4 % SIDE_SPEED_RIGHT === 0) {
      pad = offset === SIDE_MAX_OFFSET ? SIDE_MIN_OFFSET : SIDE_MAX_OFFSET;
      setOffset(pad);
    }
  });

  return (
    <Sprite
      image={sideroad_right}
      x={(3 * size.width) / 4}
      y={10 + size.height - offset}
      height={size.height / SIDE_MAX_SCALE}
      width={size.width / SIDE_MAX_SCALE}
      anchor={{ x: 0, y: 1 }}
    ></Sprite>
  );
};

export const Road: FC<RoadProps> = ({ crash, size }) => {
  return (
    <Container>
      <Sprite image={sky} height={size.height} width={size.width}></Sprite>
      <Sprite image={fade} height={size.height} width={size.width}></Sprite>
      <MountLeft crash={crash} size={size}></MountLeft>
      <MountRight crash={crash} size={size}></MountRight>

      <Sprite
        image={road}
        y={(2 * size.height) / 3}
        height={size.height / 2}
        width={size.width}
      ></Sprite>
      <SideLeft crash={crash} size={size}></SideLeft>
      <SideRight crash={crash} size={size}></SideRight>
    </Container>
  );
};
