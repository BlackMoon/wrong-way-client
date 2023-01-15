import './Score.scss';

export const Score = ({}) => {
  return (
    <section className="score">
      <header className="score__header">
          <div>
            <div className='time'>3:44</div>
            <span className="sub">Your Last Record</span>
          </div>
          <span style={{ flex: '1 1 auto' }}></span>
          <div className='rank'>144</div>
      </header>
    </section>
  );
};
