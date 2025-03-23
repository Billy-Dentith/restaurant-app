"use client";

import React from "react";
import Countdown from "react-countdown";

const currentDate = new Date(); 
const endingDate = currentDate.setDate(currentDate.getDate() + 7);

export const CountDown = () => {
  return (
    <Countdown
      className="font-bold text-5xl text-yellow-300"
      date={endingDate}
    />
  );
};
