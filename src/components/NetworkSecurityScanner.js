import React, { useState, useEffect, useRef } from 'react';
import { logger } from '../utils/logger';

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
  
  return (
    <div className="network-scanner-container">
      <h2>IoT Network Security Scanner</h2>
      <div className="simulator-badge">
        <span className="badge">Educational Simulator</span>
        <span className="badge-info">
          This is a simulated tool for educational purposes. For real network scanning, 
          consider tools like Nmap, Wireshark, or dedicated IoT security platforms.
        </span>
      </div>
      
      <div className="scanner-controls">
        <div className="network-selector">
          <h3>Target Network</h3>
          <select value={selectedNetwork} onChange={handleNetworkChange} disabled={scanning}>
            {availableNetworks.map(network => (
              <option key={network.id} value={network.cidr}>{network.name} ({network.cidr})</option>
            ))}
          </select>
          
          {selectedNetwork === 'custom' && (
            <div className="custom-range">
              <input 
                type="text" 
                placeholder="e.g. 192.168.0.1-20 or 10.0.0.0/24" 
                value={customRange}
                onChange={(e) => setCustomRange(e.target.value)}
                disabled={scanning}
              />
            </div>
          )}
        </div>
        
        <div className="scan-actions">
          {!scanning ? (
            <button className="start-scan" onClick={startScan}>Start Scan</button>
          ) : (
            <button className="stop-scan" onClick={stopScan}>Stop Scan</button>
          )}
        </div>
      </div>
      
      <div className="scan-progress">
        <h3>Scan Progress: {scanProgress}%</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${scanProgress}%`}}
          ></div>
        </div>
      </div>
      
      <div className="scanner-results">
        <div className="discovered-devices">
          <h3>Discovered Devices ({devices.length})</h3>
          <div className="device-list">
            {devices.length === 0 ? (
              <p className="no-devices">No devices discovered yet. Start a scan to detect IoT devices.</p>
            ) : (
              <table className="devices-table">
                <thead>
                  <tr>
                    <th>Device</th>
                    <th>IP Address</th>
                    <th>MAC Address</th>
                    <th>Open Ports</th>
                    <th>Services</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map(device => (
                    <tr key={device.id} className={vulnerabilities.some(v => v.deviceId === device.id) ? 'device-vulnerable' : ''}>
                      <td>{device.name}</td>
                      <td>{device.ipAddress}</td>
                      <td>{device.mac}</td>
                      <td>{device.ports.join(', ')}</td>
                      <td>{device.services.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        
        <div className="vulnerabilities">
          <h3>Detected Vulnerabilities ({vulnerabilities.length})</h3>
          <div className="vulnerability-list">
            {vulnerabilities.length === 0 ? (
              <p className="no-vulnerabilities">No vulnerabilities detected yet.</p>
            ) : (
              <table className="vuln-table">
                <thead>
                  <tr>
                    <th>Device</th>
                    <th>Vulnerability</th>
                    <th>Severity</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {vulnerabilities.map((vuln, index) => (
                    <tr key={index} className={`severity-${vuln.severity}`}>
                      <td>{vuln.deviceName} ({vuln.ipAddress})</td>
                      <td>{vuln.name}</td>
                      <td className={`severity-tag ${vuln.severity}`}>
                        {vuln.severity.toUpperCase()}
                      </td>
                      <td>{vuln.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        
        <div className="scan-log">
          <h3>Scan Log</h3>
          <div className="log-container">
            {scanLog.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="security-recommendations">
        <h3>Security Recommendations</h3>
        <ul className="recommendation-list">
          <li>
            <strong>Default Credentials:</strong> Change default passwords on all IoT devices
          </li>
          <li>
            <strong>Firmware Updates:</strong> Ensure all devices have the latest firmware installed
          </li>
          <li>
            <strong>Network Segmentation:</strong> Place IoT devices on a separate VLAN
          </li>
          <li>
            <strong>Disable Unused Services:</strong> Turn off telnet, UPnP, and other unnecessary services
          </li>
          <li>
            <strong>Encrypted Protocols:</strong> Use HTTPS instead of HTTP, MQTTS instead of MQTT
          </li>
        </ul>
      </div>
      
      <ScanOptions setScanMode={setScanMode} scanMode={scanMode} disabled={scanning} />
      
      {/* Add the new network topology visualization */}
      <NetworkTopologyMap devices={devices} vulnerabilities={vulnerabilities} />
      
      {/* Pass the scanning state as a prop */}
      <PacketCaptureVisualization scanning={scanning} />
      
      {/* Add educational resources */}
      <div className="educational-resources">
        <h3>Real-World Scanning Tools</h3>
        <div className="tools-grid">
          <div className="tool-card">
            <h4>Nmap</h4>
            <p>The industry standard for network discovery and security auditing</p>
            <a href="https://nmap.org/" target="_blank" rel="noopener noreferrer">Learn More</a>
          </div>
          <div className="tool-card">
            <h4>Wireshark</h4>
            <p>The world's foremost network protocol analyzer</p>
            <a href="https://www.wireshark.org/" target="_blank" rel="noopener noreferrer">Learn More</a>
          </div>
          <div className="tool-card">
            <h4>OWASP IoT Security Testing Guide</h4>
            <p>Comprehensive methodology for IoT security testing</p>
            <a href="https://owasp.org/www-project-iot-security-testing-guide/" target="_blank" rel="noopener noreferrer">Learn More</a>
          </div>
        </div>
      </div>
      
      {/* New section for adding custom devices */}
      <div className="custom-devices-section">
        <h3>Add Your Own Devices (Optional)</h3>
        <p>Add devices you actually have for a more personalized simulation</p>
        
        <div className="custom-device-form">
          <input 
            type="text" 
            placeholder="Device Name (e.g. My Router)"
            value={newCustomDevice.name}
            onChange={(e) => setNewCustomDevice({...newCustomDevice, name: e.target.value})}
            disabled={scanning}
          />
          <input 
            type="text" 
            placeholder="IP Address (e.g. 192.168.1.1)"
            value={newCustomDevice.ipAddress}
            onChange={(e) => setNewCustomDevice({...newCustomDevice, ipAddress: e.target.value})}
            disabled={scanning}
          />
          <input 
            type="text" 
            placeholder="Ports (e.g. 80, 443, 22)"
            value={newCustomDevice.ports}
            onChange={(e) => setNewCustomDevice({...newCustomDevice, ports: e.target.value})}
            disabled={scanning}
          />
          <input 
            type="text" 
            placeholder="Services (e.g. http, https, ssh)"
            value={newCustomDevice.services}
            onChange={(e) => setNewCustomDevice({...newCustomDevice, services: e.target.value})}
            disabled={scanning}
          />
          <button 
            onClick={() => {
              if (newCustomDevice.name && newCustomDevice.ipAddress) {
                setCustomDevices([...customDevices, newCustomDevice]);
                setNewCustomDevice({name: '', ipAddress: '', ports: '', services: ''});
              }
            }}
            disabled={scanning || !newCustomDevice.name || !newCustomDevice.ipAddress}
          >
            Add Device
          </button>
        </div>
        
        {customDevices.length > 0 && (
          <div className="custom-devices-list">
            <h4>Your Custom Devices:</h4>
            <ul>
              {customDevices.map((device, index) => (
                <li key={index}>
                  {device.name} ({device.ipAddress}) - 
                  Ports: {device.ports || 'Not specified'} - 
                  Services: {device.services || 'Not specified'}
                  <button 
                    onClick={() => setCustomDevices(customDevices.filter((_, i) => i !== index))}
                    disabled={scanning}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setCustomDevices([])}
              disabled={scanning}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Add a realistic packet capture visualization
const PacketCaptureVisualization = ({ scanning }) => {
  const [packets, setPackets] = useState([]);
  
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
  
  return (
    <div className="packet-capture">
      <h3>Live Packet Capture</h3>
      <div className="packet-list">
        {packets.length === 0 ? (
          <p>No packets captured. Start scanning to see network traffic.</p>
        ) : (
          <table className="packet-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Protocol</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Size</th>
                <th>Flags</th>
              </tr>
            </thead>
            <tbody>
              {packets.map(packet => (
                <tr key={packet.id} className={`protocol-${packet.protocol.toLowerCase()}`}>
                  <td>{new Date(packet.timestamp).toLocaleTimeString()}</td>
                  <td>{packet.protocol}</td>
                  <td>{packet.sourceIP}:{packet.sourcePort}</td>
                  <td>{packet.destIP}:{packet.destPort}</td>
                  <td>{packet.size} bytes</td>
                  <td>{packet.flags}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Add a network topology visualization that updates as devices are discovered
const NetworkTopologyMap = ({ devices, vulnerabilities }) => {
  return (
    <div className="network-topology-map">
      <h3>Network Topology</h3>
      <svg width="100%" height="300" className="topology-svg">
        {/* Router/Gateway */}
        <g className="gateway-node">
          <rect x="300" y="50" width="100" height="60" rx="5" fill="#f0f0f0" stroke="#333" />
          <text x="350" y="85" textAnchor="middle">Gateway Router</text>
          <text x="350" y="100" textAnchor="middle" fontSize="12">192.168.1.1</text>
        </g>
        
        {/* Connection lines to devices */}
        {devices.map((device, index) => {
          // Calculate position in a semi-circle around the gateway
          const angle = (Math.PI * (index + 1)) / (devices.length + 1);
          const x = 350 + Math.cos(angle) * 200;
          const y = 200 + Math.sin(angle) * 100;
          
          return (
            <g key={device.id} className="device-node">
              {/* Connection line */}
              <line 
                x1="350" y1="110" 
                x2={x} y2={y - 30} 
                stroke={vulnerabilities.some(v => v.deviceId === device.id) ? "#f44336" : "#666"} 
                strokeWidth="2" 
                strokeDasharray={vulnerabilities.some(v => v.deviceId === device.id) ? "5,5" : ""} 
              />
              
              {/* Device icon */}
              <rect x={x - 40} y={y - 30} width="80" height="60" rx="5" fill="#e3f2fd" stroke="#333" />
              <text x={x} y={y} textAnchor="middle">{device.name}</text>
              <text x={x} y={y + 15} textAnchor="middle" fontSize="12">{device.ipAddress}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Add options for educational scan modes with detailed explanations
const ScanOptions = ({ setScanMode, scanMode, disabled }) => {
  const scanModes = [
    { id: 'basic', name: 'Basic Scan', description: 'Identifies devices and open ports' },
    { id: 'security', name: 'Security Audit', description: 'Checks for common IoT vulnerabilities' },
    { id: 'protocol', name: 'Protocol Analysis', description: 'Analyzes communication protocols used' },
    { id: 'traffic', name: 'Traffic Analysis', description: 'Examines network traffic patterns' }
  ];
  
  return (
    <div className="scan-options">
      <h3>Scan Mode</h3>
      <div className="scan-mode-options">
        {scanModes.map(mode => (
          <div key={mode.id} className="scan-mode-option">
            <input 
              type="radio" 
              id={`mode-${mode.id}`} 
              name="scanMode" 
              value={mode.id}
              checked={scanMode === mode.id}
              onChange={() => setScanMode(mode.id)}
              disabled={disabled}
            />
            <label htmlFor={`mode-${mode.id}`}>
              <strong>{mode.name}</strong>
              <span className="scan-mode-description">{mode.description}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
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

export default NetworkSecurityScanner;