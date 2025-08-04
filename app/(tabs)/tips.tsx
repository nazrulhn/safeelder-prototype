import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, ChevronRight, TriangleAlert as AlertTriangle, Phone, MessageSquare, CreditCard, Users } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import { TipCard } from '@/components/TipCard';

export default function TipsScreen() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tipCategories = [
    { id: 'all', name: t('allTips'), icon: BookOpen, color: '#2563eb' },
    { id: 'phone', name: t('phoneCalls'), icon: Phone, color: '#dc2626' },
    { id: 'messages', name: t('messages'), icon: MessageSquare, color: '#ea580c' },
    { id: 'money', name: t('moneyScams'), icon: CreditCard, color: '#7c2d12' },
    { id: 'social', name: t('socialMedia'), icon: Users, color: '#581c87' },
  ];

  const dailyTips = [
    {
      id: 1,
      category: 'phone',
      title: t('tip1Title'),
      content: t('tip1Content'),
      severity: 'high',
      examples: [t('tip1Example1'), t('tip1Example2')]
    },
    {
      id: 2,
      category: 'messages',
      title: t('tip2Title'),
      content: t('tip2Content'),
      severity: 'medium',
      examples: [t('tip2Example1'), t('tip2Example2')]
    },
    {
      id: 3,
      category: 'money',
      title: t('tip3Title'),
      content: t('tip3Content'),
      severity: 'high',
      examples: [t('tip3Example1'), t('tip3Example2')]
    },
    {
      id: 4,
      category: 'social',
      title: t('tip4Title'),
      content: t('tip4Content'),
      severity: 'medium',
      examples: [t('tip4Example1'), t('tip4Example2')]
    },
  ];

  const filteredTips = selectedCategory === 'all' 
    ? dailyTips 
    : dailyTips.filter(tip => tip.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <BookOpen size={32} color="#2563eb" />
          <Text style={styles.title}>{t('scamAwareness')}</Text>
        </View>
        <Text style={styles.subtitle}>{t('learnToStaySafe')}</Text>
      </View>

      {/* Daily Tip Highlight */}
      <View style={styles.dailyTipContainer}>
        <View style={styles.dailyTipHeader}>
          <AlertTriangle size={24} color="#f59e0b" />
          <Text style={styles.dailyTipTitle}>{t('todayTip')}</Text>
        </View>
        <View style={styles.dailyTipCard}>
          <Text style={styles.dailyTipText}>{t('todayTipContent')}</Text>
        </View>
      </View>

      {/* Category Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {tipCategories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                { 
                  backgroundColor: isSelected ? category.color : '#ffffff',
                  borderColor: category.color 
                }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <IconComponent 
                size={20} 
                color={isSelected ? '#ffffff' : category.color} 
              />
              <Text style={[
                styles.categoryText,
                { color: isSelected ? '#ffffff' : category.color }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Tips List */}
      <ScrollView style={styles.tipsContainer} showsVerticalScrollIndicator={false}>
        {filteredTips.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
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
  dailyTipContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  dailyTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dailyTipTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#92400e',
    marginLeft: 8,
  },
  dailyTipCard: {
    backgroundColor: '#fef3c7',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  dailyTipText: {
    fontSize: 18,
    color: '#92400e',
    lineHeight: 28,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tipsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});