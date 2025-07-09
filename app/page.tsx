"use client";
import React, { useEffect, useState } from "react";
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
}) => (
  <Link href={`/${rumor?.slug}`} className="group block">
    <div
      className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl p-6 border ${
        featured ? "border-blue-500/30" : "border-gray-700/50"
      } hover:border-blue-500/50 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl`}
    >
      {/* Featured indicator */}
      {featured && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-xs">🔥</span>
        </div>
      )}

      {/* Player Info */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full p-0.5">
            <Image
              src={rumor?.player?.avatar?.formats?.small?.url ?? ""}
              alt={rumor?.player?.name}
              width={48}
              height={48}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
            {rumor?.player?.name}
          </h3>
          <p className="text-gray-400 text-sm">
            Age {differenceInYears(new Date(), new Date(rumor?.player?.dob))}
          </p>
        </div>
      </div>

      {/* Transfer Direction */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-200 truncate">
            {rumor?.fromClub?.name}
          </p>
          <p className="text-xs text-gray-400">From</p>
        </div>
        <div className="flex-shrink-0 mx-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
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
          <p className="text-sm font-medium text-gray-200 truncate">
            {rumor?.toClub?.name}
          </p>
          <p className="text-xs text-gray-400">To</p>
        </div>
      </div>

      {/* Transfer Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-emerald-400">
            {rumor?.fee === -1
              ? "Undisclosed"
              : rumor?.fee === 0
              ? "Free"
              : `€${rumor?.fee}M`}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getProbabilityBadge(
              rumor?.score
            )}`}
          >
            {rumor.score}%
          </span>
        </div>
      </div>

      {/* Last Updated */}
      <div className="pt-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-400">
          Updated{" "}
          {formatDistanceToNow(new Date(rumor?.lastUpdated), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  </Link>
);
