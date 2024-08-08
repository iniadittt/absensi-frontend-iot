"use client";
import { useEffect, useState } from "react";

const monthName = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

const Clock = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const dayName = now.toLocaleDateString("id-ID", { weekday: "long" });
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = String(now.getDate()).padStart(2, "0");
      const dateString = `${day} ${monthName[month]} ${year}`;
      setDateTime(`${dayName}, ${dateString} - ${timeString} WIB`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{dateTime || "Loading..."}</div>;
};

export default Clock;
