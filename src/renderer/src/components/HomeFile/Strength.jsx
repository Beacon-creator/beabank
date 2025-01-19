/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import network from "../../assets/network.png";

export default function Strength() {
  const [networkInfo, setNetworkInfo] = useState({ ssid: null, strength: null }); // State for network info
  const [loading, setLoading] = useState(false); // State for loading spinner

  const fetchNetworkStrength = async () => {
    setLoading(true); // Show the spinner
    try {
      const response = await fetch("https://beabankapi.onrender.com/api/network-strength", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch network strength");
      }

      const data = await response.json();

      // Check if 'strength' object exists and is valid
      if (data.strength && data.strength.ssid && data.strength.strength !== undefined) {
        setNetworkInfo({
          ssid: data.strength.ssid,
          strength: parseFloat(data.strength.strength), // Ensure it's a number
        });
      } else {
        setNetworkInfo({ ssid: "Unknown", strength: "N/A" }); // Handle invalid data gracefully
      }
    } catch (error) {
      console.error("Error fetching network strength:", error);
      setNetworkInfo({ ssid: "Error", strength: "N/A" }); // Fallback for errors
    } finally {
      setLoading(false); // Hide the spinner
    }
  };

  useEffect(() => {
    fetchNetworkStrength();

    // Set interval to 5 minutes (300,000 ms)
    const interval = setInterval(fetchNetworkStrength, 300000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex-col flex items-center justify-center">
      <div
        className="bg-gray-100 border-white rounded-lg 
      p-1 my-5"
        style={{ width: "280px" }}
      >
        <div className="flex text-sm px-2 my-2">
          <h2>Network Name:</h2>
          <h2 className="ml-2">{networkInfo.ssid || "--"}</h2>
        </div>
        <div className="flex text-sm px-2 my-2">
          <h2>Strength:</h2>
          <h2 className="ml-2">
            {typeof networkInfo.strength === "number"
              ? `${networkInfo.strength.toFixed(2)}%` // Display percentage
              : networkInfo.strength}
          </h2>
        </div>
      </div>

      <div className="my-2">
        <button
          className="flex items-center justify-center px-3 py-3 text-sm border-2 
          border-white rounded-lg bg-emerald-900 hover:bg-emerald-300 transition"
          style={{ width: "280px" }}
          onClick={fetchNetworkStrength} // Trigger fetch on button click
        >
          <img src={network} alt="reminder" className="h-5" />
          <h2 className="mx-2">{loading ? "Checking..." : "Check Network Strength"}</h2>
        </button>
        <div>
          <h2 className="text-xs justify-center flex my-1">
            {`Let's keep growing the`} <i>&nbsp;fanalera&nbsp;technology!</i>
          </h2>
        </div>
      </div>
    </div>
  );
}
