import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield, Clock } from 'lucide-react-native';

interface ProtectionStatusProps {
  isActive: boolean;
  lastChecked: Date;
}

export function ProtectionStatus({ isActive, lastChecked }: ProtectionStatusProps) {
  const getMinutesAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return diffMins;
  };

  const minutesAgo = getMinutesAgo(lastChecked);

  return (
    <View style={[
      styles.container,
      { backgroundColor: isActive ? '#dcfce7' : '#fef2f2' }
    ]}>
      <View style={styles.header}>
        <Shield 
          size={28} 
          color={isActive ? '#059669' : '#dc2626'} 
        />
        <Text style={[
          styles.status,
          { color: isActive ? '#059669' : '#dc2626' }
        ]}>
          {isActive ? 'Protection Active' : 'Protection Inactive'}
        </Text>
      </View>
      
      <View style={styles.lastChecked}>
        <Clock size={16} color="#6b7280" />
        <Text style={styles.lastCheckedText}>
          Last checked {minutesAgo} minutes ago
        </Text>
      </View>
      
      {isActive && (
        <Text style={styles.description}>
          Your device is being monitored for scam attempts across calls, messages, and social media.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  lastChecked: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  lastCheckedText: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 6,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
});