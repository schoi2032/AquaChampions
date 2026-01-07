import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingUp, MessageSquare, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const e = React.createElement;

export default function CoachPanel({
  swimmers,
  onBoost,
  boostsRemaining,
  selectedSwimmer,
  onSelectSwimmer
}) {
  const [feedback, setFeedback] = useState("");

  const getFeedbackForSwimmer = (swimmer) => {
    if (swimmer.speed > 6)
      return { text: "Excellent pace!", color: "text-green-400" };
    if (swimmer.speed > 3)
      return { text: "Good form", color: "text-yellow-400" };
    return { text: "Needs motivation", color: "text-orange-400" };
  };

  return e(
    Card,
    { className: "bg-slate-800/90 border-purple-500/30 shadow-xl" },
    e(
      CardContent,
      { className: "p-4" },

      /* Header */
      e(
        "div",
        { className: "flex items-center justify-between mb-4" },
        e(
          "div",
          { className: "flex items-center gap-2" },
          e(Users, { className: "w-5 h-5 text-purple-400" }),
          e(
            "h3",
            { className: "text-lg font-bold text-white" },
            "Coach Mode"
          )
        ),
        e(
          Badge,
          { className: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
          boostsRemaining,
          " Boosts Left"
        )
      ),

      /* Swimmer List */
      e(
        "div",
        { className: "space-y-2 max-h-64 overflow-y-auto" },
        swimmers.map((swimmer, index) => {
          const fb = getFeedbackForSwimmer(swimmer);
          const isSelected = selectedSwimmer === index;

          return e(
            motion.div,
            {
              key: index,
              whileHover: { scale: 1.02 },
              className:
                "p-3 rounded-lg border-2 cursor-pointer transition-all " +
                (isSelected
                  ? "bg-purple-500/30 border-purple-400"
                  : "bg-slate-700/50 border-slate-600 hover:border-purple-500/50"),
              onClick: () => onSelectSwimmer(index)
            },

            /* Top Row */
            e(
              "div",
              { className: "flex items-center justify-between mb-2" },
              e(
                "div",
                { className: "flex items-center gap-2" },
                e(
                  "div",
                  {
                    className:
                      "w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-bold text-white"
                  },
                  index + 1
                ),
                e(
                  "div",
                  null,
                  e(
                    "div",
                    { className: "font-semibold text-white text-sm" },
                    swimmer.name
                  ),
                  e(
                    "div",
                    { className: "text-xs text-slate-400" },
                    swimmer.country
                  )
                )
              ),
              e(
                "div",
                { className: "text-right" },
                e(
                  "div",
                  { className: "text-xs text-slate-400" },
                  "Progress"
                ),
                e(
                  "div",
                  { className: "text-sm font-bold text-white" },
                  swimmer.progress.toFixed(1),
                  "%"
                )
              )
            ),

            /* Bottom Row */
            e(
              "div",
              { className: "flex items-center justify-between" },
              e(
                "div",
                { className: "flex items-center gap-2" },
                e(TrendingUp, { className: "w-3 h-3 text-cyan-400" }),
                e(
                  "span",
                  { className: "text-xs text-slate-300" },
                  "Speed: ",
                  swimmer.speed.toFixed(1)
                )
              ),
              e(
                "span",
                { className: "text-xs font-medium " + fb.color },
                fb.text
              )
            ),

            /* Selected Actions */
            isSelected &&
              e(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  className: "mt-3 pt-3 border-t border-purple-500/30"
                },
                e(
                  Button,
                  {
                    onClick: (ev) => {
                      ev.stopPropagation();
                      onBoost(index);
                    },
                    disabled: boostsRemaining <= 0 || swimmer.finished,
                    className:
                      "w-full bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50",
                    size: "sm"
                  },
                  e(Zap, { className: "w-4 h-4 mr-1" }),
                  "Give Boost"
                )
              )
          );
        })
      ),

      /* Tips */
      e(
        "div",
        {
          className:
            "mt-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600"
        },
        e(
          "div",
          { className: "flex items-center gap-2 mb-2" },
          e(MessageSquare, { className: "w-4 h-4 text-slate-400" }),
          e(
            "span",
            {
              className:
                "text-xs text-slate-400 uppercase tracking-wider"
            },
            "Quick Tips"
          )
        ),
        e(
          "p",
          { className: "text-xs text-slate-300" },
          'Click a swimmer to select them, then use "Give Boost" to increase their speed temporarily. Use boosts strategically!'
        )
      )
    )
  );
}
