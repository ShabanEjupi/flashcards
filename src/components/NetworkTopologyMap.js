import React from 'react';

const NetworkTopologyMap = ({ devices, vulnerabilities }) => {
  // Skip implementation if no devices
  if (!devices || devices.length === 0) {
    return (
      <div className="network-topology-map">
        <h3>Network Topology Map</h3>
        <div className="empty-map">
          <p>No devices discovered yet. Start a scan to visualize network topology.</p>
        </div>
      </div>
    );
  }

  // Calculate positions for devices in a circular layout
  const calculatePositions = () => {
    const centerX = 300;
    const centerY = 200;
    const radius = 150;
    
    return devices.map((device, index) => {
      const angle = (index / devices.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      return {
        ...device,
        x,
        y,
        riskLevel: vulnerabilities
          .filter(v => v.deviceId === device.id)
          .reduce((worst, vuln) => {
            const severityRank = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
            const vulnRank = severityRank[vuln.severity] || 0;
            const worstRank = severityRank[worst] || 0;
            return vulnRank > worstRank ? vuln.severity : worst;
          }, 'low')
      };
    });
  };

  const deviceNodes = calculatePositions();
  
  // Determine if gateway exists, otherwise create a central node
  const hasGateway = devices.some(d => d.name.toLowerCase().includes('gateway') || 
                                        d.name.toLowerCase().includes('router'));
  
  return (
    <div className="network-topology-map">
      <h3>Network Topology Map</h3>
      <svg width="600" height="400" className="topology-svg">
        {/* Central node (gateway/router) */}
        <circle 
          cx="300" 
          cy="200" 
          r="30" 
          fill="#e3f2fd" 
          stroke="#2196f3" 
          strokeWidth="2" 
        />
        <text x="300" y="205" textAnchor="middle" fontSize="12">
          {hasGateway ? 'Gateway' : 'Network'}
        </text>
        
        {/* Device nodes */}
        {deviceNodes.map((device, index) => (
          <g key={device.id} className="device-node">
            <line 
              x1="300" 
              y1="200" 
              x2={device.x} 
              y2={device.y} 
              stroke="#90caf9" 
              strokeWidth="1.5" 
            />
            <circle 
              cx={device.x} 
              cy={device.y} 
              r="25" 
              fill={
                device.riskLevel === 'critical' ? '#ffcdd2' :
                device.riskLevel === 'high' ? '#ffe0b2' :
                device.riskLevel === 'medium' ? '#fff9c4' : '#e8f5e9'
              } 
              stroke={
                device.riskLevel === 'critical' ? '#f44336' :
                device.riskLevel === 'high' ? '#ff9800' :
                device.riskLevel === 'medium' ? '#ffeb3b' : '#4caf50'
              } 
              strokeWidth="2" 
            />
            <text x={device.x} y={device.y - 5} textAnchor="middle" fontSize="10">
              {device.name}
            </text>
            <text x={device.x} y={device.y + 10} textAnchor="middle" fontSize="8">
              {device.ipAddress}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default NetworkTopologyMap;