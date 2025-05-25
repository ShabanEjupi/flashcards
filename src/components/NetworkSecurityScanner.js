import React, { useState, useEffect, useRef } from 'react';
import { logger } from '../utils/logger';
import ScanOptions from './ScanOptions';
import NetworkTopologyMap from './NetworkTopologyMap';

const NetworkSecurityScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState('192.168.1.0/24');
  const [scanResults, setScanResults] = useState({});
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [customRange, setCustomRange] = useState('');
  const [scanLog, setScanLog] = useState([]);
  const [scanMode, setScanMode] = useState('basic');
  const [customDevices, setCustomDevices] = useState([]);
  const [newCustomDevice, setNewCustomDevice] = useState({
    name: '',
    ipAddress: '',
    ports: '',
    services: ''
  });
  const scannerRef = useRef(null);

  // Available networks for scanning
  const availableNetworks = [
    { id: 'home', cidr: '192.168.1.0/24', name: 'Home Network' },
    { id: 'office', cidr: '10.0.0.0/24', name: 'Office Network' },
    { id: 'iot', cidr: '172.16.0.0/24', name: 'IoT Segment' },
    { id: 'custom', cidr: 'custom', name: 'Custom Range' }
  ];

  // Common IoT device vulnerabilities database
  const vulnerabilityDb = [
    { id: 'open-telnet', name: 'Open Telnet Port (23)', severity: 'high', description: 'Telnet provides unencrypted communication' },
    { id: 'weak-http', name: 'Insecure HTTP Server (80)', severity: 'medium', description: 'Using HTTP instead of HTTPS' },
    { id: 'open-mqtt', name: 'Unsecured MQTT (1883)', severity: 'high', description: 'MQTT broker with no TLS encryption' },
    { id: 'default-creds', name: 'Default Credentials', severity: 'critical', description: 'Device using factory default login' },
    { id: 'coap-no-dtls', name: 'CoAP without DTLS (5683)', severity: 'high', description: 'CoAP server without DTLS security' },
    { id: 'upnp-exposure', name: 'UPnP Exposure (1900)', severity: 'medium', description: 'UPnP service exposed to network' },
    { id: 'no-updates', name: 'No Firmware Updates', severity: 'medium', description: 'Device has outdated firmware with known CVEs' },
    { id: 'weak-encryption', name: 'Weak Encryption', severity: 'high', description: 'Using deprecated encryption algorithms' }
  ];

  // Start the network scan
  const startScan = () => {
    if (scanning) return;
    
    let targetNetwork = selectedNetwork;
    if (selectedNetwork === 'custom' && customRange) {
      targetNetwork = customRange;
    }
    
    // Clear previous results
    setDevices([]);
    setScanResults({});
    setVulnerabilities([]);
    setScanProgress(0);
    setScanLog([`[${new Date().toLocaleTimeString()}] Starting scan of ${targetNetwork}...`]);
    setScanning(true);
    
    // In a real implementation, this would use actual network scanning libraries
    // For this demo, we'll simulate the scanning process
    let progress = 0;
    scannerRef.current = setInterval(() => {
      progress += 5;
      
      // Add scan log messages
      if (progress === 10) {
        addLogMessage(`Scanning for active hosts in ${targetNetwork}`);
      } else if (progress === 25) {
        addLogMessage(`Discovered first device, starting port scan`);
      } else if (progress === 50) {
        addLogMessage(`Fingerprinting device services`);
      } else if (progress === 75) {
        addLogMessage(`Checking for common vulnerabilities`);
      }
      
      // Generate a simulated device discovery at certain points
      if (customDevices.length > 0) {
        // Use custom devices if available
        let discoveryProgress = 20;
        customDevices.forEach((device, index) => {
          if (progress === discoveryProgress) {
            discoverDevice(
              device.name, 
              device.ipAddress, 
              device.ports.split(',').map(p => p.trim()), 
              device.services.split(',').map(s => s.trim())
            );
          }
          discoveryProgress += 15; // Space out discoveries
        });
      } else {
        // Use default random device types if no custom devices
        if (progress === 20) {
          const randomDevices = [
            { name: 'Smart TV', ports: ['80', '443', '8008'], services: ['http', 'https', 'upnp'] },
            { name: 'Gaming Console', ports: ['80', '443', '3074'], services: ['http', 'https', 'gaming'] },
            { name: 'Network Printer', ports: ['80', '443', '631'], services: ['http', 'https', 'ipp'] }
          ];
          const randomDevice = randomDevices[Math.floor(Math.random() * randomDevices.length)];
          const randomIP = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
          discoverDevice(randomDevice.name, randomIP, randomDevice.ports, randomDevice.services);
        } 
        // Continue with more random devices at other progress points
      }
      
      setScanProgress(progress);
      
      // Finish scan at 100%
      if (progress >= 100) {
        clearInterval(scannerRef.current);
        setScanning(false);
        addLogMessage(`Scan completed. Found ${devices.length} devices with ${vulnerabilities.length} potential vulnerabilities.`);
      }
    }, 500);
  };
  
  // Add a message to the scan log
  const addLogMessage = (message) => {
    setScanLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
  
  // Simulate discovering a device on the network
  const discoverDevice = (name, ip, ports, services) => {
    const newDevice = {
      id: `device-${devices.length + 1}`,
      name,
      ipAddress: ip,
      mac: generateRandomMAC(),
      ports: ports,
      services: services,
      lastSeen: new Date().toISOString()
    };
    
    setDevices(prev => [...prev, newDevice]);
    addLogMessage(`Discovered device: ${name} (${ip})`);
    
    // Analyze device for vulnerabilities
    const deviceVulns = analyzeDeviceVulnerabilities(newDevice);
    if (deviceVulns.length > 0) {
      setVulnerabilities(prev => [...prev, ...deviceVulns]);
      addLogMessage(`Found ${deviceVulns.length} vulnerabilities on ${name}`);
    }
  };
  
  // Generate a random MAC address for demo purposes
  const generateRandomMAC = () => {
    return Array(6).fill(0).map(() => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join(':');
  };
  
  // Analyze a device for potential vulnerabilities based on open ports and services
  const analyzeDeviceVulnerabilities = (device) => {
    const results = [];
    
    // Check for telnet
    if (device.ports.includes('23') || device.services.includes('telnet')) {
      results.push({
        deviceId: device.id,
        deviceName: device.name,
        ipAddress: device.ipAddress,
        ...vulnerabilityDb.find(v => v.id === 'open-telnet')
      });
    }
    
    // Check for insecure HTTP
    if ((device.ports.includes('80') || device.services.includes('http')) && 
        (!device.ports.includes('443') && !device.services.includes('https'))) {
      results.push({
        deviceId: device.id,
        deviceName: device.name,
        ipAddress: device.ipAddress,
        ...vulnerabilityDb.find(v => v.id === 'weak-http')
      });
    }
    
    // Check for unsecured MQTT
    if (device.ports.includes('1883') || device.services.includes('mqtt')) {
      // In a real scanner, we'd check if MQTT is actually unsecured
      results.push({
        deviceId: device.id,
        deviceName: device.name,
        ipAddress: device.ipAddress,
        ...vulnerabilityDb.find(v => v.id === 'open-mqtt')
      });
    }
    
    // Check for CoAP without DTLS
    if (device.ports.includes('5683') || device.services.includes('coap')) {
      // Check if it's using unsecured CoAP
      results.push({
        deviceId: device.id,
        deviceName: device.name,
        ipAddress: device.ipAddress,
        ...vulnerabilityDb.find(v => v.id === 'coap-no-dtls')
      });
    }
    
    return results;
  };
  
  // Stop an ongoing scan
  const stopScan = () => {
    if (scannerRef.current) {
      clearInterval(scannerRef.current);
      setScanProgress(100);
      setScanning(false);
      addLogMessage('Scan stopped by user.');
    }
  };
  
  // Handle network selection change
  const handleNetworkChange = (e) => {
    setSelectedNetwork(e.target.value);
  };
  
  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        clearInterval(scannerRef.current);
      }
    };
  }, []);

  // Define severity weights for risk calculation
  const severityWeights = {
    'critical': 10,
    'high': 7,
    'medium': 4,
    'low': 1
  };

  // Calculate risk score using the defined weights
  const calculateRiskScore = (vulnerabilities, device) => {
    return vulnerabilities
      .filter(v => v.deviceId === device.id)
      .reduce((score, vuln) => score + severityWeights[vuln.severity], 0);
  };

  // Determine risk level based on score
  const getDeviceRiskLevel = (device) => {
    const score = calculateRiskScore(vulnerabilities, device);
    if (score >= 10) return 'critical';
    if (score >= 7) return 'high';
    if (score >= 4) return 'medium';
    return 'low';
  };
  
  // Attempt to use real network capabilities where possible
  const attemptRealNetworkCapabilities = async () => {
    // Check if running as a desktop app with more permissions
    if (window.electron) {
      addLogMessage("Detected Electron environment - enhanced scanning capabilities available");
      return true;
    }
    
    // Check for WebRTC local IP detection (limited but can detect local IP)
    try {
      const pc = new RTCPeerConnection({iceServers: []});
      pc.createDataChannel("");
      let localIP = null;
      
      pc.onicecandidate = (event) => {
        if (!event.candidate) return;
        
        // Extract IP from candidate string
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
        const match = ipRegex.exec(event.candidate.candidate);
        if (match) {
          localIP = match[1];
          addLogMessage(`Detected local network: ${localIP}`);
        }
      };
      
      await pc.createOffer().then(offer => pc.setLocalDescription(offer));
      
      return !!localIP;
    } catch (error) {
      console.error("WebRTC detection failed:", error);
      return false;
    }
  };
  
  // Add a realistic packet capture visualization
  const PacketCaptureVisualization = ({ scanning, devices }) => {
    const [packets, setPackets] = useState([]);
    const [protocolFilter, setProtocolFilter] = useState('all');
    const [activeFilters, setActiveFilters] = useState({
      tcp: true, udp: true, mqtt: true, coap: true, http: true, other: true
    });

    // Generate simulated network packets every second when scanning
    useEffect(() => {
      if (!scanning) return;
      
      const packetInterval = setInterval(() => {
        const newPacket = generateSimulatedPacket();
        setPackets(prev => [...prev.slice(-50), newPacket]); // Keep last 50 packets
      }, 200);
      
      return () => clearInterval(packetInterval);
    }, [scanning]);
    
    const generateSimulatedPacket = () => {
      // Use discovered devices for more realistic traffic patterns
      if (devices && devices.length > 0) {
        // 70% chance of having a discovered device as source or destination
        if (Math.random() < 0.7) {
          const device = devices[Math.floor(Math.random() * devices.length)];
          const isSource = Math.random() < 0.5;
          
          // Generate protocol based on device services
          let protocol = 'TCP';
          if (device.services.includes('mqtt')) protocol = 'MQTT';
          else if (device.services.includes('coap')) protocol = 'CoAP';
          else if (device.services.includes('http')) protocol = 'HTTP';
          else if (device.services.includes('telnet')) protocol = 'TELNET';
          
          // Generate appropriate port based on the service
          let port = Math.floor(Math.random() * 1000) + 1;
          if (device.ports.length > 0) {
            port = device.ports[Math.floor(Math.random() * device.ports.length)];
          }
          
          return {
            id: Date.now() + Math.random(),
            timestamp: new Date().toISOString(),
            protocol,
            sourceIP: isSource ? device.ipAddress : `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
            destIP: !isSource ? device.ipAddress : `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
            sourcePort: isSource ? port : Math.floor(Math.random() * 65535) + 1,
            destPort: !isSource ? port : Math.floor(Math.random() * 65535) + 1,
            size: Math.floor(Math.random() * 1000) + 64,
            flags: protocol === 'TCP' ? ['SYN', 'ACK', 'PSH', 'FIN'][Math.floor(Math.random() * 4)] : '',
          };
        }
      }
      
      // Fall back to random packet generation
      const protocols = ['TCP', 'UDP', 'ICMP', 'ARP', 'MQTT', 'CoAP', 'HTTP'];
      const protocol = protocols[Math.floor(Math.random() * protocols.length)];
      const sourceIP = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
      const destIP = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
      const sourcePort = Math.floor(Math.random() * 65535) + 1;
      const destPort = [80, 443, 22, 23, 1883, 8883, 5683][Math.floor(Math.random() * 7)];
      const packetSize = Math.floor(Math.random() * 1000) + 64;
      
      return {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        protocol,
        sourceIP,
        destIP,
        sourcePort,
        destPort,
        size: packetSize,
        flags: protocol === 'TCP' ? ['SYN', 'ACK', 'PSH', 'FIN'][Math.floor(Math.random() * 4)] : '',
      };
    };
    
    const getDeviceName = (ip) => {
      // Look up known devices
      const knownDevice = devices.find(device => device.ipAddress === ip);
      if (knownDevice) {
        return `${knownDevice.name} (${ip})`;
      }
      
      // Common network devices
      if (ip.endsWith('.1')) return `Gateway Router (${ip})`;
      if (ip.endsWith('.255')) return `Broadcast (${ip})`;
      
      return ip; // Return just the IP if no name is found
    };
    
    const getProtocolClass = (protocol) => {
      const protocolLower = protocol.toLowerCase();
      
      // Enhanced protocol classification
      if (['mqtt', 'coap'].includes(protocolLower)) return 'protocol-iot';
      if (['http', 'https'].includes(protocolLower)) return 'protocol-web';
      if (['telnet', 'ssh'].includes(protocolLower)) return 'protocol-shell';
      if (['dns', 'dhcp'].includes(protocolLower)) return 'protocol-service';
      if (['icmp', 'arp'].includes(protocolLower)) return 'protocol-network';
      
      return `protocol-${protocolLower}`;
    };
    
    const toggleFilter = (protocol) => {
      if (protocol === 'all') {
        setActiveFilters({
          tcp: true, udp: true, mqtt: true, coap: true, http: true, other: true
        });
        setProtocolFilter('all');
      } else {
        setActiveFilters(prev => ({
          ...prev,
          [protocol]: !prev[protocol]
        }));
        setProtocolFilter('custom');
      }
    };
    
    return (
      <div className="packet-capture">
        <h3>Live Packet Capture</h3>
        <div className="packet-filters">
          <button 
            className={protocolFilter === 'all' ? 'active' : ''}
            onClick={() => setProtocolFilter('all')}
          >
            All Protocols
          </button>
          <button 
            className={protocolFilter === 'tcp' ? 'active' : ''}
            onClick={() => setProtocolFilter('tcp')}
          >
            TCP
          </button>
          <button 
            className={protocolFilter === 'udp' ? 'active' : ''}
            onClick={() => setProtocolFilter('udp')}
          >
            UDP
          </button>
          <button 
            className={protocolFilter === 'iot' ? 'active' : ''}
            onClick={() => setProtocolFilter('iot')}
          >
            IoT Protocols
          </button>
        </div>
        
        <div className="packet-table-container">
          <table className="packet-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Protocol</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Size</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {!scanning && packets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-packets">
                    Start a scan to begin capturing network traffic
                  </td>
                </tr>
              ) : packets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-packets">
                    Capturing packets...
                  </td>
                </tr>
              ) : (
                packets
                  .filter(packet => {
                    const protocolLower = packet.protocol.toLowerCase();
                    
                    if (protocolFilter === 'all') return true;
                    if (protocolFilter === 'tcp') return protocolLower === 'tcp';
                    if (protocolFilter === 'udp') return protocolLower === 'udp';
                    if (protocolFilter === 'iot') return ['mqtt', 'coap'].includes(protocolLower);
                    
                    return true;
                  })
                  .map(packet => (
                    <tr key={packet.id} className={getProtocolClass(packet.protocol)}>
                      <td>{new Date(packet.timestamp).toLocaleTimeString()}</td>
                      <td>{packet.protocol}</td>
                      <td>{getDeviceName(packet.sourceIP)}:{packet.sourcePort}</td>
                      <td>{getDeviceName(packet.destIP)}:{packet.destPort}</td>
                      <td>{packet.size} bytes</td>
                      <td>
                        {packet.protocol === 'TCP' && packet.flags ? `Flags: ${packet.flags}` : ''}
                        {packet.protocol === 'MQTT' ? 'QoS: 1, Retain: false' : ''}
                        {packet.protocol === 'CoAP' ? 'Type: Confirmable' : ''}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Add a visual donut chart to represent risk scores
  const RiskDonutChart = ({ score, maxScore = 20, size = 80 }) => {
    const percentage = Math.min((score / maxScore) * 100, 100);
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    let color = '#4caf50'; // Low risk (green)
    if (score >= 4) color = '#ffeb3b'; // Medium risk (yellow)
    if (score >= 7) color = '#ff9800'; // High risk (orange)
    if (score >= 10) color = '#f44336'; // Critical risk (red)
    
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius}
          fill="transparent"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        {/* Foreground circle */}
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
        {/* Score text */}
        <text 
          x="50%" 
          y="50%" 
          textAnchor="middle" 
          dominantBaseline="middle"
          fill={color}
          fontSize="20"
          fontWeight="bold"
        >
          {score}
        </text>
      </svg>
    );
  };

  // Render the component
  return (
    <div className="network-security-scanner">
      <h2>Network Security Scanner</h2>
      
      <div className="scanner-controls">
        <div className="network-selector">
          <label htmlFor="network-select">Select Network:</label>
          <select 
            id="network-select" 
            value={selectedNetwork} 
            onChange={handleNetworkChange}
            disabled={scanning}
          >
            {availableNetworks.map(network => (
              <option key={network.id} value={network.id === 'custom' ? 'custom' : network.cidr}>
                {network.name} {network.id !== 'custom' && `(${network.cidr})`}
              </option>
            ))}
          </select>
          
          {selectedNetwork === 'custom' && (
            <div className="custom-range-input">
              <input
                type="text"
                placeholder="192.168.1.0/24"
                value={customRange}
                onChange={(e) => setCustomRange(e.target.value)}
                disabled={scanning}
              />
            </div>
          )}
        </div>
        
        <ScanOptions 
          setScanMode={setScanMode} 
          scanMode={scanMode}
          disabled={scanning}
        />
        
        <div className="scan-actions">
          {!scanning ? (
            <button className="start-scan-button" onClick={startScan}>
              Start Scan
            </button>
          ) : (
            <button className="stop-scan-button" onClick={stopScan}>
              Stop Scan
            </button>
          )}
        </div>
      </div>
      
      {scanning && (
        <div className="scan-progress">
          <progress value={scanProgress} max="100"></progress>
          <span>{scanProgress}% Complete</span>
        </div>
      )}
      
      <div className="scanner-results">
        <div className="scanner-column">
          <NetworkTopologyMap devices={devices} vulnerabilities={vulnerabilities} />
          
          <div className="discovered-devices">
            <h3>Discovered Devices ({devices.length})</h3>
            {devices.length === 0 ? (
              <p>No devices discovered yet. Start a scan to find devices.</p>
            ) : (
              <div className="device-list">
                {devices.map(device => {
                  const riskScore = calculateRiskScore(vulnerabilities, device);
                  const riskLevel = getDeviceRiskLevel(device);
                  
                  return (
                    <div key={device.id} className={`device-card risk-${riskLevel}`}>
                      <div className="device-header">
                        <h4>{device.name}</h4>
                        <RiskDonutChart score={riskScore} />
                      </div>
                      <div className="device-details">
                        <p>IP: {device.ipAddress}</p>
                        <p>MAC: {device.mac}</p>
                        <p>Services: {device.services.join(', ')}</p>
                        <p>Ports: {device.ports.join(', ')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        <div className="scanner-column">
          <div className="vulnerabilities-section">
            <h3>Detected Vulnerabilities ({vulnerabilities.length})</h3>
            {vulnerabilities.length === 0 ? (
              <p>No vulnerabilities detected yet.</p>
            ) : (
              <div className="vulnerability-list">
                {vulnerabilities.map((vuln, index) => (
                  <div key={index} className={`vulnerability-card severity-${vuln.severity}`}>
                    <div className="vuln-header">
                      <h4>{vuln.name}</h4>
                      <span className="severity-badge">{vuln.severity}</span>
                    </div>
                    <p className="vuln-description">{vuln.description}</p>
                    <p>Affected device: {vuln.deviceName} ({vuln.ipAddress})</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <PacketCaptureVisualization scanning={scanning} devices={devices} />
        </div>
      </div>
      
      <div className="scan-log-section">
        <h3>Scan Log</h3>
        <div className="scan-log">
          {scanLog.map((log, index) => (
            <div key={index} className="log-entry">{log}</div>
          ))}
        </div>
      </div>
      
      <div className="risk-summary-dashboard">
        <h3>Risk Summary</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <h4>Vulnerable Devices</h4>
            <div className="summary-counts">
              <div className="count-item critical" 
                   title="Critical Risk Devices - Score 10+"
                   data-count={devices.filter(d => getDeviceRiskLevel(d) === 'critical').length}>
                {devices.filter(d => getDeviceRiskLevel(d) === 'critical').length}
              </div>
              <div className="count-item high" 
                   title="High Risk Devices - Score 7-9"
                   data-count={devices.filter(d => getDeviceRiskLevel(d) === 'high').length}>
                {devices.filter(d => getDeviceRiskLevel(d) === 'high').length}
              </div>
              <div className="count-item medium" title="Medium Risk Devices">
                {devices.filter(d => getDeviceRiskLevel(d) === 'medium').length}
              </div>
              <div className="count-item low" title="Low Risk Devices">
                {devices.filter(d => getDeviceRiskLevel(d) === 'low').length}
              </div>
            </div>
          </div>
          <div className="summary-card">
            <h4>Vulnerability Types</h4>
            <div className="summary-counts">
              <div className="count-item critical">{vulnerabilities.filter(v => v.severity === 'critical').length}</div>
              <div className="count-item high">{vulnerabilities.filter(v => v.severity === 'high').length}</div>
              <div className="count-item medium">{vulnerabilities.filter(v => v.severity === 'medium').length}</div>
              <div className="count-item low">{vulnerabilities.filter(v => v.severity === 'low').length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSecurityScanner;