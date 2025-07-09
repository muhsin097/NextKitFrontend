"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { getTransferDetails } from "../services/api";
import { Transfer } from "../types";
import Link from "next/link";

export default function TransferPage() {
  const params = useParams();
  const [transferData, setTransferData] = useState<Transfer>();
  const slug = params?.slug || "";
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        if (!slug) return;
        const res = await getTransferDetails(slug as string);
        if (res?.data?.length > 0) {
          setTransferData(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch transfer data", err);
      }
    };

    fetchTransfer();
  }, [slug]);

  const player = transferData?.player;
  const avatar = player?.avatar?.formats?.small?.url || player?.avatar?.url;
  const articles = useMemo(() => player?.articles || [], [player?.articles]);

  if (!transferData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-300 text-lg">Loading transfer details...</p>
        </div>
      </div>
    );
  }

  const handleEngagementClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const getProbabilityBadge = (prob: number) => {
    if (prob >= 80) return "from-emerald-500 to-emerald-600";
    if (prob >= 60) return "from-amber-500 to-amber-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="./"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Transfers</span>
            </Link>
            <div className="inline-flex items-center space-x-2 text-sm font-medium text-blue-400">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Player Profile */}
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full p-0.5">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={player?.name}
                        width={96}
                        height={96}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-2xl text-gray-300">👤</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">{player?.name}</h2>
                
                {transferData?.trending && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-medium mb-4">
                    <span className="mr-1">🔥</span>
                    Trending
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-300">Age</span>
                  <span className="text-white font-semibold">
                    {player?.dob && new Date().getFullYear() - parseInt(player?.dob)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-300">Nationality</span>
                  <span className="text-white font-semibold">{player?.country}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-300">From</span>
                  <span className="text-white font-semibold">{transferData.fromClub?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-300">To</span>
                  <span className="text-white font-semibold">{transferData.toClub?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-300">Status</span>
                  <span className="text-white font-semibold">{transferData?.currentStatus}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-300">Fee</span>
                  <span className="text-emerald-400 font-semibold">
                    {transferData?.fee === -1
                      ? "Undisclosed"
                      : transferData?.fee === 0
                      ? "Free"
                      : `€${transferData?.fee}M`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-300">Probability</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getProbabilityBadge(transferData?.score)}`}>
                    {transferData?.score}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col lg:w-2/3 gap-8">
            {/* Transfer Details Card */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Transfer Details</h3>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {transferData.fromClub?.name?.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{transferData.fromClub?.name}</div>
                    <div className="text-gray-400 text-sm">From</div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 mx-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {transferData.toClub?.name?.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{transferData.toClub?.name}</div>
                    <div className="text-gray-400 text-sm">To</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-gray-300 text-sm mb-1">Transfer Value</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {transferData?.fee === -1
                      ? "Undisclosed"
                      : transferData?.fee === 0
                      ? "Free"
                      : `€${transferData?.fee}M`}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-300 text-sm mb-1">Transfer Likelihood</div>
                  <div className="text-2xl font-bold text-blue-400">{transferData.score}%</div>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="mb-6">
                <div className="relative h-4 rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: `${transferData.score}%`,
                      background: `linear-gradient(to right, #ef4444, #facc15, #22c55e)`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0% Unlikely</span>
                  <span>100% Certain</span>
                </div>
              </div>

              {/* Like/Dislike */}
              <div className="relative">
                <div className="flex gap-4 items-center">
                  <button
                    onClick={handleEngagementClick}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300 hover:scale-105 transform shadow-lg"
                  >
                    <span className="text-lg">👍</span>
                    <span className="font-semibold">1,247</span>
                  </button>
                  <button
                    onClick={handleEngagementClick}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:scale-105 transform shadow-lg"
                  >
                    <span className="text-lg">👎</span>
                    <span className="font-semibold">89</span>
                  </button>
                </div>

                {/* Toast Message */}
                {showMessage && (
                  <div className="absolute top-full left-0 mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm px-4 py-2 rounded-xl shadow-lg animate-pulse">
                    🎉 Join our community to engage!
                  </div>
                )}
              </div>
            </div>

            {/* Transfer Updates */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Transfer Updates</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">
                    {articles.length} update{articles.length !== 1 && "s"}
                  </span>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                {articles.length > 0 ? (
                  articles.map((article, index) => (
                    <div
                      key={article.id}
                      className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-md p-5 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
                    >
                      <div
                        className="text-gray-200 text-sm leading-relaxed mb-3"
                        dangerouslySetInnerHTML={{
                          __html: article.content?.[0]?.children?.[0]?.text || "",
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <a
                          href={article?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                        >
                          <span>View Tweet</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <span className="text-xs text-gray-500">Update #{index + 1}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400">No updates available yet</p>
                    <p className="text-gray-500 text-sm mt-1">Check back later for the latest news</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}