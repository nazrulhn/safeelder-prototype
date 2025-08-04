import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Phone, MessageSquare, Users, Shield, TriangleAlert as AlertTriangle, FileText } from 'lucide-react-native';
import { ActivityLogItem as ActivityItem } from '@/hooks/useScamDetection';

interface ActivityLogItemProps {
  activity: ActivityItem;
}

export function ActivityLogItem({ activity }: ActivityLogItemProps) {
  const getIconForType = () => {
    switch (activity.type) {
      case 'call':
        return <Phone size={20} color="#6b7280" />;
      case 'sms':
        return <MessageSquare size={20} color="#6b7280" />;
      case 'whatsapp':
      case 'messenger':
        return <Users size={20} color="#6b7280" />;
      case 'manual':
        return <FileText size={20} color="#6b7280" />;
      default:
        return <AlertTriangle size={20} color="#6b7280" />;
    }
  };

  const getActionColor = () => {
    switch (activity.action) {
      case 'blocked':
        return '#dc2626';
      case 'reported':
        return '#ea580c';
      case 'detected':
        return '#2563eb';
      default:
        return '#6b7280';
    }
  };

  const getActionIcon = () => {
    switch (activity.action) {
      case 'blocked':
        return <Shield size={16} color={getActionColor()} />;
      case 'reported':
        return <AlertTriangle size={16} color={getActionColor()} />;
      default:
        return <FileText size={16} color={getActionColor()} />;
    }
  };

  const getSeverityBadgeColor = () => {
    switch (activity.severity) {
      case 'high':
        return '#dc2626';
      case 'medium':
        return '#ea580c';
      case 'low':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.typeInfo}>
          {getIconForType()}
          <Text style={styles.source}>{activity.source}</Text>
        </View>
        <View style={styles.badges}>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityBadgeColor() }]}>
            <Text style={styles.severityText}>{activity.severity.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.details}>{activity.details}</Text>
        <View style={styles.footer}>
          <View style={styles.actionInfo}>
            {getActionIcon()}
            <Text style={[styles.actionText, { color: getActionColor() }]}>
              {activity.action.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.timestamp}>
            {activity.timestamp.toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  source: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  severityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    gap: 12,
  },
  details: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 14,
    color: '#9ca3af',
  },
});