import React, { useEffect, useRef, useState } from "react";
import styles from "./FotografiskaAnimation.module.scss";
import { useInView } from "framer-motion";

const frames = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
];

type FotografiskaAnimationProps = {
  text: string | string[];
  isOnScroll?: boolean;
  imagePositions: {
    position: number;
    frames: string[];
    delay: number;
  }[];
};

const FotografiskaAnimation = ({
  text = "PHOTOS NICE BRING EYES",
  isOnScroll = false,
  imagePositions = [
    { position: 7, frames: [...frames], delay: 1 },
    {
      position: 16,
      frames: [...frames.reverse()],
      delay: 3,
    },
  ],
}: FotografiskaAnimationProps) => {
  const words = Array.isArray(text) ? text : text.split(" ");
  // cosnt letters = words
  let wordsEnded = 0;
  let acc = 0;

  const [hasAnimatedIn, setHasAnimatedIn] = useState(isOnScroll);

  const go = () => {
    if (wordsEnded++ === words.length - 1) {
      setHasAnimatedIn(true);
    }
  };

  return (
    <div className={styles.container}>
      {words.map((word, i) => {
        const letters = word.split("");
        return (
          <h1
            className={styles.word}
            style={{ "--delay": `${i / 4}s` }}
            key={`word-${i}`}
            onAnimationEnd={go}
            data-is-flash-in={!isOnScroll}
          >
            {letters.map((letter, j) => {
              const nextLetter =
                j !== letters.length - 1 ? letters[j + 1] : null;

              acc++;

              const obj = imagePositions.find((obj) => obj.position === acc);

              return (
                <React.Fragment key={`letter-${acc}`}>
                  <span>{letter}</span>
                  {obj && (
                    <ImageContainer
                      hasAnimatedIn={hasAnimatedIn}
                      frames={obj.frames}
                      isOnScroll={isOnScroll}
                      delayInSeconds={obj.delay}
                      addMargin={letter === " " || nextLetter === " "}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </h1>
        );
      })}
    </div>
  );
};

export default FotografiskaAnimation;

const ImageContainer = ({
  hasAnimatedIn,
  frames,
  delayInSeconds,
  isOnScroll = false,
  addMargin,
}) => {
  let current = 0;
  let lastTime = 0;
  const frameDuration = 100;

  const imageRef = useRef<HTMLImageElement>(null);
  const animationFrameRef = useRef(0);

  function updateFrame(timestamp) {
    if (timestamp - lastTime >= frameDuration) {
      current = (current + 1) % frames.length;
      imageRef.current!.src = frames[current];
      lastTime = timestamp;
    }

    animationFrameRef.current = requestAnimationFrame(updateFrame);
  }

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(imageWrapperRef); //, { once: false });

  useEffect(() => {
    if (isOnScroll && imageWrapperRef.current) {
      if (isInView) {
        imageWrapperRef.current.classList.add(styles.scaleUp);
      } else {
        imageWrapperRef.current.classList.remove(styles.scaleUp);
      }
    }
  }, [isOnScroll, imageWrapperRef, isInView]);

  return (
    <div
      ref={imageWrapperRef}
      className={`${styles.imagesWrapper} ${
        hasAnimatedIn && !isOnScroll && styles.scale
      }`}
      style={{
        "--delay": `${delayInSeconds}s`,
        "--margin": `${addMargin ? "16px" : 0}`,
      }}
    >
      <img ref={imageRef} src={frames[0]} />
    </div>
  );
};
