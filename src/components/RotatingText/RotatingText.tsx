// unchanged imports and helper
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  Transition,
  type VariantLabels,
  type TargetAndTransition,
} from "framer-motion";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | TargetAndTransition | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: TargetAndTransition | VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);
    const [width, setWidth] = useState<number | undefined>(undefined);
    const [isTextReady, setIsTextReady] = useState(false);
    const measureRef = useRef<HTMLDivElement | null>(null);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(
          segmenter.segment(text),
          (segment) => segment.segment
        );
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex];
      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === "words") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === "lines") {
        return currentText.split("\n").map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }
      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number): number => {
        const total = totalChars;
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        setIsTextReady(false); // reset text-ready state on change
        if (onNext) onNext(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0);
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    useEffect(() => {
      if (isTextReady && measureRef.current) {
        setWidth(measureRef.current.offsetWidth);
      }
    }, [isTextReady, currentTextIndex, elements]);

    return (
      <>
        <motion.div
          style={{ width: width ?? "auto" }}
          animate={isTextReady ? { width } : false}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-flex overflow-hidden px-4 py-2 text-white rounded-lg text-4xl font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)] min-h-[3rem] leading-tight"
        >
          <motion.span
            className={cn(
              "flex flex-wrap whitespace-pre-wrap relative",
              mainClassName
            )}
            {...rest}
          >
            <span className="sr-only">{texts[currentTextIndex]}</span>
            <AnimatePresence
              mode={animatePresenceMode}
              initial={animatePresenceInitial}
            >
              <motion.div
                key={currentTextIndex}
                transition={{ layout: { duration: 0.5, ease: "easeInOut" } }}
                className={cn(
                  splitBy === "lines"
                    ? "flex flex-col w-full"
                    : "flex flex-wrap relative"
                )}
                aria-hidden="true"
              >
                {elements.map((wordObj, wordIndex, array) => {
                  const previousCharsCount = array
                    .slice(0, wordIndex)
                    .reduce((sum, word) => sum + word.characters.length, 0);
                  return (
                    <span
                      key={wordIndex}
                      className={cn("inline-flex", splitLevelClassName)}
                    >
                      {wordObj.characters.map((char, charIndex, charArray) => {
                        const isLastChar =
                          wordIndex === array.length - 1 &&
                          charIndex === charArray.length - 1;

                        return (
                          <motion.span
                            key={charIndex}
                            initial={initial}
                            animate={animate}
                            exit={exit}
                            onAnimationStart={() => setIsAnimatingIn(true)}
                            onAnimationComplete={() => {
                              if (isLastChar) {
                                setIsAnimatingIn(false);
                                setIsTextReady(true);
                              }
                            }}
                            transition={{
                              ...transition,
                              delay: getStaggerDelay(
                                previousCharsCount + charIndex,
                                array.reduce(
                                  (sum, word) => sum + word.characters.length,
                                  0
                                )
                              ),
                            }}
                            className={cn(
                              "inline-block",
                              elementLevelClassName
                            )}
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                      {wordObj.needsSpace && (
                        <span className="whitespace-pre"> </span>
                      )}
                    </span>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.span>
        </motion.div>

        {/* Measurement div */}
        <div
          ref={measureRef}
          className={cn(
            "absolute invisible pointer-events-none px-4 py-2 text-4xl font-bold",
            mainClassName
          )}
          aria-hidden="true"
        >
          <div
            className={cn(
              splitBy === "lines"
                ? "flex flex-col w-full"
                : "flex flex-wrap relative"
            )}
          >
            {elements.map((wordObj, wordIndex) => (
              <span
                key={wordIndex}
                className={cn("inline-flex", splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={cn("inline-block", elementLevelClassName)}
                  >
                    {char}
                  </span>
                ))}
                {wordObj.needsSpace && (
                  <span className="whitespace-pre"> </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
