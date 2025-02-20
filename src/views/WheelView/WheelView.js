import React, {useState, useEffect, useRef} from 'react';
import './WheelView.scss';
import LuckyWheel from "@/components/LuckyWheel/LuckyWheel";
import { useGame } from '@/Context/GameContext';
import TheButton from '@/components/TheButton/TheButton';
import BackButton from '@/components/BackButton/BackButton';

function WheelView() {
  const {
    getView, getPlayers, setView, setSelectedPlayer,
    getSelectedPlayer
  } = useGame();

  const wheelData = getPlayers().map((player) => player.name);
  wheelData.push('Wszyscy');

  const [initialPlayer, setInitialPlayer] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [fixedWinner, setFixedWinner] = useState(null);
  const hasStoppedManually = useRef(false);

  useEffect(() => {
    if (isSpinning) {
      setFixedWinner(wheelData[Math.floor(Math.random() * wheelData.length)]);
      hasStoppedManually.current = false;
    }
  }, [isSpinning, wheelData]);

  const startSpin = () => {
    setFixedWinner(null);
    setIsSpinning(true);
    hasStoppedManually.current = false;
  };

  const handleStopSpinning = (winnerName) => {
    if (hasStoppedManually.current) return;

    setInitialPlayer(getPlayers().find((p) => p.name === winnerName)?.name || 'Wszyscy');
    if (winnerName === 'Wszyscy') setSelectedPlayer({ name: 'Wszyscy' });
    else setSelectedPlayer(getPlayers().find((player) => player.name === winnerName));

    setIsSelected(true);
    setIsSpinning(false);

    setTimeout(() => {
      setIsSelected(false);
      setView('playing');
    }, 3000);
  };

  const skipSpin = () => {
    handleStopSpinning(fixedWinner);
    hasStoppedManually.current = true;
  };

  return getView() === 'wheel' ? (
    <div className="wheel-view">
      <BackButton view='categories' />
      <div
        className={`wheel-view__wheel ${isSelected ? 'wheel-view__wheel--hidden' : ''}`}
        onClick={isSpinning ? skipSpin : startSpin}
      >
        <LuckyWheel
          players={wheelData}
          spinning={isSpinning}
          initialPlayer={initialPlayer}
          fixedWinner={fixedWinner}
          onFinish={handleStopSpinning}
        />
      </div>
      <div className={`wheel-view__selected ${isSelected ? 'wheel-view__selected--active' : ''}`}>
        <span>{getSelectedPlayer()?.name}</span>
      </div>
      <TheButton
        className='wheel-view__btn'
        onClick={isSpinning ? skipSpin : startSpin}
      >
        {isSpinning ? 'Pomiń' : 'Zakręć'}
      </TheButton>
    </div>
  ) : null;
}

export default WheelView;
