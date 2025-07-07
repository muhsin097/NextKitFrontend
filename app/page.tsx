"use client";
import React, { useEffect, useState } from "react";

type TransferRumor = {
  id: string;
  playerName: string;
  currentClub: string;
  targetClub: string;
  position: string;
  value: string;
  probability: number;
  timeAgo: string;
  status: "hot" | "warm" | "cold";
  playerImage?: string;
  currentClubLogo?: string;
  targetClubLogo?: string;
};

const mockRumors: TransferRumor[] = [
  {
    id: "1",
    playerName: "Kylian Mbappé",
    currentClub: "Paris Saint-Germain",
    targetClub: "Real Madrid",
    position: "Forward",
    value: "€180M",
    probability: 85,
    timeAgo: "2 hours ago",
    status: "hot",
    playerImage: "https://i.pravatar.cc/300?u=a042581f4e29026704e",
    currentClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026704em",
    targetClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026704o",
  },
  {
    id: "2",
    playerName: "Erling Haaland",
    currentClub: "Manchester City",
    targetClub: "Barcelona",
    position: "Striker",
    value: "€200M",
    probability: 72,
    timeAgo: "4 hours ago",
    status: "hot",
    playerImage: "https://i.pravatar.cc/300?u=a042581f4e29026704",
    currentClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026709",
    targetClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026708",
  },
  {
    id: "3",
    playerName: "Declan Rice",
    currentClub: "West Ham United",
    targetClub: "Arsenal",
    position: "Midfielder",
    value: "€120M",
    probability: 91,
    timeAgo: "1 hour ago",
    status: "hot",
    playerImage: "https://i.pravatar.cc/300?u=a042581f4e29026704",
    currentClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026707",
    targetClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026706",
  },
  {
    id: "4",
    playerName: "Jude Bellingham",
    currentClub: "Borussia Dortmund",
    targetClub: "Real Madrid",
    position: "Midfielder",
    value: "€130M",
    probability: 89,
    timeAgo: "3 hours ago",
    status: "hot",
    playerImage: "https://i.pravatar.cc/300?u=a042581f4e29026704k",
    currentClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026705",
    targetClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026704",
  },
  {
    id: "5",
    playerName: "Victor Osimhen",
    currentClub: "Napoli",
    targetClub: "Manchester United",
    position: "Striker",
    value: "€150M",
    probability: 68,
    timeAgo: "6 hours ago",
    status: "warm",
    playerImage: "https://i.pravatar.cc/300?u=a042581f4e29026704e",
    currentClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026703",
    targetClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026702",
  },
  {
    id: "6",
    playerName: "Mason Mount",
    currentClub: "Chelsea",
    targetClub: "Liverpool",
    position: "Midfielder",
    value: "€80M",
    probability: 45,
    timeAgo: "8 hours ago",
    status: "warm",
    playerImage: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
    currentClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026701",
    targetClubLogo: "https://i.pravatar.cc/300?u=a042581f4e29026700",
  },
];

const getColor = (prob: number) => {
  if (prob >= 80) return "text-green-600";
  if (prob >= 60) return "text-orange-600";
  return "text-red-600";
};

export default function TransfersPage() {
  const [rumors, setRumors] = useState<TransferRumor[]>([]);

  useEffect(() => {
    setRumors(mockRumors);
  }, []);

  const trending = rumors.filter((r) => r.probability > 70);
  const others = rumors.filter((r) => r.probability <= 70);

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

        {/* Search bar */}
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
              {rumors.length}
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
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Trending Transfers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map((rumor) => (
            <div key={rumor.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={rumor.playerImage}
                  alt={rumor.playerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-600">
                    {rumor.playerName}
                  </h3>
                  <p className="text-sm text-gray-500">{rumor.position}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img src={rumor.currentClubLogo} className="w-6 h-6" />
                  <span className="text-sm text-gray-700">
                    {rumor.currentClub}
                  </span>
                </div>
                <span className="text-purple-500 font-bold">→</span>
                <div className="flex items-center gap-2">
                  <img src={rumor.targetClubLogo} className="w-6 h-6" />
                  <span className="text-sm text-gray-700">
                    {rumor.targetClub}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-green-600">{rumor.value}</span>
                <span
                  className={`${getColor(rumor.probability)} font-semibold`}
                >
                  {rumor.probability}%
                </span>
                <span className="text-xs text-gray-400">{rumor.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More News */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          More Transfer News
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {others.map((rumor) => (
            <div
              key={rumor.id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={rumor.playerImage}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-md text-gray-600">
                    {rumor.playerName}
                  </h3>
                  <p className="text-sm text-gray-500">{rumor.position}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">{rumor.value}</p>
                <p className="text-xs text-gray-400">{rumor.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
