import { FC, useCallback, useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Container, Stage } from '@inlet/react-pixi';

import './Scene.scss';

import { Road } from '../Road/Road';
import { Car } from '../Car/Car';
import { IPointData } from 'pixijs';
import { Move } from '../../types';
import { Enemy } from '../Enemy/Enemy';
import { Blast } from '../Blast/Blast';
import { observer } from 'mobx-react-lite';
import { CarStore, withStore } from '../../stores';
import { NewGame } from '../NewGame/NewGame';

const OFFSET = 8;

interface SceneProps {
  store: CarStore;
}

const SceneIntl: FC<SceneProps> = ({ store }) => {
  const [size, setSize] = useState<PIXI.ISize>({
    width: 0,
    height: 0,
  });

  const { crash, gameRunning, enemyDistance, enemyMove, newgame, setCarMove } = store;
  const [carPos, setCarPos] = useState<IPointData>({ x: 0, y: 0 });
  const [enemyPos, setEnemyPos] = useState<IPointData>({ x: 0, y: 0 });
  const [move, setMove] = useState<Move[]>([Move.Center]);

  const mainRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.code === 'ArrowLeft') {
        setCarMove(Move.Left);
        setMove([Move.Left]);
      } else if (event.code === 'ArrowRight') {
        setCarMove(Move.Right);
        setMove([Move.Right]);
      }
    },
    [move],
  );

  const handleNewGame = useCallback(() => {
    newgame();
    mainRef.current?.focus();
    setMove([Move.Center]);
  }, [mainRef]);

  useEffect(() => {
    function handleResize() {
      if (mainRef.current) {
        const { clientHeight, clientWidth } = mainRef.current;
        const size = { width: clientWidth, height: clientHeight };
        setSize(size);
        setCarPos({ x: size.width / 2, y: size.height - OFFSET });
        setEnemyPos({ x: size.width / 2, y: (2 * size.height) / 3 });
        mainRef.current.focus();
      }
    }
    window.onresize = handleResize;
    handleResize();
  }, [mainRef]);

  return (<>
    {!gameRunning && <NewGame click={handleNewGame}/>}
    <main
      className="scene"
      data-testid="scene"
      ref={mainRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Stage
        height={size.height}
        width={size.width}
        options={{
          backgroundAlpha: 0,
          resolution: 1,
        }}
      >
        <Container>
          <Road crash={crash} size={size}></Road>
          {crash ? (
            <Blast pos={carPos} />
          ) : (
            <>
              <Car pos={carPos} move={move} />
              <Enemy pos={enemyPos} distance={enemyDistance} move={enemyMove} />
            </>
          )}
        </Container>
      </Stage>
    </main>
    </>
  );
};

export const Scene = withStore(observer(SceneIntl));
