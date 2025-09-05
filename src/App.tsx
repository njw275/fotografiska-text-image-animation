import React, { useEffect, useState } from "react";
import FotografiskaAnimation from "./FotografiskaAnimation";

const frames = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
];

const App = () => {
  const [isScrollingExample, setIsScrollingExample] = useState(false);

  useEffect(() => {
    document.body.style.setProperty(
      "--bg",
      isScrollingExample ? "#e50815" : "#3f3fe9"
    );
  }, [isScrollingExample]);

  return (
    <>
      <div className="parent">
        {isScrollingExample ? (
          <div className="appWrapper scrollWrapper">
            <h1 className="directions">Scroll down to see example.</h1>
            <FotografiskaAnimation
              key="scrolling-animation"
              text={["join", "our dream", "team"]}
              isOnScroll
              imagePositions={[
                {
                  position: 7,
                  frames: frames,
                  delay: 1,
                },
              ]}
            />
          </div>
        ) : (
          <div className="appWrapper">
            <FotografiskaAnimation
              key="pop-in-animation"
              text={"PHOTOS NICE BRING EYES"}
              imagePositions={[
                { position: 7, frames: [...frames], delay: 1 },
                {
                  position: 16,
                  frames: [...frames.reverse()],
                  delay: 3,
                },
              ]}
            />
          </div>
        )}
      </div>
      <div
        className="toggleButton"
        onClick={() => setIsScrollingExample((prev) => !prev)}
      >
        <div className="left" data-is-highlighted={!isScrollingExample}>
          <span>Animated Demo</span>
          <div className="toggleBg" />
        </div>
        <div className="right" data-is-highlighted={isScrollingExample}>
          <span>Scrolling Demo</span>
          <div className="toggleBg" />
        </div>
      </div>
    </>
  );
};

export default App;
