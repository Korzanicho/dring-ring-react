import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';
import bottle from '@/assets/images/bottle.svg';

const LuckyWheel = ({ players, fixedWinner, spinning, onFinish, initialPlayer }) => {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0); // Początkowy kąt koła
  const [isSpinning, setIsSpinning] = useState(false);
  
  const sliceAngle = useMemo(() => 360 / players.length, [players.length]);
  
  const playerSegments = useMemo(() => {
    return players.map((player, index) => ({
      player,
      startAngle: (index * sliceAngle * Math.PI) / 180,
      endAngle: ((index + 1) * sliceAngle * Math.PI) / 180,
      textAngle: ((index * sliceAngle * Math.PI) / 180) + ((sliceAngle * Math.PI) / 180) / 2,
      color: index % 2 === 0 ? "#008080" : "#005555"
    }));
  }, [players, sliceAngle]);

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

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    playerSegments.forEach((segment) => {
      ctx.beginPath();
      ctx.moveTo(size, size);
      ctx.arc(size, size, size, segment.startAngle, segment.endAngle);
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = "#E3991E";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dodajemy tekst gracza na sektorze
      ctx.save(); // Zapisujemy aktualny stan kontekstu

      ctx.translate(size, size); // Przenosimy układ współrzędnych na środek koła
      ctx.rotate(segment.textAngle); // Obracamy kontekst o kąt sektora

      ctx.fillStyle = "#fff";
      ctx.font = "22px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Rysujemy tekst na promieniu o długości 70% promienia koła
      ctx.fillText(segment.player, size * 0.6, 0);

      ctx.restore(); // Przywracamy pierwotny stan kontekstu
    });
  }, [playerSegments]);

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

  // Memoize utility functions
  const easeOutCubic = useCallback((t) => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  const getAngleForPlayer = useCallback((player) => {
    const index = players.indexOf(player);
    // Obliczamy kąt, aby gracz był na górze (0 stopni)
    return 360 - index * sliceAngle; // Nie dodajemy pełnych obrotów, bo to kąt początkowy
  }, [players, sliceAngle]);

  const getWinnerFromAngle = useCallback((angle) => {
    const normalizedAngle = (360 - angle) % 360; // Normalizujemy kąt do zakresu 0-360
    const index = Math.floor(normalizedAngle / sliceAngle);
    return players[index];
  }, [players, sliceAngle]);

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

LuckyWheel.propTypes = {
	players: PropTypes.arrayOf(PropTypes.string).isRequired,
	fixedWinner: PropTypes.string,
	spinning: PropTypes.bool.isRequired,
	onFinish: PropTypes.func.isRequired,
	initialPlayer: PropTypes.string
};

LuckyWheel.defaultProps = {
	fixedWinner: null,
	initialPlayer: null
};

export default LuckyWheel;