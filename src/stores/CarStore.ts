import { v4 as uuid } from 'uuid';
import { action, computed, makeObservable, observable } from 'mobx';
import { Distance, Maybe, Message, Move } from '../types';
import { WssSocketServiceInstance } from '../utils/socketService';

const INTERVAL = 2000;

const distances = [Distance.Far, Distance.Middle, Distance.Near, undefined];
const moves = [Move.Left, Move.Center, Move.Right];

export class CarStore {
  carMove = Move.Center;
  enemyDistance?: Distance;
  enemyMove = Move.Center;
  gameRunning = false;
  error?: Error;
  messages: Message[] = [
    { id: uuid(), text: 'Nazanin Has Joind the Game', color: '#FF3EEC' },
    {
      id: uuid(),
      text: 'Skylar Baptosta:  how you doing mate',
      color: '#FFFFFF',
    },
    { id: uuid(), text: 'Wilson Rosser:  Not bad', color: '#FFFFFF' },
  ];

  private intervalId?: NodeJS.Timer;

  constructor() {
    makeObservable(this, {
      carMove: observable,
      crash: computed,
      enemyDistance: observable,
      enemyMove: observable,
      gameRunning: observable,
      messages: observable,
      setCarMove: action,
      setGameRunning: action,
      setEnemyDistance: action,
      setEnemyMove: action,
    });
  }

  connect = () => {
    this.error = undefined;
    WssSocketServiceInstance.connect().catch(() =>
      this.setError(new Error('connection to server failed')),
    );
  };

  close = () => WssSocketServiceInstance.close();

  get crash() {
    const collision =
      this.enemyDistance === Distance.Near && this.enemyMove === this.carMove;

    if (collision) {
      this.setGameRunning(false);
    }
    return collision;
  }

  newgame = async () => {
    clearInterval(this.intervalId);
    this.setCarMove(Move.Center);
    this.setEnemyDistance(undefined);
    this.setError();

    try {
      await WssSocketServiceInstance.sendMessage(`start game`);
    } catch (e) {
      this.setError(new Error('failed to create a new game'));
    }

    this.intervalId = setInterval(() => {
      const nexIx = distances.indexOf(this.enemyDistance) + 1;
      const newDistance = distances[nexIx % distances.length];
      this.setEnemyDistance(newDistance);

      if (!newDistance) {
        const moveIx = Math.floor(Math.random() * (moves.length - 1) + 1);
        this.setEnemyMove(moves[moveIx]);
      }
    }, INTERVAL);
    this.setGameRunning(true);
  };

  setCarMove = (carMove: Move) => {
    if (this.carMove !== Move.Center) {
      this.carMove = Move.Center;
    } else this.carMove = carMove;
  };

  setEnemyDistance = (enemyDistance: Maybe<Distance>) =>
    (this.enemyDistance = enemyDistance);

  setEnemyMove = (enemyMove: Move) => (this.enemyMove = enemyMove);

  setGameRunning = (gameRunning: boolean) => {
    this.gameRunning = gameRunning;
    if (!this.gameRunning) {
      clearInterval(this.intervalId);
    }
  };

  setError = (error?: Error) => (this.error = error);
}
