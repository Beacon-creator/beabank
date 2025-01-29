import React, { useState, useEffect } from "react";
import network from "../../assets/network.png";

export default function Strength() {
  const [networkInfo, setNetworkInfo] = useState({ ssid: null, strength: null });
  const [loading, setLoading] = useState(false);

  const fetchNetworkStrength = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://beabankapi.onrender.com/api/network-strength", {
        method: "GET",
        credentials: 'include' // Add this
      });
  
      if (!response.ok) throw new Error("Failed to fetch network strength");
  
      const data = await response.json();
      console.log('API Response:', data); // Debug log
  
      if (data.strength && typeof data.strength.ssid === 'string') {
        console.log('Setting network info:', {
          ssid: data.strength.ssid,
          strength: data.strength.strength
        }); // Debug log
        setNetworkInfo({
          ssid: data.strength.ssid,
          strength: data.strength.strength
        });
      } else {
        setNetworkInfo({ ssid: "Unknown", strength: "N/A" });
      }
    } catch (error) {
      console.error("Network fetch error:", error);
      setNetworkInfo({ ssid: "Error", strength: "N/A" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkStrength();
    const interval = setInterval(fetchNetworkStrength, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-col flex items-center justify-center">
      <div className="bg-gray-100 border-white rounded-lg p-1 my-5" style={{ width: "280px" }}>
        <div className="flex text-sm px-2 my-2">
          <h2>Network Name:</h2>
          <h2 className="ml-2">{networkInfo.ssid || "--"}</h2>
        </div>
        <div className="flex text-sm px-2 my-2">
          <h2>Strength:</h2>
          <h2 className="ml-2">
            {typeof networkInfo.strength === "number" ? `${networkInfo.strength}%` : networkInfo.strength}
          </h2>
        </div>
      </div>

      <div className="my-2">
        <button
          className="flex items-center justify-center px-3 py-3 text-sm border-2 border-white rounded-lg bg-emerald-900 hover:bg-emerald-300 transition"
          style={{ width: "280px" }}
          onClick={fetchNetworkStrength}
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