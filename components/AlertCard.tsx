import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle, Phone, MessageSquare, Users, Shield } from 'lucide-react-native';
import { ScamAlert } from '@/hooks/useScamDetection';

interface AlertCardProps {
  alert: ScamAlert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const getIconForType = () => {
    switch (alert.type) {
      case 'call':
        return <Phone size={24} color="#ffffff" />;
      case 'sms':
        return <MessageSquare size={24} color="#ffffff" />;
      case 'whatsapp':
      case 'messenger':
        return <Users size={24} color="#ffffff" />;
      default:
        return <AlertTriangle size={24} color="#ffffff" />;
    }
  };

  const getStylesForSeverity = () => {
    switch (alert.severity) {
      case 'high':
        return {
          backgroundColor: '#dc2626',
          borderColor: '#b91c1c',
        };
      case 'medium':
        return {
          backgroundColor: '#ea580c',
          borderColor: '#c2410c',
        };
      case 'low':
        return {
          backgroundColor: '#f59e0b',
          borderColor: '#d97706',
        };
      default:
        return {
          backgroundColor: '#6b7280',
          borderColor: '#4b5563',
        };
    }
  };

  const alertStyles = getStylesForSeverity();

  return (
    <View style={[styles.container, alertStyles]}>
      <View style={styles.header}>
        {getIconForType()}
        <View style={styles.headerText}>
          <Text style={styles.alertType}>
            {alert.type.toUpperCase()} - {alert.severity.toUpperCase()} RISK
          </Text>
          <Text style={styles.timestamp}>
            {alert.timestamp.toLocaleTimeString()}
          </Text>
        </View>
        <AlertTriangle size={20} color="#ffffff" />
      </View>
      
      <Text style={styles.source}>From: {alert.source}</Text>
      <Text style={styles.message}>{alert.message}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Shield size={16} color="#ffffff" />
          <Text style={styles.actionText}>Block</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.reportButton]}>
          <AlertTriangle size={16} color="#ffffff" />
          <Text style={styles.actionText}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  alertType: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  source: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  reportButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});