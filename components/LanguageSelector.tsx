import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { useLanguage, Language } from '@/hooks/useLanguage';

const languageNames = {
  en: 'English',
  ms: 'Bahasa Malaysia',
  zh: '中文 (Chinese)',
  ta: 'தமிழ் (Tamil)',
};

export function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      {Object.entries(languageNames).map(([code, name]) => (
        <TouchableOpacity
          key={code}
          style={styles.languageOption}
          onPress={() => changeLanguage(code as Language)}
        >
          <Text style={styles.languageName}>{name}</Text>
          {currentLanguage === code && (
            <Check size={20} color="#2563eb" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  languageName: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '500',
  },
});