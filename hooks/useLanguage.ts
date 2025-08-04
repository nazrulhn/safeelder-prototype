import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'ms' | 'zh' | 'ta';

const translations = {
  en: {
    // App Name and Core
    appName: 'SafeElder',
    protectingYou: 'Protecting you from scams',
    
    // Navigation
    protection: 'Protection',
    learn: 'Learn',
    activity: 'Activity',
    settings: 'Settings',
    
    // Home Screen
    activeAlerts: 'Active Alerts',
    quickActions: 'Quick Actions',
    blockCaller: 'Block Caller',
    blockCurrentCall: 'Block current call immediately',
    reportScam: 'Report Scam',
    reportSuspicious: 'Report suspicious activity',
    todayActivity: "Today's Activity",
    callsChecked: 'Calls Checked',
    messagesScanned: 'Messages Scanned',
    threatsBlocked: 'Threats Blocked',
    needHelp: 'Need Help?',
    contactCaregiver: 'Contact Caregiver',
    
    // Protection Status
    protectionActive: 'Protection Active',
    protectionInactive: 'Protection Inactive',
    lastChecked: 'Last checked',
    minutesAgo: 'minutes ago',
    
    // Tips Screen
    scamAwareness: 'Scam Awareness',
    learnToStaySafe: 'Learn to stay safe',
    todayTip: "Today's Tip",
    todayTipContent: 'Never give personal information over the phone to unknown callers. Legitimate organizations will never ask for passwords or PIN numbers.',
    allTips: 'All Tips',
    phoneCalls: 'Phone Calls',
    messages: 'Messages',
    moneyScams: 'Money Scams',
    socialMedia: 'Social Media',
    
    // Tips Content
    tip1Title: 'Phone Call Red Flags',
    tip1Content: 'Be suspicious of callers claiming urgent action needed for your bank account or asking for personal information.',
    tip1Example1: 'Caller claims your bank account will be closed',
    tip1Example2: 'Requests for PIN or password over phone',
    
    tip2Title: 'SMS Warning Signs',
    tip2Content: 'Scam messages often contain urgent language and suspicious links. Never click links from unknown numbers.',
    tip2Example1: 'Messages claiming you won a prize',
    tip2Example2: 'Urgent requests to update account information',
    
    tip3Title: 'Money Transfer Scams',
    tip3Content: 'Never send money to people you have not met in person. Be extra careful with online purchases and investments.',
    tip3Example1: 'Fake investment opportunities',
    tip3Example2: 'Emergency money requests from "family"',
    
    tip4Title: 'Social Media Safety',
    tip4Content: 'Be cautious of friend requests from strangers and avoid sharing personal information publicly.',
    tip4Example1: 'Fake profiles asking for money',
    tip4Example2: 'Romance scams on dating platforms',
    
    // Activity Screen
    activityLog: 'Activity Log',
    reviewProtectionHistory: 'Review your protection history',
    totalEvents: 'Total Events',
    blocked: 'Blocked',
    reported: 'Reported',
    highRisk: 'High Risk',
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    allTypes: 'All Types',
    calls: 'Calls',
    noActivity: 'No Activity',
    noActivityMessage: 'No protection events recorded for this period',
    
    // Settings Screen
    configureApp: 'Configure your app settings',
    protection: 'Protection',
    scamProtection: 'Scam Protection',
    scamProtectionDesc: 'Enable real-time scam detection',
    language: 'Language',
    caregiver: 'Caregiver',
    setupCaregiver: 'Setup Caregiver',
    setupCaregiverDesc: 'Add trusted person for emergency alerts',
    caregiverNotifications: 'Caregiver Notifications',
    caregiverNotificationsDesc: 'Send alerts to caregiver for high-risk events',
    emergencyContacts: 'Emergency Contacts',
    emergencyContactsDesc: 'Manage your emergency contact list',
    notifications: 'Notifications',
    soundAlerts: 'Sound Alerts',
    soundAlertsDesc: 'Play sound for scam alerts',
    vibrationAlerts: 'Vibration Alerts',
    vibrationAlertsDesc: 'Vibrate device for alerts',
    support: 'Support',
    help: 'Help & FAQ',
    helpDesc: 'Get help using the app',
    contactSupport: 'Contact Support',
    contactSupportDesc: 'Reach out for technical assistance',
    appDescription: 'Protecting Malaysian elderly from scams',
    
    // Common Actions
    cancel: 'Cancel',
    ok: 'OK',
    success: 'Success',
    error: 'Error',
    block: 'Block',
    report: 'Report',
    setup: 'Setup',
    manage: 'Manage',
    
    // Alerts and Confirmations
    confirmBlock: 'Block Number?',
    confirmBlockMessage: 'This will block the current caller. This action cannot be undone.',
    numberBlocked: 'Number has been blocked successfully',
    scamReported: 'Scam has been reported to authorities',
    manualReport: 'Manual scam report by user',
    
    // Caregiver Setup
    caregiverSetup: 'Caregiver Setup',
    caregiverSetupMessage: 'Set up a trusted caregiver who will receive alerts when high-risk scam attempts are detected.',
    
    // Help Messages
    helpMessage: 'For assistance, contact our support team at support@safeelder.my or call 03-1234-5678',
    emergencyContactsMessage: 'Add up to 3 emergency contacts who can be reached quickly during scam incidents.',
  },
  
  ms: {
    // App Name and Core
    appName: 'SafeElder',
    protectingYou: 'Melindungi anda daripada penipuan',
    
    // Navigation
    protection: 'Perlindungan',
    learn: 'Belajar',
    activity: 'Aktiviti',
    settings: 'Tetapan',
    
    // Home Screen
    activeAlerts: 'Amaran Aktif',
    quickActions: 'Tindakan Pantas',
    blockCaller: 'Sekat Pemanggil',
    blockCurrentCall: 'Sekat panggilan semasa dengan segera',
    reportScam: 'Lapor Penipuan',
    reportSuspicious: 'Laporkan aktiviti mencurigakan',
    todayActivity: 'Aktiviti Hari Ini',
    callsChecked: 'Panggilan Diperiksa',
    messagesScanned: 'Mesej Diimbas',
    threatsBlocked: 'Ancaman Disekat',
    needHelp: 'Perlukan Bantuan?',
    contactCaregiver: 'Hubungi Penjaga',
    
    // Protection Status
    protectionActive: 'Perlindungan Aktif',
    protectionInactive: 'Perlindungan Tidak Aktif',
    lastChecked: 'Terakhir diperiksa',
    minutesAgo: 'minit yang lalu',
    
    // Tips Screen
    scamAwareness: 'Kesedaran Penipuan',
    learnToStaySafe: 'Belajar untuk kekal selamat',
    todayTip: 'Petua Hari Ini',
    todayTipContent: 'Jangan sekali-kali berikan maklumat peribadi melalui telefon kepada pemanggil yang tidak dikenali. Organisasi yang sah tidak akan meminta kata laluan atau nombor PIN.',
    allTips: 'Semua Petua',
    phoneCalls: 'Panggilan Telefon',
    messages: 'Mesej',
    moneyScams: 'Penipuan Wang',
    socialMedia: 'Media Sosial',
    
    // Common Actions
    cancel: 'Batal',
    ok: 'OK',
    success: 'Berjaya',
    error: 'Ralat',
    block: 'Sekat',
    report: 'Lapor',
    setup: 'Sediakan',
    manage: 'Urus',
  },
  
  zh: {
    // App Name and Core
    appName: 'SafeElder',
    protectingYou: '保护您免受诈骗',
    
    // Navigation
    protection: '保护',
    learn: '学习',
    activity: '活动',
    settings: '设置',
    
    // Home Screen
    activeAlerts: '活跃警报',
    quickActions: '快速操作',
    blockCaller: '阻止来电',
    blockCurrentCall: '立即阻止当前通话',
    reportScam: '举报诈骗',
    reportSuspicious: '举报可疑活动',
    todayActivity: '今日活动',
    callsChecked: '已检查通话',
    messagesScanned: '已扫描消息',
    threatsBlocked: '已阻止威胁',
    needHelp: '需要帮助？',
    contactCaregiver: '联系看护者',
    
    // Common Actions
    cancel: '取消',
    ok: '确定',
    success: '成功',
    error: '错误',
    block: '阻止',
    report: '举报',
    setup: '设置',
    manage: '管理',
  },
  
  ta: {
    // App Name and Core
    appName: 'SafeElder',
    protectingYou: 'மோசடிகளிலிருந்து உங்களைப் பாதுகாக்கிறது',
    
    // Navigation
    protection: 'பாதுகாப்பு',
    learn: 'கற்றுக்கொள்',
    activity: 'செயல்பாடு',
    settings: 'அமைப்புகள்',
    
    // Home Screen
    activeAlerts: 'செயலில் உள்ள எச்சரிக்கைகள்',
    quickActions: 'விரைவு நடவடிக்கைகள்',
    blockCaller: 'அழைப்பாளரைத் தடு',
    blockCurrentCall: 'தற்போதைய அழைப்பை உடனடியாகத் தடு',
    reportScam: 'மோசடியைப் புகாரளி',
    reportSuspicious: 'சந்தேகத்திற்குரிய செயல்பாட்டைப் புகாரளி',
    todayActivity: 'இன்றைய செயல்பாடு',
    callsChecked: 'சரிபார்க்கப்பட்ட அழைப்புகள்',
    messagesScanned: 'ஸ்கேன் செய்யப்பட்ட செய்திகள்',
    threatsBlocked: 'தடுக்கப்பட்ட அச்சுறுத்தல்கள்',
    needHelp: 'உதவி தேவையா?',
    contactCaregiver: 'பராமரிப்பாளரைத் தொடர்பு கொள்ளுங்கள்',
    
    // Common Actions
    cancel: 'ரத்து செய்',
    ok: 'சரி',
    success: 'வெற்றி',
    error: 'பிழை',
    block: 'தடு',
    report: 'புகாரளி',
    setup: 'அமைக்க',
    manage: 'நிர்வகி',
  },
};

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Failed to load language:', error);
    }
  };

  const changeLanguage = async (language: Language) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
  };
}