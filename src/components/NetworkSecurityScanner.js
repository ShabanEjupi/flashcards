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
      if (progress === 20) {
        discoverDevice('Smart Camera', '192.168.1.101', ['80', '443', '8080'], ['http', 'https', 'rtsp']);
      } else if (progress === 30) {
        discoverDevice('Smart Thermostat', '192.168.1.102', ['80', '1883'], ['http', 'mqtt']);
      } else if (progress === 40) {
        discoverDevice('Smart Light Hub', '192.168.1.103', ['80', '23'], ['http', 'telnet']);
      } else if (progress === 60) {
        discoverDevice('Voice Assistant', '192.168.1.104', ['80', '443', '5683'], ['http', 'https', 'coap']);
      } else if (progress === 80) {
        discoverDevice('Security System', '192.168.1.105', ['80', '443', '1883', '5683'], ['http', 'https', 'mqtt', 'coap']);
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
    </div>
  );
};

export default NetworkSecurityScanner;