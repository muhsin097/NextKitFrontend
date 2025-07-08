"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getTransferDetails } from "../services/api";
import { Transfer } from "../types";
import Link from "next/link";

export default function TransferPage() {
  const params = useParams();
  const [transferData, setTransferData] = useState<Transfer>();
  const slug = params?.slug || "";

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

  if (!transferData) return <div className="p-6 text-center">Loading...</div>;

  const player = transferData.player;
  const avatar = player.avatar?.formats?.small?.url || player.avatar?.url;
  const articles = player.articles || [];

  return (
    <div className="p-4 max-w-7xl mx-auto font-sans text-gray-900">
      <div className="mb-4 flex items-center">
        <Link
          href="./"
          className="text-sm text-purple-700 hover:underline font-medium"
        >
          &larr; Back
        </Link>
        <h1 className="ml-4 font-bold text-xl">Player Details</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Player Profile */}
        <div className="bg-white rounded-3xl shadow-md p-6 w-full lg:w-1/3 h-fit">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
              {avatar && (
                <Image
                  src={avatar}
                  alt={player?.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <h2 className="text-lg font-bold">{player.name}</h2>
            <p className="text-gray-500 text-sm mb-2">Forward</p>
            {transferData?.trending && (
              <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full mb-3">
                hot transfer
              </span>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Age</span>
              <span>{new Date().getFullYear() - parseInt(player.dob)}</span>
            </div>
            <div className="flex justify-between">
              <span>Nationality</span>
              <span>{player.country}</span>
            </div>
            <div className="flex justify-between">
              <span>From</span>
              <span>{transferData.fromClub?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>To</span>
              <span>{transferData.toClub?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span>{transferData?.currentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span>Fee</span>
              <span>€{transferData?.fee}M</span>
            </div>
            <div className="flex justify-between">
              <span>Score</span>
              <span>{transferData?.score}%</span>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col w-full lg:w-2/3 gap-6">
          {/* Transfer Details Card */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Transfer Details
            </h3>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="font-semibold text-gray-700">
                  {transferData.fromClub?.name}
                </div>
              </div>
              <div className="text-xl">→</div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="font-semibold text-gray-700">
                  {transferData.toClub?.name}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
              <div>
                <div className="font-medium">Transfer Value</div>
                <div className="text-green-600 font-semibold">
                  €{transferData.fee}M
                </div>
              </div>
              <div>
                <div className="font-medium">Market Value</div>
                <div>€{transferData.fee}M</div>
              </div>
              <div>
                <div className="font-medium">Transfer Likelihood</div>
                <div className="text-indigo-600 font-semibold">
                  {transferData.score}%
                </div>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="mb-4">
              <div className="relative h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-white/30 transition-all duration-700 ease-in-out"
                  style={{ width: `${transferData.score}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0% Unlikely</span>
                <span>100% Certain</span>
              </div>
            </div>

            {/* Like/Dislike */}
            <div className="mt-6">
              <p className="text-sm text-gray-700 font-medium mb-3">
                What do you think about this transfer?
              </p>
              <div className="flex gap-6 items-center">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100">
                  👍 <span className="font-medium">1247</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 hover:bg-gray-100">
                  👎 <span className="font-medium">89</span>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Share your opinion on this transfer
              </p>
            </div>
          </div>

          {/* Transfer Updates */}
          <div className="bg-white rounded-3xl shadow-md p-6 max-h-[600px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Transfer Updates
              </h3>
              <span className="text-xs text-gray-500">
                {articles.length} update{articles.length !== 1 && "s"}
              </span>
            </div>

            {articles.length > 0 ? (
              <ul className="space-y-4">
                {articles.map((article) => (
                  <li
                    key={article.id}
                    className="bg-gray-50 p-5 rounded-2xl border border-gray-200"
                  >
                    <div
                      className="text-sm text-gray-800 twitter-embed"
                      dangerouslySetInnerHTML={{
                        __html: article.content?.[0]?.children?.[0]?.text || "",
                      }}
                    />
                    <div className="mt-2">
                      <a
                        href={article?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Tweet
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No articles available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
