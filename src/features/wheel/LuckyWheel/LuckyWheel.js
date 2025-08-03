import React, { useEffect, useRef, useState } from "react";
import bottle from '@/assets/images/bottle.svg';

const LuckyWheel = ({ players, fixedWinner, spinning, onFinish, initialPlayer }) => {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0); // Początkowy kąt koła
  const [isSpinning, setIsSpinning] = useState(false);
  const sliceAngle = 360 / players.length;

  useEffect(() => {
    drawWheel();

    // Oblicz kąt początkowy na podstawie initialPlayer
    if (initialPlayer) {
      const initialAngle = getAngleForPlayer(initialPlayer);
      setAngle(initialAngle); // Ustaw początkowy kąt koła
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players, initialPlayer]);

  useEffect(() => {
    if (spinning && !isSpinning) {
      spinWheel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    players.forEach((player, index) => {
      const startAngle = (index * sliceAngle * Math.PI) / 180;
      const endAngle = ((index + 1) * sliceAngle * Math.PI) / 180;

      ctx.beginPath();
      ctx.moveTo(size, size);
      ctx.arc(size, size, size, startAngle, endAngle);
      ctx.fillStyle = index % 2 === 0 ? "#008080" : "#005555";
      ctx.fill();
      ctx.strokeStyle = "#E3991E";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dodajemy tekst gracza na sektorze
      ctx.fillStyle = "#fff";
      ctx.font = "22px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Dodajemy tekst gracza na sektorze
      ctx.save(); // Zapisujemy aktualny stan kontekstu

      const textAngle = startAngle + (endAngle - startAngle) / 2; // Środkowy kąt sektora
      ctx.translate(size, size); // Przenosimy układ współrzędnych na środek koła
      ctx.rotate(textAngle); // Obracamy kontekst o kąt sektora

      ctx.fillStyle = "#fff";
      ctx.font = "22px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Rysujemy tekst na promieniu o długości 70% promienia koła
      ctx.fillText(player, size * 0.6, 0);

      ctx.restore(); // Przywracamy pierwotny stan kontekstu
    });
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const duration = 3000;
    const finalAngle = fixedWinner
      ? getAngleForPlayer(fixedWinner)
      : Math.random() * 360 + 720; // Dodajemy kilka pełnych obrotów

    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;

      if (progress < 1) {
        // Płynna animacja rotacji
        const easedProgress = easeOutCubic(progress); // Funkcja easing dla płynnego zatrzymania
        setAngle(easedProgress * finalAngle);
        requestAnimationFrame(animate);
      } else {
        // Zatrzymanie koła
        const finalStoppedAngle = finalAngle % 360;
        setAngle(finalStoppedAngle);

        // Wskazanie zwycięzcy
        const winner = getWinnerFromAngle(finalStoppedAngle);
        if (onFinish && spinning) onFinish(winner)
        setIsSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // Funkcja easing dla płynnego zatrzymania
  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const getAngleForPlayer = (player) => {
    const index = players.indexOf(player);
    // Obliczamy kąt, aby gracz był na górze (0 stopni)
    return 360 - index * sliceAngle; // Nie dodajemy pełnych obrotów, bo to kąt początkowy
  };

  const getWinnerFromAngle = (angle) => {
    const normalizedAngle = (360 - angle) % 360; // Normalizujemy kąt do zakresu 0-360
    const index = Math.floor(normalizedAngle / sliceAngle);
    return players[index];
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block", overflow: "hidden" }}>
        <img
          src={bottle}
          alt="Pointer"
          style={{
            position: "absolute",
            top: "50%",
            right: "-5px",
            width: "40px",
            transform: "translateY(-50%) rotate(-135deg)",
            zIndex: 10,
          }}
        />

        {/* Koło */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          style={{
            transform: `rotate(${angle}deg)`,
            transition: isSpinning ? "none" : "none", // Usuwamy transition, bo animujemy ręcznie
          }}
        />
      </div>
    </div>
  );
};

export default LuckyWheel;