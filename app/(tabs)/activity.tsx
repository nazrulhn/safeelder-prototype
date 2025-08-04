import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Calendar, Filter, TriangleAlert as AlertTriangle, Shield, Phone, MessageSquare } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import { useScamDetection } from '@/hooks/useScamDetection';
import { ActivityLogItem } from '@/components/ActivityLogItem';

export default function ActivityScreen() {
  const { t } = useLanguage();
  const { activityLog } = useScamDetection();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedType, setSelectedType] = useState('all');

  const periods = [
    { id: 'today', name: t('today') },
    { id: 'week', name: t('thisWeek') },
    { id: 'month', name: t('thisMonth') },
  ];

  const types = [
    { id: 'all', name: t('allTypes'), icon: FileText },
    { id: 'blocked', name: t('blocked'), icon: Shield },
    { id: 'calls', name: t('calls'), icon: Phone },
    { id: 'messages', name: t('messages'), icon: MessageSquare },
  ];

  const getFilteredActivities = () => {
    let filtered = activityLog;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    const now = new Date();
    if (selectedPeriod === 'today') {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.timestamp);
        return itemDate.toDateString() === now.toDateString();
      });
    } else if (selectedPeriod === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(item => new Date(item.timestamp) >= weekAgo);
    } else if (selectedPeriod === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(item => new Date(item.timestamp) >= monthAgo);
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const filteredActivities = getFilteredActivities();

  const getStatsForPeriod = () => {
    const activities = getFilteredActivities();
    return {
      total: activities.length,
      blocked: activities.filter(a => a.action === 'blocked').length,
      reported: activities.filter(a => a.action === 'reported').length,
      high: activities.filter(a => a.severity === 'high').length,
    };
  };

  const stats = getStatsForPeriod();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <FileText size={32} color="#2563eb" />
          <Text style={styles.title}>{t('activityLog')}</Text>
        </View>
        <Text style={styles.subtitle}>{t('reviewProtectionHistory')}</Text>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>{t('totalEvents')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#dc2626' }]}>{stats.blocked}</Text>
          <Text style={styles.statLabel}>{t('blocked')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#ea580c' }]}>{stats.reported}</Text>
          <Text style={styles.statLabel}>{t('reported')}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#7c2d12' }]}>{stats.high}</Text>
          <Text style={styles.statLabel}>{t('highRisk')}</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.filterButton,
                selectedPeriod === period.id && styles.filterButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Calendar size={16} color={selectedPeriod === period.id ? '#ffffff' : '#6b7280'} />
              <Text style={[
                styles.filterText,
                selectedPeriod === period.id && styles.filterTextActive
              ]}>
                {period.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {types.map((type) => {
            const IconComponent = type.icon;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.filterButton,
                  selectedType === type.id && styles.filterButtonActive
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <IconComponent size={16} color={selectedType === type.id ? '#ffffff' : '#6b7280'} />
                <Text style={[
                  styles.filterText,
                  selectedType === type.id && styles.filterTextActive
                ]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Activity List */}
      <ScrollView style={styles.activityContainer} showsVerticalScrollIndicator={false}>
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <ActivityLogItem key={index} activity={activity} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Shield size={48} color="#9ca3af" />
            <Text style={styles.emptyStateTitle}>{t('noActivity')}</Text>
            <Text style={styles.emptyStateText}>{t('noActivityMessage')}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  filtersContainer: {
    marginBottom: 20,
    gap: 12,
  },
  filterRow: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  activityContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 28,
  },
});