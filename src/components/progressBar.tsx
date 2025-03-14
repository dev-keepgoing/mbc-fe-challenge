import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const totalSegments = 10; 
  const activeSegments = Math.floor(progress / 10);

  const getSegmentColor = (index: number) => {
    const percentage = (index / totalSegments) * 100;

    if (percentage < 33) {
      return `rgb(230, 0, 0)`;
    } else if (percentage < 66) {
      const mixFactor = (percentage - 33) / 33;
      return `rgb(${230 + mixFactor * (255 - 230)}, ${mixFactor * 165}, 0)`;
    } else {
      const mixFactor = (percentage - 66) / 34;
      return `rgb(${255 - mixFactor * (255 - 76)}, ${165 + mixFactor * (255 - 165)}, ${mixFactor * 50})`;
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalSegments }, (_, index) => (
        <div
          key={index}
          className="w-3 h-6 rounded-sm transition-all duration-500"
          style={{
            backgroundColor: index < activeSegments ? getSegmentColor(index) : "#e0e0e0",
          }}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
