"use client";
import React, { useEffect, useState } from "react";
import {
  fetchTrendingTransfers,
  fetchOtherTransfers,
} from "./services/api";
import { TransferAPIResponse } from "./types";
import { formatDistanceToNow,differenceInYears } from "date-fns";
import Image from 'next/image'

const getColor = (prob: number) => {
  if (prob >= 80) return "text-green-600";
  if (prob >= 60) return "text-yellow-600";
  return "text-red-600";
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
    <div className="bg-gradient-to-b from-white to-violet-50 p-6">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <p className="text-purple-600 font-medium">Live Transfer Updates</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-600">
          Stay Ahead of Every <span className="text-purple-600">Transfer</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Get real-time updates on the hottest transfer rumors, confirmed deals,
          and insider information from the world’s top football leagues.
        </p>

        <div className="flex w-full max-w-md mx-auto mt-4">
          <input
            type="text"
            placeholder="Search players, clubs..."
            className="w-full border px-4 py-2 rounded-l-md shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-6">
          <div>
            <p className="text-3xl font-bold text-purple-600">
              {trending.length + others.length}
            </p>
            <p className="text-gray-500">Active Rumors</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">
              {trending.length}
            </p>
            <p className="text-gray-500">Trending Now</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">24/7</p>
            <p className="text-gray-500">Live Coverage</p>
          </div>
        </div>
      </section>

      {/* Trending Transfers */}
    {trending && trending?.length >0 &&  <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Trending Transfers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending?.map((rumor) => (
            <div key={rumor?.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-4 mb-2">
                <Image
                  src={rumor?.player?.avatar?.formats?.small?.url ?? ""}
                  alt={rumor?.player?.name}
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-600">
                    {rumor?.player?.name}
                  </h3>
                    <p className="text-sm text-gray-500">
    Age: {differenceInYears(new Date(), new Date(rumor?.player?.dob))} </p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">
                  {rumor?.fromClub?.name}
                </span>
             
 
                <span className="text-purple-500 font-bold">→</span>
                <span className="text-sm text-gray-700">
                  {rumor?.toClub?.name}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-green-600">${rumor?.fee}</span>
                <span className={`${getColor(rumor?.score)} font-semibold`}>
                  {rumor.score}%
                </span>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(rumor?.lastUpdated), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>}

      {/* Other Rumors */}
   { others && others?.length > 0 &&  <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
        { `${trending?.length===0 ? 'Transfer News':'More Transfer News'}` }
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {others?.map((rumor) => (
            <div
              key={rumor.id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={rumor?.player?.avatar?.formats?.small?.url ?? ""}
                  className="w-10 h-10 rounded-full"
                  alt={rumor?.player?.name}

                />
                <div>
                  <h3 className="font-bold text-md text-gray-600">
                    {rumor?.player?.name}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{rumor?.score}</p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(rumor?.lastUpdated), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>}

      {/* CTA */}
      <section className="bg-purple-50 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Never Miss a Transfer
        </h3>
        <p className="text-gray-500 mb-4">
          Get instant notifications for your favorite players and clubs
        </p>
        <button className="px-6 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700">
          Set Up Alerts
        </button>
      </section>
    </div>
  );
}
