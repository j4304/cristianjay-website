import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const segmenter = useMemo(() => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        return new Intl.Segmenter("en", { granularity: "grapheme" });
      }
      return null;
    }, []);

    const splitIntoCharacters = useCallback(
      (text: string): string[] => {
        if (segmenter) {
          return Array.from(
            segmenter.segment(text),
            (segment) => segment.segment
          );
        }
        return Array.from(text);
      },
      [segmenter]
    );

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex];
      if (!currentText) return [];

      const words = currentText.split(" ");

      return words.map((word, i) => ({
        characters:
          splitBy === "characters" ? splitIntoCharacters(word) : [word],
        needsSpace: i !== words.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy, splitIntoCharacters]);

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
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset]
    );

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span
        className={cn(
          "flex flex-wrap whitespace-pre-wrap relative",
          mainClassName
        )}
        {...rest}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.div
            key={currentTextIndex}
            className={cn(
              "flex flex-wrap",
              splitBy === "lines" && "flex-col w-full"
            )}
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex) => (
              <motion.span
                key={wordIndex}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{
                  ...transition,
                  delay: staggerDuration
                    ? getStaggerDelay(wordIndex, elements.length)
                    : 0,
                }}
                className={cn("inline-block", splitLevelClassName)}
              >
                {wordObj.characters.join("")}
                {wordObj.needsSpace && (
                  <span className="whitespace-pre"> </span>
                )}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default React.memo(RotatingText);
