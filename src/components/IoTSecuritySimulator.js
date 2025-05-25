import React, { useState, useEffect, useRef } from 'react';
import { logger } from '../utils/logger';

const IoTSecuritySimulator = () => {
  const [simulationMode, setSimulationMode] = useState('insecure');
  const [running, setRunning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [capturedData, setCapturedData] = useState([]);
  const [temperature, setTemperature] = useState(22.5);
  const [humidity, setHumidity] = useState(45);
  const [brokerStatus, setBrokerStatus] = useState('disconnected');
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
      topic: 'sensors/environment',
      payload: JSON.stringify(data),
      qos: 1,
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
          source: 'MQTT Sniffer',
          method: 'Passive network monitoring'
        }]);
      }, 800); // Slight delay to simulate network sniffing
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
  
  // Helper to display the message payload based on the security mode
  const displayMessagePayload = (message) => {
    if (message.secure) {
      return '***ENCRYPTED DATA***';
    } else {
      return message.payload;
    }
  };
  
  return (
    <div className="iot-simulator-container">
      <h2>IoT Security Simulator</h2>
      
      <div className="simulator-controls">
        <div className="mode-selector">
          <h3>Security Mode</h3>
          <div className="security-modes">
            <button 
              className={simulationMode === 'insecure' ? 'active' : ''} 
              onClick={() => changeSimulationMode('insecure')}
              disabled={running}
            >
              Insecure MQTT (Port 1883)
            </button>
            <button 
              className={simulationMode === 'secure' ? 'active' : ''} 
              onClick={() => changeSimulationMode('secure')}
              disabled={running}
            >
              Secure MQTT with TLS (Port 8883)
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
              {simulationMode === 'insecure' ? 
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
    time.sleep(3)`
              }
            </pre>
          </div>
        </div>
        
        <div className="network-traffic">
          <h3>MQTT Messages</h3>
          <div className="message-list">
            {messages.length === 0 ? (
              <p className="no-messages">No messages sent yet. Start the simulation to see MQTT traffic.</p>
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
              {`# Network Sniffer for MQTT
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
sniff(filter="tcp port 1883", prn=packet_callback)`}
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
          <h4>MQTT Security Issues</h4>
          <p>
            MQTT (Message Queuing Telemetry Transport) is a lightweight protocol commonly used in IoT devices. 
            By default, MQTT (port 1883) transmits data in plaintext, making it vulnerable to eavesdropping attacks.
          </p>
          
          <h4>Security Measures</h4>
          <ul>
            <li><strong>TLS Encryption:</strong> Using MQTT over TLS (port 8883) encrypts all communication.</li>
            <li><strong>Mutual TLS:</strong> Both client and server authenticate each other with certificates.</li>
            <li><strong>Certificate Authority (CA):</strong> Trusted third party that issues certificates.</li>
            <li><strong>Access Control Lists (ACLs):</strong> Restrict which clients can publish/subscribe to specific topics.</li>
          </ul>
          
          <h4>Code Implementation</h4>
          <p>
            To implement secure MQTT in your IoT devices, use client certificates and connect to the TLS port (8883).
            See the secure Python code example above for implementation details.
          </p>
          
          <h4>Additional Security Best Practices</h4>
          <ul>
            <li>Use unique credentials for each device</li>
            <li>Implement network segmentation (VLANs)</li>
            <li>Monitor for unusual traffic patterns</li>
            <li>Keep firmware updated with security patches</li>
            <li>Implement message payload encryption for sensitive data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IoTSecuritySimulator;