import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Trophy, Zap, Award, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";

const e = React.createElement;

export default function StatsDashboard({ onClose }) {
  const [filter, setFilter] = useState("all");

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["raceStats"],
    queryFn: () => base44.entities.RaceStats.list("-race_date", 100)
  });

  /* Aggregate stats */
  const swimmerStats = {};
  stats.forEach((stat) => {
    if (!swimmerStats[stat.swimmer_name]) {
      swimmerStats[stat.swimmer_name] = {
        races: 0,
        totalTime: 0,
        bestTime: Infinity,
        avgPosition: 0,
        totalBoosts: 0,
        wins: 0,
        podiums: 0
      };
    }
    const s = swimmerStats[stat.swimmer_name];
    s.races++;
    s.totalTime += stat.finish_time;
    s.bestTime = Math.min(s.bestTime, stat.finish_time);
    s.avgPosition += stat.position;
    s.totalBoosts += stat.coach_boosts || 0;
    if (stat.position === 1) s.wins++;
    if (stat.position <= 3) s.podiums++;
  });

  Object.keys(swimmerStats).forEach((name) => {
    swimmerStats[name].avgPosition /= swimmerStats[name].races;
    swimmerStats[name].avgTime =
      swimmerStats[name].totalTime / swimmerStats[name].races;
  });

  const topSwimmers = Object.entries(swimmerStats)
    .sort(([, a], [, b]) => b.wins - a.wins || a.avgPosition - b.avgPosition)
    .slice(0, 10);

  const formatTime = (ms) => {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const cs = Math.floor((ms % 1000) / 10);
    return (
      minutes +
      ":" +
      seconds.toString().padStart(2, "0") +
      "." +
      cs.toString().padStart(2, "0")
    );
  };

  if (isLoading) {
    return e(
      "div",
      { className: "flex items-center justify-center p-12" },
      e("div", { className: "text-white" }, "Loading statistics...")
    );
  }

  return e(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-6"
    },

    /* Header */
    e(
      "div",
      { className: "flex items-center justify-between" },
      e(
        "div",
        { className: "flex items-center gap-3" },
        e(
          "div",
          { className: "p-2 bg-purple-500/20 rounded-xl" },
          e(BarChart3, { className: "w-6 h-6 text-purple-400" })
        ),
        e(
          "div",
          null,
          e(
            "h2",
            { className: "text-2xl font-bold text-white" },
            "Performance Analytics"
          ),
          e(
            "p",
            { className: "text-slate-400 text-sm" },
            "Track swimmer statistics across all races"
          )
        )
      ),
      e(
        Button,
        {
          onClick: onClose,
          variant: "outline",
          className: "border-slate-600 text-slate-300"
        },
        "Back to Racing"
      )
    ),

    /* Overview Cards */
    e(
      "div",
      { className: "grid grid-cols-2 md:grid-cols-4 gap-4" },

      e(
        Card,
        { className: "bg-slate-800/50 border-slate-700/50" },
        e(
          CardContent,
          { className: "p-4" },
          e(
            "div",
            { className: "flex items-center gap-2 mb-2" },
            e(Trophy, { className: "w-4 h-4 text-yellow-400" }),
            e(
              "span",
              { className: "text-xs text-slate-400 uppercase" },
              "Total Races"
            )
          ),
          e(
            "div",
            { className: "text-2xl font-bold text-white" },
            stats.length
          )
        )
      ),

      e(
        Card,
        { className: "bg-slate-800/50 border-slate-700/50" },
        e(
          CardContent,
          { className: "p-4" },
          e(
            "div",
            { className: "flex items-center gap-2 mb-2" },
            e(Award, { className: "w-4 h-4 text-purple-400" }),
            e(
              "span",
              { className: "text-xs text-slate-400 uppercase" },
              "Swimmers"
            )
          ),
          e(
            "div",
            { className: "text-2xl font-bold text-white" },
            Object.keys(swimmerStats).length
          )
        )
      ),

      e(
        Card,
        { className: "bg-slate-800/50 border-slate-700/50" },
        e(
          CardContent,
          { className: "p-4" },
          e(
            "div",
            { className: "flex items-center gap-2 mb-2" },
            e(Zap, { className: "w-4 h-4 text-cyan-400" }),
            e(
              "span",
              { className: "text-xs text-slate-400 uppercase" },
              "Total Boosts"
            )
          ),
          e(
            "div",
            { className: "text-2xl font-bold text-white" },
            Object.values(swimmerStats).reduce(
              (sum, s) => sum + s.totalBoosts,
              0
            )
          )
        )
      ),

      e(
        Card,
        { className: "bg-slate-800/50 border-slate-700/50" },
        e(
          CardContent,
          { className: "p-4" },
          e(
            "div",
            { className: "flex items-center gap-2 mb-2" },
            e(TrendingUp, { className: "w-4 h-4 text-green-400" }),
            e(
              "span",
              { className: "text-xs text-slate-400 uppercase" },
              "Avg Speed"
            )
          ),
          e(
            "div",
            { className: "text-2xl font-bold text-white" },
            stats.length
              ? (
                  stats.reduce(
                    (sum, s) => sum + (s.average_speed || 0),
                    0
                  ) / stats.length
                ).toFixed(1)
              : "0"
          )
        )
      )
    ),

    /* Leaderboard */
    e(
      Card,
      { className: "bg-slate-800/50 border-slate-700/50" },
      e(
        CardHeader,
        null,
        e(
          CardTitle,
          { className: "flex items-center gap-2 text-white" },
          e(Trophy, { className: "w-5 h-5 text-yellow-400" }),
          "Swimmer Leaderboard"
        )
      ),
      e(
        CardContent,
        null,
        topSwimmers.length === 0
          ? e(
              "div",
              { className: "text-center py-8 text-slate-400" },
              "No race statistics yet. Complete some races to see data!"
            )
          : e(
              "div",
              { className: "space-y-2" },
              topSwimmers.map(([name, s], index) =>
                e(
                  motion.div,
                  {
                    key: name,
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: index * 0.05 },
                    className:
                      "flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  },
                  e(
                    "div",
                    { className: "font-semibold text-white" },
                    index + 1,
                    ". ",
                    name
                  ),
                  e(
                    "div",
                    { className: "text-sm text-slate-300" },
                    "Wins: ",
                    s.wins,
                    " • Best: ",
                    formatTime(s.bestTime)
                  )
                )
              )
            )
      )
    )
  );
}
