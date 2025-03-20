//"use-client";
import { useRef } from "react";
import styles from "./AnimatedText.module.css";
import { motion, useInView, Variants } from "framer-motion";

const AnimatedText: React.FC<
  React.HTMLProps<HTMLElement> & {
    el: React.ElementType;
    outlineText?: string;
    underlineText?: string;
    isPhoneNumber?: string;
    text: string;
    textColor?: string;
    blockAnimation?: boolean;
  }
> = ({
  el: Wrapper,
  text,
  outlineText,
  underlineText,
  textColor,
  blockAnimation,
  isPhoneNumber,
  ...props
}) => {
  const animatedTextRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(animatedTextRef); //At least it should be 50% in view

  const defaultAnimation: Variants = {
    initial: {
      opacity: 0,
      y: "100%",
    },
    open: (i) => ({
      opacity: 1,
      y: "0%",
      transition: { duration: 0.5, delay: 0.1 * i },
    }),
    closed: {
      opacity: 0,
      y: "100%",
      transition: { duration: 0.5 },
    },
  };

  const getSpanStyle = (word: string | undefined) => {
    if (outlineText && textColor && outlineText === word) {
      return {
        color: "transparent",
        WebkitTextStroke: `1.5px ${textColor}`,
      };
    } else if (textColor) {
      return { color: textColor };
    } else if (outlineText) {
      return {
        color: "transparent",
        WebkitTextStroke: "1.5px var(--primary-dark)",
      };
    } else if (underlineText === word) {
      return {
        textDecoration: "underline",
        cursor: "pointer",
      };
    }

    return {};
  };

  const getSpan = () => {
    if (blockAnimation) {
      return (
        <motion.span
          initial={{ transform: "translate(0,40%)", display: "block" }}
          animate={
            isInView
              ? { transform: "translate(0,0%)" }
              : { transform: "translate(0,40%)" }
          }
          transition={{ staggerChildren: 0.1, duration: 0.8 }}
          ref={animatedTextRef}
          aria-hidden
        >
          {text}
        </motion.span>
      );
    }

    return (
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }}
        ref={animatedTextRef}
        aria-hidden
      >
        {text.split(" ").map((word, index) => {
          return (
            <span key={index} className={styles.mask}>
              <motion.span
                variants={defaultAnimation}
                custom={index}
                animate={isInView ? "open" : "closed"}
                key={index}
                style={getSpanStyle(word)}
              >
                {word}
              </motion.span>
              <span>&nbsp;</span>
            </span>
          );
        })}
      </motion.span>
    );
  };

  return (
    <Wrapper {...props}>
      <span className={styles["screen-reader-only"]}>{text}</span>
      {getSpan()}
    </Wrapper>
  );
};

export default AnimatedText;
