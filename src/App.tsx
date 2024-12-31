import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    {
      heading: "To the One Who Lights Up My World",
      body: "Hey Cera, Every moment with you feels like a page from a storybook, filled with laughter, kindness, and the magic that only you can bring. You’re truly one of a kind, and I feel so lucky to know you.",
    },
    {
      heading: "A Heart Full of Gratitude",
      body: "Cera, Your strength, your love, and your unwavering support make life so much brighter. You’ve shown me what it means to care deeply, to give selflessly, and to embrace every moment with grace. Thank you for being the amazing person you are.",
    },
    {
      heading: "Happy New Year, My Love",
      body: "As we step into another year, I want you to know how much you mean to me. You’re not just a part of my life—you’re the best part. Let’s make this year unforgettable, just like every moment we’ve shared so far.",
    },
    {
      heading: "Cera, My Heart Belongs to You",
      body: "You are my safe space, my confidant, and the person who makes everything feel right in the world. No words can ever fully capture how grateful I am for you, but I hope this shows just a little of how much you mean to me. Here's to love, laughter, and endless memories together. P.S. Let’s always keep sushi dates and summer swims as part of our traditions!",
    },
  ];

  const currentMessage = messages[currentMessageIndex];

  function calculateTimeLeft() {
    const difference = +new Date("2025-01-01T00:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      setCountdownComplete(true);
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex((prev) => prev + 1);
    }
  };

  const handlePreviousMessage = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="surprise-container">
      {!countdownComplete ? (
        <div className="countdown">
          <h1>Countdown to 2025</h1>
          <div className="timer">
            <span>{timeLeft.days || "0"} Days</span> : 
            <span>{timeLeft.hours || "00"} Hours</span> : 
            <span>{timeLeft.minutes || "00"} Minutes</span> : 
            <span>{timeLeft.seconds || "00"} Seconds</span>
          </div>
        </div>
      ) : (
        <div className="message-container">
          <h2>3 Month Anniversary</h2>
          <div className="message" key={currentMessageIndex}>
            <img
              src="/illustration.png"
              alt="Surprise Illustration"
              className="illustration"
            />
            <h1>{currentMessage.heading}</h1>
            <p>{currentMessage.body}</p>
          </div>

          <div className="button-container">
            {currentMessageIndex > 0 && (
              <button onClick={handlePreviousMessage}>&lt;</button>
            )}
            {currentMessageIndex < messages.length - 1 && (
              <button onClick={handleNextMessage}>&gt;</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
