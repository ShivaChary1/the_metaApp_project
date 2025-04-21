import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts';

const RoomsTab = ({ space, users }) => {
  const miniMapRef = useRef(null);

  useEffect(() => {
    if (miniMapRef.current) {
      const miniMapChart = echarts.init(miniMapRef.current);
      const option = {
        animation: false,
        grid: { left: 5, right: 5, top: 5, bottom: 5 },
        xAxis: { type: 'value', min: 0, max: 100, show: false },
        yAxis: { type: 'value', min: 0, max: 100, show: false },
        series: [
          {
            type: 'scatter',
            symbolSize: 12,
            data: users.map((u) => [u.position.x, u.position.y]),
            itemStyle: { color: '#4F46E5' },
          },
        ],
      };
      miniMapChart.setOption(option);
      return () => miniMapChart.dispose();
    }
  }, [users]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200">
        <div className="text-sm font-medium text-gray-700">Rooms</div>
      </div>
      <div className="p-3 border-b border-gray-200">
        <div className="w-full h-40 bg-gray-100 rounded-lg" ref={miniMapRef}></div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">
              <i className="fas fa-door-open"></i>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-800">{space.name}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-xs text-gray-500 mr-3">
              <i className="fas fa-user-friends mr-1"></i>
              {space.currentUsers.length}
            </div>
            <button className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded cursor-pointer !rounded-button whitespace-nowrap">
              Joined
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RoomsTab.propTypes = {
  space: PropTypes.shape({
    name: PropTypes.string,
    currentUsers: PropTypes.array,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    })
  ).isRequired,
};

export default RoomsTab;