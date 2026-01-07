import React from "react";
import { Flame, Zap, Trophy, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const e = React.createElement;

export default function GameHUD({
  time,
  stamina,
  position,
  totalSwimmers,
  playerProgress,
  raceDistance,
  isRacing
}) {
  const formatTime = (ms) => {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return (
      minutes +
      ":" +
      seconds.toString().padStart(2, "0") +
      "." +
      centiseconds.toString().padStart(2, "0")
    );
  };

  const getPositionColor = (pos) => {
    if (pos === 1) return "text-yellow-400";
    if (pos === 2) return "text-gray-300";
    if (pos === 3) return "text-amber-600";
    return "text-white";
  };

  const getPositionSuffix = (pos) => {
    if (pos === 1) return "st";
    if (pos === 2) return "nd";
    if (pos === 3) return "rd";
    return "th";
  };

  const distanceCovered = (playerProgress / 100) * raceDistance;

  return e(
    "div",
    {
      className:
        "bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-slate-700/50"
    },

    e(
      "div",
      { className: "grid grid-cols-2 md:grid-cols-4 gap-4" },

      /* Timer */
      e(
        "div",
        { className: "bg-slate-800/50 rounded-xl p-3 border border-slate-700/30" },
        e(
          "div",
          { className: "flex items-center gap-2 mb-1" },
          e(Timer, { className: "w-4 h-4 text-cyan-400" }),
          e(
            "span",
            { className: "text-xs text-slate-400 uppercase tracking-wider" },
            "Time"
          )
        ),
        e(
          "div",
          { className: "font-mono text-2xl font-bold text-white" },
          formatTime(time)
        )
      ),

      /* Position */
      e(
        "div",
        { className: "bg-slate-800/50 rounded-xl p-3 border border-slate-700/30" },
        e(
          "div",
          { className: "flex items-center gap-2 mb-1" },
          e(Trophy, { className: "w-4 h-4 text-yellow-400" }),
          e(
            "span",
            { className: "text-xs text-slate-400 uppercase tracking-wider" },
            "Position"
          )
        ),
        e(
          "div",
          { className: "text-2xl font-bold " + getPositionColor(position) },
          position,
          e("sup", { className: "text-sm" }, getPositionSuffix(position)),
          e(
            "span",
            { className: "text-slate-500 text-sm font-normal ml-1" },
            "/ ",
            totalSwimmers
          )
        )
      ),

      /* Distance */
      e(
        "div",
        { className: "bg-slate-800/50 rounded-xl p-3 border border-slate-700/30" },
        e(
          "div",
          { className: "flex items-center gap-2 mb-1" },
          e(Zap, { className: "w-4 h-4 text-blue-400" }),
          e(
            "span",
            { className: "text-xs text-slate-400 uppercase tracking-wider" },
            "Distance"
          )
        ),
        e(
          "div",
          { className: "text-2xl font-bold text-white" },
          distanceCovered.toFixed(0),
          e("span", { className: "text-sm text-slate-400" }, "m"),
          e(
            "span",
            { className: "text-slate-500 text-sm font-normal ml-1" },
            "/ ",
            raceDistance,
            "m"
          )
        )
      ),

      /* Stamina */
      e(
        "div",
        { className: "bg-slate-800/50 rounded-xl p-3 border border-slate-700/30" },
        e(
          "div",
          { className: "flex items-center gap-2 mb-2" },
          e(Flame, {
            className:
              "w-4 h-4 " +
              (stamina > 30
                ? "text-orange-400"
                : "text-red-500 animate-pulse")
          }),
          e(
            "span",
            { className: "text-xs text-slate-400 uppercase tracking-wider" },
            "Stamina"
          ),
          e(
            "span",
            { className: "ml-auto text-sm font-bold text-white" },
            Math.round(stamina),
            "%"
          )
        ),
        e(Progress, {
          value: stamina,
          className: "h-3 bg-slate-700",
          style: {
            "--progress-background":
              stamina > 60
                ? "#22c55e"
                : stamina > 30
                ? "#f59e0b"
                : "#ef4444"
          }
        })
      )
    ),

    /* Hint */
    isRacing &&
      e(
        "div",
        { className: "mt-3 text-center" },
        e(
          "p",
          {
            className:
              "text-cyan-400 text-sm animate-pulse font-medium"
          },
          "🏊 TAP RAPIDLY or HOLD SPACE to swim • Manage your stamina!"
        )
      )
  );
}
