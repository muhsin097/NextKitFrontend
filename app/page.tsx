"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchTrendingTransfers, fetchOtherTransfers } from "./services/api";
import { Transfer, TransferAPIResponse } from "./types";
import { formatDistanceToNow, differenceInYears } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const getProbabilityBadge = (prob: number) => {
  if (prob >= 80)
    return "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white";
  if (prob >= 60)
    return "bg-gradient-to-r from-amber-500 to-amber-600 text-white";
  return "bg-gradient-to-r from-red-500 to-red-600 text-white";
};

export default function TransfersPage() {
  const [trendingApi, setTrending] = useState<TransferAPIResponse>();
  const [otherApi, setOther] = useState<TransferAPIResponse>();

  useEffect(() => {
    getTransfers();
  }, []);

  const getTransfers = async () => {
    const trending = await fetchTrendingTransfers();
    const others = await fetchOtherTransfers();
    setTrending(trending);
    setOther(others);
  };

  const trending = trendingApi?.data ?? [];
  const others = otherApi?.data ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-sm font-medium text-blue-400 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Transfer{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
                Hub
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Real-time football transfer news, rumors, and confirmed deals from
              top leagues worldwide
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search players or clubs..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 backdrop-blur-md border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-800/70"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            label="Active Rumors"
            value={trending.length + others.length}
            icon="📊"
            accent="blue"
          />
          <StatCard
            label="Trending Now"
            value={trending.length}
            icon="🔥"
            accent="red"
          />
          <StatCard
            label="Live Coverage"
            value="24/7"
            icon="⚡"
            accent="indigo"
          />
        </div>

        {/* Trending Transfers */}
        {trending?.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-2xl font-semibold text-white">
                🔥 Trending Transfers
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trending?.map((rumor) => (
                <PlayerCard rumor={rumor} key={rumor.id} featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* Other Rumors */}
        {others?.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <h2 className="text-2xl font-semibold text-white">
                {trending.length === 0
                  ? "⚡ Transfer News"
                  : "📰 More Transfer News"}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((rumor) => (
                <PlayerCard rumor={rumor} key={rumor.id} featured={false} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-600/30">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5-5-5h5V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16l3.5-2L10 18l3.5 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Never Miss a Transfer
            </h3>
            <p className="text-gray-300 mb-6 font-light">
              Get instant notifications for your favorite players and clubs
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
              <span className="mr-2">Set Up Alerts</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

const StatCard = ({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: string;
  accent: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accentColors: any = {
    blue: "from-blue-500 to-blue-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 transform">
      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${accentColors[accent]} rounded-full opacity-10 -mr-12 -mt-12`}
      ></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl">{icon}</div>
          <div className="text-3xl font-bold text-white">{value}</div>
        </div>
        <p className="text-gray-300 text-sm font-medium">{label}</p>
      </div>
    </div>
  );
};

const PlayerCard = ({
  rumor,
  featured,
}: {
  rumor: Transfer;
  featured: boolean;
}) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isCompleted = rumor?.score === 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <Link href={`/${rumor?.slug}`} className="group block">
      <div
        ref={cardRef}
        className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl overflow-hidden border 
          ${
            isCompleted
              ? "border-green-600 ring-2 ring-green-500"
              : featured
              ? "border-blue-500/30"
              : "border-gray-700/50"
          } 
          ${
            isCompleted
              ? "hover:scale-100"
              : "hover:scale-105 hover:border-blue-500/50"
          } 
          transform shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        {/* Full Card Background Image with Fade Effect */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
            isInView ? "md:opacity-0 opacity-100" : ""
          }`}
        >
          <Image
            src={rumor?.player?.avatar?.formats?.small?.url ?? ""}
            alt={rumor?.player?.name}
            width={400}
            height={400}
            className={`w-full h-full object-cover object-top transition-all duration-500`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-900/70 to-gray-900/95"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/30 to-gray-900/80"></div>
        </div>

        {/* Transfer Completed Badge */}
        {isCompleted && (
          <div className="absolute top-4 left-4 z-20 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            ✔ Completed
          </div>
        )}

        {/* Featured indicator */}
        {featured && !isCompleted && (
          <div className="absolute top-4 right-4 z-20 w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm">🔥</span>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative h-40 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 flex items-center justify-center overflow-hidden z-10">
          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2)_0%,_transparent_70%)] group-hover:opacity-0 transition-opacity duration-500 ${
              isInView ? "md:opacity-100 opacity-0" : ""
            }`}
          ></div>

          <div
            className={`relative z-10 group-hover:opacity-0 transition-opacity duration-500 ${
              isInView ? "md:opacity-100 opacity-0" : ""
            }`}
          >
            <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full p-1.5 shadow-2xl ring-4 ring-white/10">
              <Image
                src={rumor?.player?.avatar?.formats?.small?.url ?? ""}
                alt={rumor?.player?.name}
                width={112}
                height={112}
                className={`w-full h-full rounded-full object-cover border-3 border-white/30 `}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Player Info */}
        <div className="relative p-6 pt-4 z-10">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-200 group-hover:drop-shadow-lg transition-all duration-300 mb-1">
              {rumor?.player?.name}
            </h3>
            <p className="text-gray-400 group-hover:text-gray-300 text-sm font-medium transition-colors duration-300">
              Age {differenceInYears(new Date(), new Date(rumor?.player?.dob))}
            </p>
          </div>

          {/* Transfer Direction */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-200 group-hover:text-white group-hover:drop-shadow-md transition-all duration-300 truncate">
                {rumor?.fromClub?.name}
              </p>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                From
              </p>
            </div>
            <div className="flex-shrink-0 mx-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:from-blue-400 group-hover:to-indigo-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm font-medium text-gray-200 group-hover:text-white group-hover:drop-shadow-md transition-all duration-300 truncate">
                {rumor?.toClub?.name}
              </p>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                To
              </p>
            </div>
          </div>

          {/* Transfer Details */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 group-hover:drop-shadow-md transition-all duration-300">
                {rumor?.fee === -1
                  ? "Undisclosed"
                  : rumor?.fee === 0
                  ? "Free"
                  : `€${rumor?.fee}M`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium group-hover:shadow-lg transition-all duration-300 ${getProbabilityBadge(
                  rumor?.score
                )}`}
              >
                {rumor.score}%
              </span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="pt-4 border-t border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-300">
            <p className="text-xs text-gray-400 group-hover:text-gray-300 group-hover:drop-shadow-sm transition-all duration-300">
              Updated{" "}
              {formatDistanceToNow(new Date(rumor?.lastUpdated), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
