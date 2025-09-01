import React, { useState, useEffect, useRef } from "react";
import "./WheelView.scss";
import LuckyWheel from "@/features/wheel/LuckyWheel/LuckyWheel";
import { usePlayers } from "@/hooks/usePlayers";
import { useGameState } from "@/hooks/useGameState";
import { useNavigation } from "@/hooks/useNavigation";
import { TheButton, BackButton, PageContainer } from "@/components";
import { stopSound, Sounds } from "@/utils/soundUtils"; // Import sound utilities

function WheelView() {
  const { setSelectedPlayer, getSelectedPlayer } = useGameState();
  const { navigateToPlaying } = useNavigation();
  const { getPlayers } = usePlayers();

  const wheelData = getPlayers().map((player) => player.name);
  wheelData.push("Wszyscy");

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

    setInitialPlayer(
      getPlayers().find((p) => p.name === winnerName)?.name || "Wszyscy"
    );
    if (winnerName === "Wszyscy") setSelectedPlayer({ name: "Wszyscy" });
    else
      setSelectedPlayer(
        getPlayers().find((player) => player.name === winnerName)
      );

    setIsSelected(true);
    setIsSpinning(false);

    setTimeout(() => {
      setIsSelected(false);
      navigateToPlaying();
    }, 3000);
  };

  useEffect(() => {
    return () => {
      stopSound(Sounds.WHEEL_SPIN);
    };
  }, []);

  const skipSpin = () => {
    stopSound(Sounds.WHEEL_SPIN);
    hasStoppedManually.current = true;
    handleStopSpinning(fixedWinner);
  };

  return (
    <PageContainer className="wheel-view">
      <BackButton view="/categories" />
      <div
        className={`wheel-view__wheel ${
          isSelected ? "wheel-view__wheel--hidden" : ""
        }`}
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
      <div
        className={`wheel-view__selected ${
          isSelected ? "wheel-view__selected--active" : ""
        }`}
      >
        <span>{getSelectedPlayer()?.name}</span>
      </div>
      <TheButton
        className="wheel-view__btn"
        onClick={isSpinning ? skipSpin : startSpin}
      >
        {isSpinning ? "Pomiń" : "Zakręć"}
      </TheButton>
    </PageContainer>
  );
}

export default WheelView;
