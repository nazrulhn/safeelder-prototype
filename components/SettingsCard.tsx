import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SettingsCardProps {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}

export function SettingsCard({ title, icon: Icon, children }: SettingsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon size={24} color="#2563eb" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  content: {
    padding: 20,
  },
});