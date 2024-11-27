"use client";
import React, { useState } from "react";
import { Open_Sans } from "next/font/google";
import btc from "../../public/coin-logos/btc-logo.png";
import eth from "../../public/coin-logos/eth-logo.png";
import strk from "../../public/coin-logos/strk-logo.png";
import alt from "../../assets/alt.png";
import type { StaticImageData } from "next/image";

import { UncheckedIcon } from "@/svgs/UncheckedIcon";
import { CheckIcon } from "@/svgs/CheckIcon";
import { TimeIcon } from "@/svgs/TimeIcon";
import { SearchIcon } from "@/svgs/SearchIcon";
import { CloseButton } from "@/svgs/CloseButton";

import Image from "next/image";
const openSans = Open_Sans({ subsets: ["latin"] });

type Coin = {
  key: string;
  imgLink: StaticImageData | string;
  coinName: string;
  coinSymbol: string;
};

const Selecttokens = () => {
  const coins: Coin[] = [
    { key: "bitcoin", imgLink: strk, coinName: "Bitcoin", coinSymbol: "BTC" },
    { key: "ethereum", imgLink: eth, coinName: "Ethereum", coinSymbol: "ETH" },
    { key: "dogecoin", imgLink: eth, coinName: "Dogecoin", coinSymbol: "DOGE" },
    { key: "litecoin", imgLink: btc, coinName: "Litecoin", coinSymbol: "LTC" },
    { key: "ripple", imgLink: alt, coinName: "Ripple", coinSymbol: "XRP" },
    { key: "cardano", imgLink: alt, coinName: "Cardano", coinSymbol: "ADA" },
    { key: "polkadot", imgLink: alt, coinName: "Polkadot", coinSymbol: "DOT" },
    { key: "solana", imgLink: alt, coinName: "Solana", coinSymbol: "SOL" },
    {
      key: "binanceCoin",
      imgLink: alt,
      coinName: "Binance Coin",
      coinSymbol: "BNB",
    },
    {
      key: "avalanche",
      imgLink: alt,
      coinName: "Avalanche",
      coinSymbol: "AVAX",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.coinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.coinSymbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCoinSelection = (coinKey: string) => {
    setSelectedCoins((prev) =>
      prev.includes(coinKey)
        ? prev.filter((key) => key !== coinKey)
        : [...prev, coinKey]
    );
  };

  return (
    <div className=" w-full  pt-[180px] items-center justify-center flex">
      <div
        className={`shadow-lg rounded w-[350px] sm:w-[800px] ${openSans.className}  h-[660px] flex justify-center flex-col items-center`}
      >
        <div className=" w-[80%] flex items-center justify-between">
          <p className="none sm:block"></p>
          <p className="font-[600]  text-center sm:text-left text-[20px] sm:text-[24px] ">
            Select token(s) to auto-swap from
          </p>
          <div className="none sm:block">
            <CloseButton />
          </div>
        </div>
        <br />
        <p className="text-center font-normal text-[14px] sm:text-[16px]  leading-[22px] w-[318px] sm:w-[620px] ">
          You can select multiple tokens to auto-swap from here. You can select
          how many percent of that token should be auto-swapped whenever you get
          funded.
        </p>
        <br />

        <form className="mx-auto flex items-center justify-center flex-col">
          <div className="relative bg-[#100827] px-4 py-2 flex items-center justify-between w-[318px] sm:w-[704px] rounded-full">
            <input
              type="search"
              className="w-[600px] bg-[#100827] text-[14px] p-1 text-white border-none focus:outline-none focus:border-none focus:no-underline  "
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <SearchIcon />
          </div>
          <br />
          <div className="flex  w-[318px] sm:w-[704px] flex-col">
            <div className="flex  items-center  gap-2">
              <TimeIcon />
              <p>Selected tokens</p>
            </div>
            <div className="grid mt-4 grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-4 ">
              {filteredCoins.map((coin) => (
                <div
                  key={coin.key}
                  onClick={() => toggleCoinSelection(coin.key)}
                  className={`sm:w-[224px] w-[150px] h-[48px] rounded-full border-[#170F2E] py-1 px-2 grid grid-cols-[24px_auto_30px] sm:grid-cols-[35px_auto_30px] cursor-pointer 
                    ${selectedCoins.includes(coin.key) ? "bg-[#0F96E3]/10" : ""}`}
                >
                  <div className="items-center justify-center flex">
                    <Image
                      src={coin.imgLink}
                      alt={coin.coinName}
                      width={24}
                      height={24}
                      className="sm:w-8 sm:h-8 "
                    />
                  </div>
                  <div className="flex pl-2 flex-col items-start justify-between text-center">
                    <p className="text-[14px] sm:text-[16px] font-normal sm:font-semibold">
                      {coin.coinName}
                    </p>
                    <p className="capitalize text-[12px] sm:text-[13px] text-[#433B5A]">
                      {coin.coinSymbol}
                    </p>
                  </div>
                  <div className="items-center justify-center flex">
                    {selectedCoins.includes(coin.key) ? <CheckIcon /> : <UncheckedIcon /> }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
        <br />
        <hr className="border-[#100827] w-[704px]" />
        <br />
        <button
          className="w-[318px] sm:w-[704px] text-white bg-[#100827] h-[60px] rounded-[32px]"
          disabled={selectedCoins.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};



export default Selecttokens;