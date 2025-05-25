import React, { useState, useEffect, useRef } from 'react';
import { logger } from '../utils/logger';

const IoTSecuritySimulator = () => {
  const [simulationMode, setSimulationMode] = useState('insecure');
  const [protocol, setProtocol] = useState('mqtt'); // Add protocol state: 'mqtt' or 'coap'
  const [running, setRunning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [capturedData, setCapturedData] = useState([]);
  const [temperature, setTemperature] = useState(22.5);
  const [humidity, setHumidity] = useState(45);
  const [brokerStatus, setBrokerStatus] = useState('disconnected');
  const [attackMode, setAttackMode] = useState(null); // null, 'mitm', 'replay', 'dos'
  const [showCertificates, setShowCertificates] = useState(false);
  const [authFlow, setAuthFlow] = useState(null); // null, 'requesting', 'authenticated'
  const [authToken, setAuthToken] = useState(null);
  const simulationRef = useRef(null);
  
  // Generate random sensor data
  const generateSensorData = () => {
    // Simulate temperature fluctuations
    const newTemp = Math.max(15, Math.min(35, temperature + (Math.random() - 0.5) * 2));
    setTemperature(parseFloat(newTemp.toFixed(1)));
    
    // Simulate humidity fluctuations
    const newHumidity = Math.max(30, Math.min(70, humidity + (Math.random() - 0.5) * 5));
    setHumidity(parseFloat(newHumidity.toFixed(1)));
    
    return {
      temperature: newTemp,
      humidity: newHumidity,
      timestamp: new Date().toISOString(),
      deviceId: 'sensor001',
      batteryLevel: Math.floor(Math.random() * 20) + 80, // 80-100%
    };
  };
  
  // Simulate MQTT message transmission
  const simulateMessageTransmission = (data) => {
    const newMessage = {
      id: messages.length + 1,
      topic: protocol === 'mqtt' ? 'sensors/environment' : '/sensors/environment',
      payload: JSON.stringify(data),
      qos: protocol === 'mqtt' ? 1 : null,
      protocol: protocol,
      timestamp: new Date().toISOString(),
      secure: simulationMode === 'secure'
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // In insecure mode, an attacker can capture the data
    if (simulationMode === 'insecure') {
      setTimeout(() => {
        setCapturedData(prev => [...prev, {
          id: capturedData.length + 1,
          capturedAt: new Date().toISOString(),
          data: JSON.stringify(data),
          source: protocol === 'mqtt' ? 'MQTT Sniffer' : 'CoAP Interceptor',
          method: 'Passive network monitoring',
          protocol: protocol
        }]);
      }, 800);
    }
  };
  
  // Start the simulation
  const startSimulation = () => {
    setBrokerStatus('connected');
    setRunning(true);
    
    // Clear previous simulation if any
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
    }
    
    // Run simulation with interval
    simulationRef.current = setInterval(() => {
      const data = generateSensorData();
      simulateMessageTransmission(data);
    }, 3000);
  };
  
  // Stop the simulation
  const stopSimulation = () => {
    setRunning(false);
    setBrokerStatus('disconnected');
    
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
    }
  };
  
  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, []);
  
  // Reset data when changing simulation mode
  const changeSimulationMode = (mode) => {
    stopSimulation();
    setSimulationMode(mode);
    setMessages([]);
    setCapturedData([]);
    logger.info(`Simulation mode changed to: ${mode}`);
  };
  
  // Reset data when changing protocol or security mode
  const changeProtocol = (newProtocol) => {
    stopSimulation();
    setProtocol(newProtocol);
    setMessages([]);
    setCapturedData([]);
    logger.info(`Protocol changed to: ${newProtocol}`);
  };
  
  // Helper to display the message payload based on the security mode
  const displayMessagePayload = (message) => {
    if (message.secure) {
      return '***ENCRYPTED DATA***';
    } else {
      return message.payload;
    }
  };
  
  // Helper to display protocol-specific info
  const getProtocolInfo = () => {
    if (protocol === 'mqtt') {
      return {
        name: 'MQTT',
        securePort: 8883,
        insecurePort: 1883,
        secureProtocol: 'TLS',
        clientLib: 'paho.mqtt.client'
      };
    } else {
      return {
        name: 'CoAP',
        securePort: 5684,
        insecurePort: 5683,
        secureProtocol: 'DTLS',
        clientLib: 'aiocoap'
      };
    }
  };
  
  const protocolInfo = getProtocolInfo();
  
  return (
    <div className="iot-simulator-container">
      <h2>IoT Security Simulator</h2>
      
      <div className="simulator-controls">
        <div className="mode-selector">
          <h3>Protocol & Security Mode</h3>
          <div className="protocol-selector">
            <button 
              className={protocol === 'mqtt' ? 'active' : ''} 
              onClick={() => changeProtocol('mqtt')}
              disabled={running}
            >
              MQTT Protocol
            </button>
            <button 
              className={protocol === 'coap' ? 'active' : ''} 
              onClick={() => changeProtocol('coap')}
              disabled={running}
            >
              CoAP Protocol
            </button>
          </div>
          <div className="security-modes">
            <button 
              className={simulationMode === 'insecure' ? 'active' : ''} 
              onClick={() => changeSimulationMode('insecure')}
              disabled={running}
            >
              Insecure {protocolInfo.name} (Port {protocolInfo.insecurePort})
            </button>
            <button 
              className={simulationMode === 'secure' ? 'active' : ''} 
              onClick={() => changeSimulationMode('secure')}
              disabled={running}
            >
              Secure {protocolInfo.name} with {protocolInfo.secureProtocol} (Port {protocolInfo.securePort})
            </button>
          </div>
        </div>
        
        <div className="simulation-controls">
          <h3>Simulation Control</h3>
          <div className="control-buttons">
            {!running ? (
              <button className="start-btn" onClick={startSimulation}>
                Start Simulation
              </button>
            ) : (
              <button className="stop-btn" onClick={stopSimulation}>
                Stop Simulation
              </button>
            )}
          </div>
          <div className="broker-status">
            Broker Status: <span className={`status-${brokerStatus}`}>{brokerStatus}</span>
          </div>
        </div>
      </div>
      
      <div className="attack-controls">
        <h3>Attack Simulation</h3>
        <div className="attack-buttons">
          <button 
            className={attackMode === 'mitm' ? 'active' : ''} 
            onClick={() => setAttackMode(attackMode === 'mitm' ? null : 'mitm')}
            disabled={!running || simulationMode === 'secure'}
          >
            Man-in-the-Middle
          </button>
          <button 
            className={attackMode === 'replay' ? 'active' : ''} 
            onClick={() => setAttackMode(attackMode === 'replay' ? null : 'replay')}
            disabled={!running}
          >
            Replay Attack
          </button>
          <button 
            className={attackMode === 'dos' ? 'active' : ''} 
            onClick={() => setAttackMode(attackMode === 'dos' ? null : 'dos')}
            disabled={!running}
          >
            Denial of Service
          </button>
        </div>
      </div>
      
      <div className="simulation-environment">
        <div className="iot-device">
          <h3>IoT Sensor Device</h3>
          <div className="sensor-readings">
            <div className="sensor-reading">
              <span className="reading-label">Temperature:</span>
              <span className="reading-value">{temperature}°C</span>
            </div>
            <div className="sensor-reading">
              <span className="reading-label">Humidity:</span>
              <span className="reading-value">{humidity}%</span>
            </div>
          </div>
          <div className="device-code">
            <h4>Device Python Code:</h4>
            <pre>
              {protocol === 'mqtt' ? 
                (simulationMode === 'insecure' ? 
                  `# Insecure MQTT Connection
import paho.mqtt.client as mqtt
import json, time, random

# Connect to broker without TLS
client = mqtt.Client()
client.connect("test.mosquitto.org", 1883, 60)

# Publish plaintext data
while True:
    data = {
        "temperature": round(20 + random.random()*10, 2),
        "humidity": round(40 + random.random()*20, 2),
        "deviceId": "sensor001",
        "timestamp": time.time()
    }
    # Data sent as plaintext
    client.publish("sensors/environment", 
                   json.dumps(data))
    time.sleep(3)` :
                
                `# Secure MQTT Connection with TLS
import paho.mqtt.client as mqtt
import json, time, random

# Setup TLS connection
client = mqtt.Client()
client.tls_set(
    ca_certs="ca.crt",
    certfile="client.crt",
    keyfile="client.key"
)

# Connect to secure port
client.connect("test.mosquitto.org", 8883, 60)

# Publish encrypted data
while True:
    data = {
        "temperature": round(20 + random.random()*10, 2),
        "humidity": round(40 + random.random()*20, 2),
        "deviceId": "sensor001",
        "timestamp": time.time()
    }
    # Data encrypted with TLS
    client.publish("sensors/environment", 
                   json.dumps(data))
    time.sleep(3)`) : 
                
                // CoAP code examples
                (simulationMode === 'insecure' ? 
                `# Insecure CoAP Connection
import asyncio
import json, time, random
from aiocoap import Context, Message
import aiocoap.numbers.codes as codes

async def send_data():
    # Create client context without DTLS
    client = await Context.create_client_context()
    
    while True:
        data = {
            "temperature": round(20 + random.random()*10, 2),
            "humidity": round(40 + random.random()*20, 2),
            "deviceId": "sensor001",
            "timestamp": time.time()
        }
        
        # Create CoAP message
        payload = json.dumps(data).encode('utf8')
        request = Message(code=codes.PUT,
                          payload=payload,
                          uri='coap://coap.example.org:5683/sensors/environment')
        
        # Send plaintext data
        try:
            response = await client.request(request).response
            print(f"Result: {response.code}")
        except Exception as e:
            print(f"Error: {e}")
            
        await asyncio.sleep(3)

if __name__ == "__main__":
    asyncio.run(send_data())` :
                
                `# Secure CoAP Connection with DTLS
import asyncio
import json, time, random
from aiocoap import Context, Message
import aiocoap.numbers.codes as codes
from aiocoap.credentials import DTLSCredentials

async def send_data():
    # Create secure client context with DTLS
    client_credentials = DTLSCredentials(
        private_key_file="client.key",
        certificate_file="client.crt",
        ca_file="ca.crt"
    )
    
    client = await Context.create_client_context(client_credentials)
    
    while True:
        data = {
            "temperature": round(20 + random.random()*10, 2),
            "humidity": round(40 + random.random()*20, 2),
            "deviceId": "sensor001",
            "timestamp": time.time()
        }
        
        # Create CoAP message with DTLS
        payload = json.dumps(data).encode('utf8')
        request = Message(code=codes.PUT,
                          payload=payload,
                          uri='coaps://coap.example.org:5684/sensors/environment')
        
        # Send encrypted data
        try:
            response = await client.request(request).response
            print(f"Result: {response.code}")
        except Exception as e:
            print(f"Error: {e}")
            
        await asyncio.sleep(3)

if __name__ == "__main__":
    asyncio.run(send_data())`)
              }
            </pre>
          </div>
        </div>
        
        <div className="network-traffic">
          <h3>{protocolInfo.name} Messages</h3>
          <div className="message-list">
            {messages.length === 0 ? (
              <p className="no-messages">No messages sent yet. Start the simulation to see {protocolInfo.name} traffic.</p>
            ) : (
              messages.map(message => (
                <div key={message.id} className={`message ${message.secure ? 'secure' : 'insecure'}`}>
                  <div className="message-header">
                    <span className="message-topic">{message.topic}</span>
                    <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="message-content">
                    {displayMessagePayload(message)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="attacker-view">
          <h3>Attacker's View (Sniffer)</h3>
          <div className="attacker-code">
            <h4>Attacker Python Code:</h4>
            <pre>
              {protocol === 'mqtt' ? 
                `# Network Sniffer for MQTT
from scapy.all import *
from scapy.layers.mqtt import *

def packet_callback(packet):
    if packet.haslayer(TCP) and packet.haslayer(Raw):
        if packet[TCP].dport == 1883 or packet[TCP].sport == 1883:
            try:
                # Try to parse as MQTT
                mqtt_packet = MQTT(packet[Raw].load)
                if mqtt_packet.type == 3:  # PUBLISH
                    print(f"Captured MQTT PUBLISH: {mqtt_packet.value}")
            except:
                pass

# Start sniffing
print("Starting MQTT sniffer...")
sniff(filter="tcp port 1883", prn=packet_callback)` :
                
                `# Network Sniffer for CoAP
from scapy.all import *
from scapy.contrib.coap import CoAP

def packet_callback(packet):
    if packet.haslayer(UDP) and packet.haslayer(Raw):
        if packet[UDP].dport == 5683 or packet[UDP].sport == 5683:
            try:
                # Try to parse as CoAP
                coap_packet = CoAP(packet[Raw].load)
                if coap_packet.code == 2:  # POST or PUT
                    print(f"Captured CoAP message: {coap_packet.payload}")
            except:
                pass

# Start sniffing
print("Starting CoAP sniffer...")
sniff(filter="udp port 5683", prn=packet_callback)`
              }
            </pre>
          </div>
          <div className="captured-data">
            <h4>Captured Data:</h4>
            {capturedData.length === 0 ? (
              <p className="no-data">{simulationMode === 'secure' ? 
                'Unable to capture encrypted data with TLS.' : 
                'No data captured yet. Start the simulation.'}</p>
            ) : (
              capturedData.map(item => (
                <div key={item.id} className="captured-item">
                  <div className="capture-header">
                    <span className="capture-time">{new Date(item.capturedAt).toLocaleTimeString()}</span>
                    <span className="capture-source">{item.source}</span>
                  </div>
                  <div className="capture-content">
                    {item.data}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <div className="security-explanation">
        <h3>IoT Security Explanation</h3>
        <div className="explanation-content">
          <div>
            <h4>{protocolInfo.name} Security Issues</h4>
            <p>
              {protocol === 'mqtt' ? 
                `MQTT (Message Queuing Telemetry Transport) is a lightweight protocol commonly used in IoT devices. 
                By default, MQTT (port 1883) transmits data in plaintext, making it vulnerable to eavesdropping attacks.` :
                
                `CoAP (Constrained Application Protocol) is designed for resource-constrained IoT devices.
                By default, CoAP (port 5683) operates over UDP without encryption, making all data visible to network attackers.`
              }
            </p>
            
            <h4>Security Measures</h4>
            <ul>
              <li><strong>{protocolInfo.secureProtocol} Encryption:</strong> Using {protocolInfo.name} over {protocolInfo.secureProtocol} (port {protocolInfo.securePort}) encrypts all communication.</li>
              <li><strong>Mutual Authentication:</strong> Both client and server authenticate each other with certificates.</li>
              <li><strong>Certificate Authority (CA):</strong> Trusted third party that issues certificates.</li>
              {protocol === 'mqtt' && <li><strong>Access Control Lists (ACLs):</strong> Restrict which clients can publish/subscribe to specific topics.</li>}
            </ul>
          </div>
          
          <div>
            <h4>STRIDE Threat Model</h4>
            <ul>
              <li><strong>Spoofing:</strong> Attacker impersonates legitimate device</li>
              <li><strong>Tampering:</strong> Modification of data in transit</li>
              <li><strong>Repudiation:</strong> Denial of having sent/received messages</li>
              <li><strong>Information Disclosure:</strong> Exposure of sensitive data</li>
              <li><strong>Denial of Service:</strong> Making service unavailable</li>
              <li><strong>Elevation of Privilege:</strong> Gaining unauthorized access</li>
            </ul>
            
            <h4>Additional Security Best Practices</h4>
            <ul>
              <li>Implement network segmentation (VLANs)</li>
              <li>Use ARM PSA or Zephyr RTOS Security Framework</li>
              <li>Apply secure boot and firmware updates</li>
              <li>Implement message payload encryption</li>
              <li>Use OAuth2.0/JWT for device authentication</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="certificate-manager">
        <button onClick={() => setShowCertificates(!showCertificates)}>
          {showCertificates ? 'Hide Certificates' : 'Show Certificates'}
        </button>
        
        {showCertificates && (
          <div className="certificate-view">
            <div className="certificate">
              <h4>CA Certificate</h4>
              <pre>
                -----BEGIN CERTIFICATE-----
                MIIDFTCCAf2gAwIBAgIJAK5X2yZ5Tu6pMA0GCSqGSIb3DQEBCwUAMB0xGzAZBgNV
                BAMMEnRlc3QubW9zcXVpdHRvLm9yZzAeFw0yMDAyMTcxMzMzMDFaFw0yNTAyMTUx
                ...
                -----END CERTIFICATE-----
              </pre>
            </div>
            <div className="certificate">
              <h4>Device Certificate</h4>
              <pre>
                -----BEGIN CERTIFICATE-----
                MIIDDzCCAfegAwIBAgIUBY0JziYfZcJZtNRQHFsSdIgUqY8wDQYJKoZIhvcNAQEL
                BQAwFDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTIzMDUyNTA2MDk0M1oXDTI0MDUy
                ...
                -----END CERTIFICATE-----
              </pre>
            </div>
          </div>
        )}
      </div>
      
      <NetworkTopology simulationMode={simulationMode} />
      
      {/* Add the STRIDE model visualization component */}
      <StrideModelVisualization protocol={protocol} securityMode={simulationMode} />
      
      <div className="auth-flow">
        <h3>Authentication Flow</h3>
        <div className="auth-visualization">
          <div className={`auth-step ${authFlow === 'requesting' ? 'active' : ''}`}>
            <h4>1. Request Token</h4>
            <pre>
              POST /oauth/token
              {JSON.stringify({
                "client_id": "sensor001",
                "client_secret": "******",
                "grant_type": "client_credentials",
                "scope": "publish"
              }, null, 2)}
            </pre>
            {!authFlow && (
              <button onClick={() => {
                setAuthFlow('requesting');
                setTimeout(() => {
                  setAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
                  setAuthFlow('authenticated');
                }, 2000);
              }}>
                Request Token
              </button>
            )}
          </div>
          
          <div className={`auth-step ${authFlow === 'authenticated' ? 'active' : ''}`}>
            <h4>2. Receive Token</h4>
            {authToken && (
              <pre>
                {JSON.stringify({
                  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  "token_type": "Bearer",
                  "expires_in": 3600,
                  "scope": "publish"
                }, null, 2)}
              </pre>
            )}
          </div>
          
          <div className={`auth-step ${authFlow === 'authenticated' ? 'active' : ''}`}>
            <h4>3. Connect with Token</h4>
            {authToken && (
              <pre>
                client.username_pw_set(
                  username="unused", 
                  password="{authToken}"
                )
              </pre>
            )}
          </div>
        </div>
        
        {authFlow === 'authenticated' && (
          <button onClick={() => {
            setAuthFlow(null);
            setAuthToken(null);
          }}>
            Reset Flow
          </button>
        )}
      </div>
      
      <SecurityDashboard simulationMode={simulationMode} />
    </div>
  );
};

const SecurityDashboard = ({ simulationMode }) => {
  return (
    <div className="security-dashboard">
      <h3>Security Monitoring</h3>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Message Encryption</h4>
          <div className={`metric-value ${simulationMode === 'secure' ? 'secure' : 'insecure'}`}>
            {simulationMode === 'secure' ? 'Encrypted (TLS)' : 'Plaintext'}
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-gauge">
            <svg width="100" height="100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#ddd" strokeWidth="10" />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke={simulationMode === 'secure' ? '#4caf50' : '#f44336'} 
                strokeWidth="10" 
                strokeDasharray={`${simulationMode === 'secure' ? 283 : 141} 283`} 
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="55" textAnchor="middle" fontSize="20">
                {simulationMode === 'secure' ? '100%' : '50%'}
              </text>
            </svg>
          </div>
          <h4>Security Score</h4>
        </div>
      </div>
    </div>
  );
};

const NetworkTopology = ({ simulationMode }) => {
  return (
    <div className="network-topology">
      <h3>Network Architecture</h3>
      <svg width="600" height="300" className="topology-diagram">
        {/* IoT Device */}
        <rect x="50" y="120" width="80" height="60" rx="5" className="device-node" />
        <text x="90" y="150" textAnchor="middle">IoT Device</text>
        
        {/* Edge Gateway */}
        <rect x="260" y="120" width="80" height="60" rx="5" className="gateway-node" />
        <text x="300" y="150" textAnchor="middle">Edge Gateway</text>
        
        {/* Cloud Server */}
        <rect x="470" y="120" width="80" height="60" rx="5" className="cloud-node" />
        <text x="510" y="150" textAnchor="middle">Cloud Server</text>
        
        {/* Connection Lines */}
        <line x1="130" y1="150" x2="260" y2="150" className={`connection ${simulationMode === 'secure' ? 'secure' : 'insecure'}`} />
        <line x1="340" y1="150" x2="470" y2="150" className={`connection ${simulationMode === 'secure' ? 'secure' : 'insecure'}`} />
        
        {/* Attacker */}
        {simulationMode === 'insecure' && (
          <>
            <rect x="190" y="50" width="60" height="40" rx="5" className="attacker-node" />
            <text x="220" y="75" textAnchor="middle">Attacker</text>
            <line x1="220" y1="90" x2="220" y2="150" className="attack-vector" strokeDasharray="5,5" />
          </>
        )}
      </svg>
    </div>
  );
};

// Add this component at the bottom of your IoTSecuritySimulator
const StrideModelVisualization = ({ protocol, securityMode }) => {
  const getProtectionLevel = (threat) => {
    if (securityMode === 'secure') {
      // Different protection levels based on protocol and threat
      const protectionMap = {
        mqtt: {
          spoofing: 'high',      // TLS with client certs prevents spoofing
          tampering: 'high',     // TLS prevents modification
          repudiation: 'medium', // Depends on logging implementation
          information: 'high',   // TLS prevents eavesdropping
          denial: 'low',         // TLS doesn't prevent DoS
          elevation: 'medium'    // ACLs help but not perfect
        },
        coap: {
          spoofing: 'high',      // DTLS with client certs prevents spoofing
          tampering: 'high',     // DTLS prevents modification
          repudiation: 'medium', // Same as MQTT
          information: 'high',   // DTLS prevents eavesdropping
          denial: 'low',         // DTLS doesn't prevent DoS
          elevation: 'medium'    // Similar to MQTT
        }
      };
      return protectionMap[protocol][threat];
    } else {
      return 'none'; // Insecure mode offers no protection
    }
  };
  
  return (
    <div className="stride-model">
      <h4>STRIDE Threat Model Protection</h4>
      <div className="stride-threats">
        <div className="stride-threat">
          <div className="threat-name">Spoofing</div>
          <div className={`protection-level ${getProtectionLevel('spoofing')}`}>
            {getProtectionLevel('spoofing') === 'none' ? 'Vulnerable' : 
             getProtectionLevel('spoofing') === 'low' ? 'Low Protection' :
             getProtectionLevel('spoofing') === 'medium' ? 'Medium Protection' : 'High Protection'}
          </div>
        </div>
        <div className="stride-threat">
          <div className="threat-name">Tampering</div>
          <div className={`protection-level ${getProtectionLevel('tampering')}`}>
            {getProtectionLevel('tampering') === 'none' ? 'Vulnerable' : 
             getProtectionLevel('tampering') === 'low' ? 'Low Protection' :
             getProtectionLevel('tampering') === 'medium' ? 'Medium Protection' : 'High Protection'}
          </div>
        </div>
        <div className="stride-threat">
          <div className="threat-name">Repudiation</div>
          <div className={`protection-level ${getProtectionLevel('repudiation')}`}>
            {getProtectionLevel('repudiation') === 'none' ? 'Vulnerable' : 
             getProtectionLevel('repudiation') === 'low' ? 'Low Protection' :
             getProtectionLevel('repudiation') === 'medium' ? 'Medium Protection' : 'High Protection'}
          </div>
        </div>
        <div className="stride-threat">
          <div className="threat-name">Information Disclosure</div>
          <div className={`protection-level ${getProtectionLevel('information')}`}>
            {getProtectionLevel('information') === 'none' ? 'Vulnerable' : 
             getProtectionLevel('information') === 'low' ? 'Low Protection' :
             getProtectionLevel('information') === 'medium' ? 'Medium Protection' : 'High Protection'}
          </div>
        </div>
        <div className="stride-threat">
          <div className="threat-name">Denial of Service</div>
          <div className={`protection-level ${getProtectionLevel('denial')}`}>
            {getProtectionLevel('denial') === 'none' ? 'Vulnerable' : 
             getProtectionLevel('denial') === 'low' ? 'Low Protection' :
             getProtectionLevel('denial') === 'medium' ? 'Medium Protection' : 'High Protection'}
          </div>
        </div>
        <div className="stride-threat">
          <div className="threat-name">Elevation of Privilege</div>
          <div className={`protection-level ${getProtectionLevel('elevation')}`}>
            {getProtectionLevel('elevation') === 'none' ? 'Vulnerable' : 
             getProtectionLevel('elevation') === 'low' ? 'Low Protection' :
             getProtectionLevel('elevation') === 'medium' ? 'Medium Protection' : 'High Protection'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTSecuritySimulator;