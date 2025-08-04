import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings as SettingsIcon, Users, Globe, Bell, Shield, CircleHelp as HelpCircle, ChevronRight, Phone, Mail } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import { SettingsCard } from '@/components/SettingsCard';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function SettingsScreen() {
  const { t, currentLanguage } = useLanguage();
  const [protectionEnabled, setProtectionEnabled] = useState(true);
  const [caregiverNotifications, setCaregiverNotifications] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [vibrationAlerts, setVibrationAlerts] = useState(true);

  const handleCaregiverSetup = () => {
    Alert.alert(
      t('caregiverSetup'),
      t('caregiverSetupMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('setup'), onPress: () => console.log('Navigate to caregiver setup') }
      ]
    );
  };

  const handleEmergencyContacts = () => {
    Alert.alert(
      t('emergencyContacts'),
      t('emergencyContactsMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        { text: t('manage'), onPress: () => console.log('Navigate to emergency contacts') }
      ]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      t('help'),
      t('helpMessage'),
      [
        { text: t('ok') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <SettingsIcon size={32} color="#2563eb" />
            <Text style={styles.title}>{t('settings')}</Text>
          </View>
          <Text style={styles.subtitle}>{t('configureApp')}</Text>
        </View>

        {/* Protection Settings */}
        <SettingsCard title={t('protection')} icon={Shield}>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('scamProtection')}</Text>
              <Text style={styles.settingDescription}>{t('scamProtectionDesc')}</Text>
            </View>
            <Switch
              value={protectionEnabled}
              onValueChange={setProtectionEnabled}
              trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
              thumbColor={protectionEnabled ? '#ffffff' : '#ffffff'}
            />
          </View>
        </SettingsCard>

        {/* Language Settings */}
        <SettingsCard title={t('language')} icon={Globe}>
          <LanguageSelector />
        </SettingsCard>

        {/* Caregiver Settings */}
        <SettingsCard title={t('caregiver')} icon={Users}>
          <TouchableOpacity style={styles.settingRow} onPress={handleCaregiverSetup}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('setupCaregiver')}</Text>
              <Text style={styles.settingDescription}>{t('setupCaregiverDesc')}</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
          
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('caregiverNotifications')}</Text>
              <Text style={styles.settingDescription}>{t('caregiverNotificationsDesc')}</Text>
            </View>
            <Switch
              value={caregiverNotifications}
              onValueChange={setCaregiverNotifications}
              trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
              thumbColor={caregiverNotifications ? '#ffffff' : '#ffffff'}
            />
          </View>

          <TouchableOpacity style={styles.settingRow} onPress={handleEmergencyContacts}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('emergencyContacts')}</Text>
              <Text style={styles.settingDescription}>{t('emergencyContactsDesc')}</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
        </SettingsCard>

        {/* Notification Settings */}
        <SettingsCard title={t('notifications')} icon={Bell}>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('soundAlerts')}</Text>
              <Text style={styles.settingDescription}>{t('soundAlertsDesc')}</Text>
            </View>
            <Switch
              value={soundAlerts}
              onValueChange={setSoundAlerts}
              trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
              thumbColor={soundAlerts ? '#ffffff' : '#ffffff'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('vibrationAlerts')}</Text>
              <Text style={styles.settingDescription}>{t('vibrationAlertsDesc')}</Text>
            </View>
            <Switch
              value={vibrationAlerts}
              onValueChange={setVibrationAlerts}
              trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
              thumbColor={vibrationAlerts ? '#ffffff' : '#ffffff'}
            />
          </View>
        </SettingsCard>

        {/* Support */}
        <SettingsCard title={t('support')} icon={HelpCircle}>
          <TouchableOpacity style={styles.settingRow} onPress={handleHelp}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('help')}</Text>
              <Text style={styles.settingDescription}>{t('helpDesc')}</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('contactSupport')}</Text>
              <Text style={styles.settingDescription}>{t('contactSupportDesc')}</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
        </SettingsCard>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>SafeElder v1.0.0</Text>
          <Text style={styles.appDescription}>{t('appDescription')}</Text>
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
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appVersion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
  },
});