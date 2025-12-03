import React from "react";
import PropTypes from "prop-types";

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  icon: Icon,
  statIconColor,
  hoverEffect = false,
  link,              // 👈 NEW: optional link prop
  clickable = false, // 👈 NEW: makes card clickable
}) {
  
  const handleClick = () => {
    if (clickable && link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`relative flex flex-col min-w-0 break-words bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 transition-all duration-300 ${
        hoverEffect ? "hover:shadow-xl hover:-translate-y-1 hover:bg-white/15" : ""
      } ${clickable && link ? "cursor-pointer" : ""}`}
      onClick={handleClick}
      role={clickable && link ? "button" : undefined}
      tabIndex={clickable && link ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && link && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="px-6 py-5 flex-auto">
        <div className="flex items-center justify-between">
          
          {/* Icon Component */}
          <div
            className={`rounded-full ${statIconColor} shadow-lg p-3 text-white text-xl`}
          >
            {Icon && <Icon size={22} />}
          </div>
        </div>

        {/* Title */}
        <div className="mt-4">
          <h5 className="text-xs font-medium uppercase text-gray-300 tracking-wider">
            {statSubtitle}
          </h5>
          <div className="flex items-baseline">
            <span className="font-medium text-white">{statTitle}</span>
            {clickable && link && (
              <span className="ml-2 text-gray-400 text-xs">
                →
              </span>
            )}
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
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  icon: PropTypes.elementType,
  statIconColor: PropTypes.string,
  hoverEffect: PropTypes.bool,
  link: PropTypes.string,        
  clickable: PropTypes.bool,     
};