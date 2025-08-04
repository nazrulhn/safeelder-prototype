import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface Tip {
  id: number;
  category: string;
  title: string;
  content: string;
  severity: 'low' | 'medium' | 'high';
  examples: string[];
}

interface TipCardProps {
  tip: Tip;
}

export function TipCard({ tip }: TipCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = () => {
    switch (tip.severity) {
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

  const getSeverityBgColor = () => {
    switch (tip.severity) {
      case 'high':
        return '#fef2f2';
      case 'medium':
        return '#fff7ed';
      case 'low':
        return '#fefbf2';
      default:
        return '#f9fafb';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getSeverityBgColor() }]}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.titleRow}>
          <AlertTriangle size={20} color={getSeverityColor()} />
          <Text style={styles.title}>{tip.title}</Text>
        </View>
        {isExpanded ? (
          <ChevronUp size={20} color="#6b7280" />
        ) : (
          <ChevronDown size={20} color="#6b7280" />
        )}
      </TouchableOpacity>
      
      <Text style={styles.content}>{tip.content}</Text>
      
      {isExpanded && (
        <View style={styles.examples}>
          <Text style={styles.examplesTitle}>Warning Signs:</Text>
          {tip.examples.map((example, index) => (
            <View key={index} style={styles.exampleItem}>
              <Text style={styles.exampleBullet}>•</Text>
              <Text style={styles.exampleText}>{example}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  content: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 28,
    marginBottom: 16,
  },
  examples: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  exampleItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  exampleBullet: {
    fontSize: 18,
    color: '#dc2626',
    fontWeight: 'bold',
    marginRight: 8,
    lineHeight: 26,
  },
  exampleText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
  },
});