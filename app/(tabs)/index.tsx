import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, TriangleAlert as AlertTriangle, Phone, MessageSquare, Users, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useLanguage } from '@/hooks/useLanguage';
import { useScamDetection } from '@/hooks/useScamDetection';
import { AlertCard } from '@/components/AlertCard';
import { QuickActionButton } from '@/components/QuickActionButton';
import { ProtectionStatus } from '@/components/ProtectionStatus';

export default function HomeScreen() {
  const { t } = useLanguage();
  const { isActive, activeAlerts, blockNumber, reportScam } = useScamDetection();
  const [lastChecked, setLastChecked] = useState(new Date());

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleEmergencyBlock = () => {
    triggerHaptic();
    Alert.alert(
      t('confirmBlock'),
      t('confirmBlockMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('block'), 
          style: 'destructive',
          onPress: () => {
            blockNumber('current');
            Alert.alert(t('success'), t('numberBlocked'));
          }
        }
      ]
    );
  };

  const handleReportScam = () => {
    triggerHaptic();
    reportScam({
      type: 'manual',
      severity: 'high',
      timestamp: new Date(),
      details: t('manualReport')
    });
    Alert.alert(t('success'), t('scamReported'));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLastChecked(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Shield size={32} color="#2563eb" />
            <Text style={styles.title}>{t('appName')}</Text>
          </View>
          <Text style={styles.subtitle}>{t('protectingYou')}</Text>
        </View>

        {/* Protection Status */}
        <ProtectionStatus isActive={isActive} lastChecked={lastChecked} />

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('activeAlerts')}</Text>
            {activeAlerts.map((alert, index) => (
              <AlertCard key={index} alert={alert} />
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          <View style={styles.quickActions}>
            <QuickActionButton
              icon={<XCircle size={28} color="#ffffff" />}
              title={t('blockCaller')}
              subtitle={t('blockCurrentCall')}
              backgroundColor="#dc2626"
              onPress={handleEmergencyBlock}
            />
            <QuickActionButton
              icon={<AlertTriangle size={28} color="#ffffff" />}
              title={t('reportScam')}
              subtitle={t('reportSuspicious')}
              backgroundColor="#ea580c"
              onPress={handleReportScam}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('todayActivity')}</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityRow}>
              <Phone size={24} color="#059669" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{t('callsChecked')}</Text>
                <Text style={styles.activityCount}>23</Text>
              </View>
              <CheckCircle size={20} color="#059669" />
            </View>
            <View style={styles.activityRow}>
              <MessageSquare size={24} color="#059669" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{t('messagesScanned')}</Text>
                <Text style={styles.activityCount}>47</Text>
              </View>
              <CheckCircle size={20} color="#059669" />
            </View>
            <View style={styles.activityRow}>
              <Users size={24} color="#dc2626" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{t('threatsBlocked')}</Text>
                <Text style={styles.activityCount}>2</Text>
              </View>
              <AlertTriangle size={20} color="#dc2626" />
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>{t('needHelp')}</Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>{t('contactCaregiver')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityContent: {
    flex: 1,
    marginLeft: 16,
  },
  activityTitle: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '500',
  },
  activityCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  emergencySection: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 12,
    textAlign: 'center',
  },
  emergencyButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});