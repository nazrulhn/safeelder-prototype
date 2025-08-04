import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ScamAlert {
  id: string;
  type: 'call' | 'sms' | 'whatsapp' | 'messenger';
  severity: 'low' | 'medium' | 'high';
  source: string;
  message: string;
  timestamp: Date;
  action?: 'blocked' | 'reported' | 'ignored';
}

export interface ActivityLogItem {
  id: string;
  type: 'call' | 'sms' | 'whatsapp' | 'messenger' | 'manual';
  severity: 'low' | 'medium' | 'high';
  source: string;
  action: 'blocked' | 'reported' | 'detected';
  timestamp: Date;
  details: string;
}

export function useScamDetection() {
  const [isActive, setIsActive] = useState(true);
  const [activeAlerts, setActiveAlerts] = useState<ScamAlert[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>([]);

  useEffect(() => {
    loadActivityLog();
    // Simulate periodic scam detection
    const interval = setInterval(() => {
      simulateScamDetection();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadActivityLog = async () => {
    try {
      const saved = await AsyncStorage.getItem('activityLog');
      if (saved) {
        const parsed = JSON.parse(saved);
        setActivityLog(parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } else {
        // Initialize with some sample data
        const sampleData: ActivityLogItem[] = [
          {
            id: '1',
            type: 'call',
            severity: 'high',
            source: '+60123456789',
            action: 'blocked',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            details: 'Suspected banking scam call detected and blocked'
          },
          {
            id: '2',
            type: 'sms',
            severity: 'medium',
            source: '+60987654321',
            action: 'reported',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
            details: 'Suspicious SMS claiming prize win'
          },
          {
            id: '3',
            type: 'whatsapp',
            severity: 'low',
            source: 'Unknown Contact',
            action: 'detected',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            details: 'Potentially suspicious message detected'
          }
        ];
        setActivityLog(sampleData);
        await AsyncStorage.setItem('activityLog', JSON.stringify(sampleData));
      }
    } catch (error) {
      console.error('Failed to load activity log:', error);
    }
  };

  const saveActivityLog = async (log: ActivityLogItem[]) => {
    try {
      await AsyncStorage.setItem('activityLog', JSON.stringify(log));
    } catch (error) {
      console.error('Failed to save activity log:', error);
    }
  };

  const simulateScamDetection = () => {
    // Simulate AI detection (in real app, this would be actual AI processing)
    const random = Math.random();
    if (random < 0.1) { // 10% chance of detecting something
      const scamTypes = ['call', 'sms', 'whatsapp', 'messenger'] as const;
      const severities = ['low', 'medium', 'high'] as const;
      
      const alert: ScamAlert = {
        id: Date.now().toString(),
        type: scamTypes[Math.floor(Math.random() * scamTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        source: `+6012${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        message: 'Suspicious activity detected by AI analysis',
        timestamp: new Date(),
      };

      setActiveAlerts(prev => [...prev, alert]);
      
      // Auto-remove alert after 30 seconds
      setTimeout(() => {
        setActiveAlerts(prev => prev.filter(a => a.id !== alert.id));
      }, 30000);
    }
  };

  const blockNumber = (source: string) => {
    const logItem: ActivityLogItem = {
      id: Date.now().toString(),
      type: 'call',
      severity: 'high',
      source: source === 'current' ? 'Current Caller' : source,
      action: 'blocked',
      timestamp: new Date(),
      details: 'Number blocked by user action'
    };
    
    const newLog = [logItem, ...activityLog];
    setActivityLog(newLog);
    saveActivityLog(newLog);
  };

  const reportScam = (scamData: Partial<ActivityLogItem>) => {
    const logItem: ActivityLogItem = {
      id: Date.now().toString(),
      type: scamData.type || 'manual',
      severity: scamData.severity || 'medium',
      source: scamData.source || 'Unknown',
      action: 'reported',
      timestamp: new Date(),
      details: scamData.details || 'Scam reported by user'
    };
    
    const newLog = [logItem, ...activityLog];
    setActivityLog(newLog);
    saveActivityLog(newLog);
  };

  return {
    isActive,
    activeAlerts,
    activityLog,
    blockNumber,
    reportScam,
    setIsActive,
  };
}