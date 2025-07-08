import { PlayerResponse, TransferAPIResponse } from "../types";

const API_BASE = "https://hopeful-bird-7f4ad423ad.strapiapp.com";

export async function fetchOtherTransfers(): Promise<TransferAPIResponse> {
  const res = await fetch(
    `${API_BASE}/api/transfers?filters[trending][$eq]=false&populate[player][populate]=avatar&populate[fromClub]=*&populate[toClub]=*`,
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  return json;
}



export async function fetchTrendingTransfers(): Promise<TransferAPIResponse> {
  const res = await fetch(
    `${API_BASE}/api/transfers?filters[trending][$eq]=true&populate[player][populate]=avatar&populate[fromClub]=*&populate[toClub]=*`,
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  return json;
}

export async function getPlayerDetails(slug:number): Promise<PlayerResponse> {
  const res = await fetch(
    `${API_BASE}/api/players?filters[id][$eq]=${slug}&populate=*`,
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  return json;
}

export async function getTransferDetails(slug:string):  Promise<TransferAPIResponse> {
  const res = await fetch(
    `${API_BASE}/api/transfers?filters[slug][$eq]=${slug}&populate[player][populate]=avatar&populate[player][populate]=articles&populate[fromClub]=*&populate[toClub]=*`,
    {
      cache: "no-store",
    }
  );
  const json = await res.json();
  return json;
}