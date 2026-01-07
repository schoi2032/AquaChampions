import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const e = React.createElement;

export default function CountdownOverlay({ countdown, show }) {
  if (!show) return null;

  const getCountdownDisplay = () => {
    if (countdown === 3) return { text: "3", color: "text-red-500" };
    if (countdown === 2) return { text: "2", color: "text-yellow-500" };
    if (countdown === 1) return { text: "1", color: "text-green-500" };
    if (countdown === 0) return { text: "GO!", color: "text-cyan-400" };
    return { text: "", color: "" };
  };

  const display = getCountdownDisplay();

  return e(
    "div",
    {
      className:
        "absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20 rounded-xl"
    },

    /* Countdown number */
    e(
      AnimatePresence,
      { mode: "wait" },
      e(
        motion.div,
        {
          key: countdown,
          initial: { scale: 2, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.5, opacity: 0 },
          transition: { duration: 0.3, type: "spring" },
          className:
            "text-9xl font-black " +
            display.color +
            " drop-shadow-2xl"
        },
        display.text
      )
    ),

    /* Subtitle */
    countdown > 0 &&
      e(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className:
            "absolute bottom-20 text-white text-xl"
        },
        "Get ready to swim!"
      )
  );
}
