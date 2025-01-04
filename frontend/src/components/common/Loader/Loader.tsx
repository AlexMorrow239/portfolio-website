import React, { useState, useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import { Terminal, CheckCircle2 } from 'lucide-react';
import './Loader.scss';

interface LoaderProps {
  messages?: string[];
  completionMessage?: string;
  duration?: number;
  onComplete?: () => void;
  isSuccess?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  messages = ['Initializing...', 'Loading data...', 'Almost there...'],
  completionMessage = 'Loading complete!',
  duration = 3000,
  onComplete,
  isSuccess = false,
}) => {
  const [showCursor, setShowCursor] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [cycleCompleted, setCycleCompleted] = useState(false);

  // Calculate typing speeds
  const safetyMargin = 0.7;
  const adjustedDuration = duration * safetyMargin;
  const cyclesPerMessage = 2;
  const totalCycles = messages.length * cyclesPerMessage;
  const timePerCycle = adjustedDuration / totalCycles;
  const avgMessageLength = Math.max(...messages.map((msg) => msg.length));
  const typeSpeed = Math.floor(timePerCycle / avgMessageLength);
  const backSpeed = typeSpeed;

  // Track when the first full cycle completes
  const handleTypingComplete = () => {
    setCycleCompleted(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cycleCompleted) {
        setShowCursor(false);
        setLoadingComplete(true);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, cycleCompleted]);

  useEffect(() => {
    if (loadingComplete && cycleCompleted && isSuccess) {
      const successTimer = setTimeout(() => {
        onComplete?.();
      }, 500);

      return () => clearTimeout(successTimer);
    }
  }, [loadingComplete, cycleCompleted, isSuccess, onComplete]);

  return (
    <div className="terminal-loader">
      <div className="terminal-header">
        <Terminal size={20} />
        <span>loading.sh</span>
      </div>
      <div className="terminal-body">
        <ReactTyped
          strings={messages}
          typeSpeed={typeSpeed}
          backSpeed={backSpeed}
          loop={!loadingComplete}
          showCursor={showCursor}
          onComplete={handleTypingComplete}
        />
        {loadingComplete && isSuccess && (
          <div className="loading-complete">
            <CheckCircle2 size={24} />
            <span>{completionMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
