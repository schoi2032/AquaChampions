import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Waves, Volume2, VolumeX, Info, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import SwimmingPool from "@/components/game/SwimmingPool";
import GameHUD from "@/components/game/GameHUD";
import RaceSelector from "@/components/game/RaceSelector";
import ResultsScreen from "@/components/game/ResultsScreen";
import CountdownOverlay from "@/components/game/CountdownOverlay";
import CoachPanel from "@/components/coach/CoachPanel";
import StatsDashboard from "@/components/coach/StatsDashboard";
import { base44 } from "@/api/base44Client";

const e = React.createElement;

export default function SwimmingGamePage() {
  const [gameState, setGameState] = useState("menu");
  const [soundEnabled, setSoundEnabled] = useState(true);

  return e(
    "div",
    { className: "min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" },

    /* Header */
    e(
      "header",
      { className: "p-4 border-b border-slate-700/50" },
      e(
        "div",
        { className: "max-w-6xl mx-auto flex items-center justify-between" },

        e(
          "div",
          { className: "flex items-center gap-3" },
          e(
            "div",
            { className: "p-2 bg-cyan-500/20 rounded-xl" },
            e(Waves, { className: "w-8 h-8 text-cyan-400" })
          ),
          e(
            "div",
            null,
            e("h1", { className: "text-2xl font-bold text-white" }, "Swimming Olympics"),
            e("p", { className: "text-slate-400 text-sm" }, "All Stroke Events")
          )
        ),

        e(
          "div",
          { className: "flex items-center gap-2" },
          e(
            Dialog,
            null,
            e(
              DialogTrigger,
              { asChild: true },
              e(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "text-slate-400 hover:text-white"
                },
                e(Info, { className: "w-5 h-5" })
              )
            ),
            e(
              DialogContent,
              { className: "bg-slate-800 border-slate-700 text-white" },
              e(
                DialogHeader,
                null,
                e(DialogTitle, null, "How to Play")
              )
            )
          ),

          e(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setSoundEnabled(!soundEnabled),
              className: "text-slate-400 hover:text-white"
            },
            soundEnabled
              ? e(Volume2, { className: "w-5 h-5" })
              : e(VolumeX, { className: "w-5 h-5" })
          )
        )
      )
    ),

    /* Footer */
    e(
      "footer",
      { className: "p-4 text-center text-slate-500 text-sm" },
      e(
        "p",
        null,
        "Hold SPACE or tap the button to swim • Manage your stamina wisely!"
      )
    )
  );
}
