import React from "react";
import PropTypes from "prop-types";

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  icon: Icon,           // 👈 Accept a component
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
          
          {/* Icon Component */}
          <div
            className={`rounded-full ${statIconColor} shadow-lg p-3 text-white text-xl`}
          >
            {Icon && <Icon size={22} />}   {/* 👈 Render icon */}
          </div>

       
        </div>

        {/* Title */}
        <div className="mt-4">
          <h5 className="text-xs font-medium uppercase text-gray-300 tracking-wider">
            {statSubtitle}
          </h5>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-white">{statTitle}</span>
          
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
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string.isRequired,
  icon: PropTypes.elementType,       // 👈 must be a component
  statIconColor: PropTypes.string,
  hoverEffect: PropTypes.bool,
};
