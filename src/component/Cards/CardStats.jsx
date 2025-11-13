import React from "react";
import PropTypes from "prop-types";

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
  hoverEffect = false,
}) {
  return (
    <div
      className={`relative flex flex-col min-w-0 break-words bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 transition-all duration-300 ${
        hoverEffect ? "hover:shadow-xl hover:-translate-y-1 hover:bg-white/15" : ""
      }`}
    >
      <div className="px-6 py-5 flex-auto">
        <div className="flex items-center justify-between">
          {/* Icon */}
          <div
            className={`rounded-full ${statIconColor} shadow-lg p-3 text-white text-xl`}
          >
            <i className={statIconName}></i>
          </div>

          {/* Arrow Indicator */}
          <div
            className={`text-sm font-semibold ${
              statArrow === "up" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {statArrow === "up" ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mt-4">
          <h5 className="text-xs font-medium uppercase text-gray-300 tracking-wider">
            {statSubtitle}
          </h5>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-white">{statTitle}</span>
            <span
              className={`ml-2 text-sm font-medium ${statPercentColor} flex items-center`}
            >
              {statArrow === "up" ? "+" : "-"}{statPercent}%
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-400">{statDescripiron}</p>
        </div>
      </div>
    </div>
  );
}

CardStats.propTypes = {
  statSubtitle: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  statArrow: PropTypes.oneOf(["up", "down"]).isRequired,
  statPercent: PropTypes.string.isRequired,
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string.isRequired,
  statIconName: PropTypes.string.isRequired,
  statIconColor: PropTypes.string,
  hoverEffect: PropTypes.bool,
};