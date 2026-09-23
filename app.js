import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  StatusBar,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Rect, Path, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');

// ----------------------------------------------------
// THEME COLORS (Cyberpunk Obsidian HUD)
// ----------------------------------------------------
const COLORS = {
  bgObsidian: '#0A0E17',
  surfaceDark: '#111827',
  surfaceCard: '#1A2234',
  surfaceElevated: '#222E46',
  cyan: '#00E5FF',
  violet: '#8A2BE2',
  magenta: '#FF2A85',
  emerald: '#00E676',
  amber: '#FFB300',
  rose: '#FF5252',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#475569',
  border: '#2E3D59'
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Shared Assistant States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeModel, setActiveModel] = useState('gemini-3.5-flash');
  const [currentEmotion, setCurrentEmotion] = useState('Focused');
  const [latency, setLatency] = useState('2.4s (Standard)');
  const [userEmail, setUserEmail] = useState('atirajgautam13@gmail.com');
  const [isDrivingMode, setIsDrivingMode] = useState(false);
  const [killSwitchTriggered, setKillSwitchTriggered] = useState(false);
  
  // Licensing & Anti-Piracy Setup
  const deviceFingerprint = "DEV-HW-A8F3-9C90-FF3";
  const ownerEmail = "atirajgautam13@gmail.com";
  const [licenseKey, setLicenseKey] = useState('');
  const [licensePasscode, setLicensePasscode] = useState('');
  const [generatedKey, setGeneratedKey] = useState('ZARA-PRO-8821-X9');
  const [generatedPass, setGeneratedPass] = useState('938102');
  const [licenseStatus, setLicenseStatus] = useState('Pending Binding');

  // Dual Passcode States (18+ Intense Mode)
  const [passcode1, setPasscode1] = useState('1234');
  const [passcode2, setPasscode2] = useState('5678');
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  // Chat/Whiteboard States
  const [chatMessages, setChatMessages] = useState([
    { sender: 'zara', text: 'Namaste atirajgautam13! Main Z.A.R.A Assistant hoon. Aaj hum kaunse operations analyze karenge?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [drawingLines, setDrawingLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);

  // Animation Refs
  const orbScale = useRef(new Animated.Value(1)).current;
  const waveHeight1 = useRef(new Animated.Value(10)).current;
  const waveHeight2 = useRef(new Animated.Value(25)).current;
  const waveHeight3 = useRef(new Animated.Value(15)).current;

  // Master Owner Bypass Computed State
  const isOwnerActive = userEmail.trim().toLowerCase() === ownerEmail;

  // 1. Orb & Audio Waveform Pulsing Animations
  useEffect(() => {
    let animationLoop;
    if (isSpeaking) {
      // High frequency pulsing when speaking
      animationLoop = Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(orbScale, { toValue: 1.18, duration: 400, useNativeDriver: true }),
            Animated.timing(orbScale, { toValue: 0.95, duration: 400, useNativeDriver: true })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(waveHeight1, { toValue: 48, duration: 250, useNativeDriver: false }),
            Animated.timing(waveHeight1, { toValue: 8, duration: 250, useNativeDriver: false })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(waveHeight2, { toValue: 55, duration: 320, useNativeDriver: false }),
            Animated.timing(waveHeight2, { toValue: 12, duration: 320, useNativeDriver: false })
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(waveHeight3, { toValue: 42, duration: 280, useNativeDriver: false }),
            Animated.timing(waveHeight3, { toValue: 6, duration: 280, useNativeDriver: false })
          ])
        )
      ]);
      animationLoop.start();
    } else {
      // Gentle calm pulsing when idle
      Animated.parallel([
        Animated.spring(orbScale, { toValue: 1.0, friction: 5, useNativeDriver: true }),
        Animated.spring(waveHeight1, { toValue: 8, friction: 5, useNativeDriver: false }),
        Animated.spring(waveHeight2, { toValue: 12, friction: 5, useNativeDriver: false }),
        Animated.spring(waveHeight3, { toValue: 6, friction: 5, useNativeDriver: false })
      ]).start();
    }

    return () => {
      if (animationLoop) animationLoop.stop();
    };
  }, [isSpeaking]);

  // 2. Emergency Halt Trigger
  const handleKillSwitch = () => {
    setIsSpeaking(false);
    setKillSwitchTriggered(true);
    Alert.alert(
      "🛑 EMERGENCY STOP TRIGGERED",
      "All active AI pipelines, web integrations, and TTS voice speech processes have been instantly killed.",
      [{ text: "Resume Neural Engine", onPress: () => setKillSwitchTriggered(false) }]
    );
  };

  // 3. Dynamic Key Generator
  const generateNewLicense = () => {
    const randomKey = `ZARA-PRO-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`;
    const randomPass = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedKey(randomKey);
    setGeneratedPass(randomPass);
    setLicenseStatus("Pending Binding to Hardware");
  };

  // 4. Client Activation Logic
  const handleActivateLicense = () => {
    if (isOwnerActive) {
      Alert.alert("Success", "Verified Owner Detected. Full system bypass granted without active credentials.");
      return;
    }
    if (licenseKey === generatedKey && licensePasscode === generatedPass) {
      setLicenseStatus("ACTIVE & LOCKED");
      Alert.alert("Authentication Succeeded", `License Key successfully validated and bound to Hardware Device ID: ${deviceFingerprint}`);
    } else {
      Alert.alert(
        "Anti-Piracy Security Guardrail Error",
        "This License is registered to another device. Please purchase an additional license for this hardware."
      );
    }
  };

  // 5. Chat Communication
  const sendChatMessage = (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    if (killSwitchTriggered) {
      Alert.alert("Access Blocked", "Please unlock the engine via Resume button on the Top Bar first.");
      return;
    }

    const newMsgs = [...chatMessages, { sender: 'user', text: textToSend }];
    setChatMessages(newMsgs);
    setInputText('');
    setIsSpeaking(true);

    // Simulate Z.A.R.A Cognitive Processing & Audio Reply
    setTimeout(() => {
      let reply = "Operations optimal. Analytics generated.";
      if (textToSend.toLowerCase().includes("kesariya")) {
        reply = "Aapka pasandida track 'Kesariya' YouTube/Spotify par background mein trigger kar diya hai!";
      } else if (textToSend.toLowerCase().includes("chup raho") || textToSend.toLowerCase().includes("mat batao")) {
        setIsSpeaking(false);
        reply = "Synthesizer shut down. Chup ho gayi hoon.";
      } else if (textToSend.toLowerCase().includes("driving mode")) {
        reply = "Driving safeguard setup ready. Telemetry activated.";
      }

      setChatMessages(prev => [...prev, { sender: 'zara', text: reply }]);
    }, 1800);
  };

  // 6. Draw on Whiteboard Canvas
  const handleTouchStart = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    setCurrentLine({ points: [{ x: locationX, y: locationY }] });
  };

  const handleTouchMove = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    if (currentLine) {
      const updatedPoints = [...currentLine.points, { x: locationX, y: locationY }];
      setCurrentLine({ points: updatedPoints });
    }
  };

  const handleTouchEnd = () => {
    if (currentLine) {
      setDrawingLines([...drawingLines, currentLine]);
      setCurrentLine(null);
    }
  };

  const clearCanvas = () => {
    setDrawingLines([]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.surfaceDark} />

        {/* TOP STATUS BAR HUD */}
        <View style={styles.statusBarContainer}>
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>Z.A.R.A</Text>
            {isOwnerActive ? (
              <View style={styles.ownerBadge}>
                <Text style={styles.ownerBadgeText}>OWNER ACTIVE</Text>
              </View>
            ) : (
              <View style={[styles.ownerBadge, { borderColor: COLORS.border, backgroundColor: 'transparent' }]}>
                <Text style={[styles.ownerBadgeText, { color: COLORS.textSecondary }]}>STANDARD MODE</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.emergencyHaltButton} onPress={handleKillSwitch}>
            <Text style={styles.haltText}>BAND KARO</Text>
          </TouchableOpacity>
        </View>

        {/* MAIN BODY CONTENTS DISPLAY CONTROLLER */}
        <View style={styles.contentArea}>
          {activeTab === 'dashboard' && (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {/* Core Hero HUD Widget */}
              <View style={styles.heroCard}>
                <View style={styles.heroLayout}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.liveIndicRow}>
                      <Text style={styles.heroHeaderTitle}>COMMAND DECK</Text>
                      <View style={styles.activeLed} />
                      <Text style={styles.liveText}>ONLINE</Text>
                    </View>
                    <Text style={styles.heroSubtitle}>Multimodal AI Yield System Protocol</Text>
                    <Text style={styles.hardwareText}>Fingerprint: {deviceFingerprint.substring(0, 15)}...</Text>
                  </View>
                  <Animated.View style={[styles.smallOrbContainer, { transform: [{ scale: orbScale }] }]}>
                    <Svg width="55" height="55" viewBox="0 0 50 50">
                      <Circle cx="25" cy="25" r="23" fill="none" stroke={COLORS.cyan} strokeWidth="2" strokeDasharray="3, 3" />
                      <Circle cx="25" cy="25" r="16" fill={isSpeaking ? COLORS.magenta : COLORS.cyan} opacity="0.85" />
                    </Svg>
                  </Animated.View>
                </View>
              </View>

              {/* Real-time KPI Statistics Strip */}
              <View style={styles.kpiContainerGrid}>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>COGNITIVE BRAIN</Text>
                  <Text style={styles.kpiValue}>{activeModel.replace('gemini-', '').toUpperCase()}</Text>
                  <Text style={styles.kpiDetail}>Failover Stack: Armed</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>INTELLIGENT YAADEIN</Text>
                  <Text style={[styles.kpiValue, { color: COLORS.violet }]}>ACTIVE</Text>
                  <Text style={styles.kpiDetail}>Zero-Pin Filtered</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiLabel}>ESP32 HOME MESH</Text>
                  <Text style={[styles.kpiValue, { color: COLORS.emerald }]}>4 NODE</Text>
                  <Text style={styles.kpiDetail}>Subnet Synchronized</Text>
                </View>
              </View>

              {/* Fast Telemetry Action Controls */}
              <View style={styles.customCard}>
                <Text style={styles.sectionHeaderTitle}>Primary Automation Macros</Text>
                <View style={styles.actionButtonsCluster}>
                  <TouchableOpacity style={styles.actionChip} onPress={() => sendChatMessage("Play Kesariya")}>
                    <Text style={styles.chipText}>🎵 Play Kesariya</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionChip, isDrivingMode && styles.activeChipBorder]} onPress={() => setIsDrivingMode(!isDrivingMode)}>
                    <Text style={[styles.chipText, { color: isDrivingMode ? COLORS.amber : COLORS.textPrimary }]}>
                      🚗 Driving: {isDrivingMode ? 'ON' : 'OFF'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionChip, { borderColor: COLORS.emerald }]} onPress={() => Alert.alert("IoT Switch", "All Ambient LED Nodes triggered to Aurora Green Profile!")}>
                    <Text style={[styles.chipText, { color: COLORS.emerald }]}>💡 Aurora Mesh</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Visualized Safety Rules Info Block */}
              <View style={[styles.customCard, { borderColor: COLORS.emerald }]}>
                <Text style={[styles.sectionHeaderTitle, { color: COLORS.emerald }]}>✓ Hardcoded Privacy Shield Locked</Text>
                <Text style={styles.cardInfoDesc}>
                  All passwords, authentication OTP messages, credit card numbers, and banking security PIN coordinates are instantly parsed and completely redacted dynamically before entering memory loops.
                </Text>
              </View>
            </ScrollView>
          )}

          {activeTab === 'audio' && (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.interactiveAudioLabWidget}>
                <Text style={styles.bigHeader}>HOLOGRAPHIC WAVE AUDIO LAB</Text>
                <Text style={styles.subtext}>Interactive Cognitive Tone Modulator</Text>

                {/* Cybernetic Wave Orb Panel */}
                <View style={styles.orbDisplayModule}>
                  <Animated.View style={[styles.giantAnimatedOrbBack, { transform: [{ scale: orbScale }] }]}>
                    <Svg width="160" height="160" viewBox="0 0 100 100">
                      <Circle cx="50" cy="50" r="46" fill="none" stroke={COLORS.cyan} strokeWidth="3" />
                      <Circle cx="50" cy="50" r="38" fill="none" stroke={COLORS.violet} strokeWidth="1.5" strokeDasharray="5, 3" />
                      <Circle cx="50" cy="50" r="28" fill={isSpeaking ? COLORS.magenta : COLORS.cyan} opacity="0.9" />
                    </Svg>
                  </Animated.View>

                  {/* Horizontal Sound Waves Bars */}
                  <View style={styles.soundBarChartContainer}>
                    <Animated.View style={[styles.barVisualizerShape, { height: waveHeight1 }]} />
                    <Animated.View style={[styles.barVisualizerShape, { height: waveHeight2 }]} />
                    <Animated.View style={[styles.barVisualizerShape, { height: waveHeight3 }]} />
                    <Animated.View style={[styles.barVisualizerShape, { height: waveHeight2 }]} />
                    <Animated.View style={[styles.barVisualizerShape, { height: waveHeight1 }]} />
                  </View>

                  <Text style={styles.telemetryStateReadout}>
                    SENTIMENT STATE: <Text style={{ color: COLORS.magenta, fontWeight: 'bold' }}>{currentEmotion.toUpperCase()}</Text>
                  </Text>
                  <Text style={styles.telemetryStateReadout}>
                    PIPELINE DELAY: <Text style={{ color: COLORS.cyan, fontWeight: 'bold' }}>{latency}</Text>
                  </Text>
                </View>

                {/* Voice & Interruption Controller Options */}
                <View style={styles.actionButtonsCluster}>
                  <TouchableOpacity style={styles.speakTestButton} onPress={() => setIsSpeaking(!isSpeaking)}>
                    <Text style={styles.speakButtonText}>{isSpeaking ? 'Stop Synthetic Speech' : 'Synthesize Voice Output'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.speakTestButton, { backgroundColor: COLORS.surfaceElevated }]} onPress={() => sendChatMessage("Chup raho mat batao")}>
                    <Text style={[styles.speakButtonText, { color: COLORS.rose }]}>Stop Interrupt</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Selector configurations */}
              <View style={styles.customCard}>
                <Text style={styles.sectionHeaderTitle}>Z.A.R.A Voice Identity Configuration</Text>
                <Text style={styles.cardInputLabel}>Select AI Voice Personality Profile:</Text>
                <View style={styles.configSelectorFlexGroup}>
                  {['Zara', 'Friday', 'Venom', 'Jarvis'].map(persona => (
                    <TouchableOpacity key={persona} style={styles.selectionPillButton} onPress={() => Alert.alert("Success", `${persona} voice profile loaded.`)}>
                      <Text style={styles.selectionPillButtonText}>{persona}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}

          {activeTab === 'chat' && (
            <View style={{ flex: 1 }}>
              {/* Top Selector Toggle for Chat vs Drawing Canvas */}
              <View style={styles.dualModeSegmentedBar}>
                <Text style={styles.activeSegmentIndicator}>Neural Conversation & Drawing HUD</Text>
              </View>

              {/* Conversation Display Panel */}
              <View style={{ flex: 1, padding: 12 }}>
                <ScrollView style={styles.chatsScrollerContainer}>
                  {chatMessages.map((msg, index) => (
                    <View key={index} style={[styles.messageBubbleFrame, msg.sender === 'user' ? styles.userMessageAlign : styles.assistantMessageAlign]}>
                      <Text style={styles.messageBubbleBodyText}>{msg.text}</Text>
                    </View>
                  ))}
                </ScrollView>

                {/* Math & Proof Solving Canvas Area ("Zara yahin padhayegi") */}
                <View style={styles.canvasSandboxBox}>
                  <View style={styles.canvasTitleRow}>
                    <Text style={styles.canvasHeaderText}>WHITEBOARD CANVAS ("Zara yahin padhayegi")</Text>
                    <TouchableOpacity onPress={clearCanvas}>
                      <Text style={styles.clearCanvasTextButton}>Clear</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.drawSurfaceMockFrame}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <Svg style={StyleSheet.absoluteFill}>
                      {drawingLines.map((line, idx) => {
                        const pathData = line.points.map((p, pidx) => `${pidx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                        return <Path key={idx} d={pathData} fill="none" stroke={COLORS.cyan} strokeWidth="3.5" />;
                      })}
                      {currentLine && (
                        <Path
                          d={currentLine.points.map((p, pidx) => `${pidx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                          fill="none"
                          stroke={COLORS.magenta}
                          strokeWidth="3.5"
                        />
                      )}
                    </Svg>
                  </View>
                </View>

                {/* Input Sending bar */}
                <View style={styles.inputSendingFlexBar}>
                  <TextInput
                    style={styles.chatInputTextWidget}
                    placeholder="Ask Zara, enter equation, or trigger Spotify Kesariya..."
                    placeholderTextColor={COLORS.textMuted}
                    value={inputText}
                    onChangeText={setInputText}
                  />
                  <TouchableOpacity style={styles.sendActionButton} onPress={() => sendChatMessage()}>
                    <Text style={styles.sendButtonLabelText}>ASK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {activeTab === 'licensing' && (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {/* Owner Portal Configuration Authentication */}
              <View style={[styles.customCard, isOwnerActive && { borderColor: COLORS.magenta }]}>
                <Text style={[styles.sectionHeaderTitle, { color: COLORS.magenta }]}>Owner Authentication Gate</Text>
                <Text style={styles.cardInfoDesc}>
                  Master Access Status: {isOwnerActive ? "OWNER RECOGNIZED — All hardware restrictions and 18+ passcodes unlocked dynamically." : "Standard active status."}
                </Text>
                <TextInput
                  style={styles.standardInputTextWidget}
                  placeholder="Owner Email Verify Address"
                  placeholderTextColor={COLORS.textMuted}
                  value={userEmail}
                  onChangeText={setUserEmail}
                />
              </View>

              {/* Hardware Lock Indicator */}
              <View style={styles.customCard}>
                <Text style={styles.sectionHeaderTitle}>Hardware Device Lock Metrics</Text>
                <Text style={styles.hardwareText}>Anti-Piracy Identifier Code: {deviceFingerprint}</Text>
                <Text style={styles.cardInfoDesc}>
                  License validation binds strictly to this model sequence. Attempting to deploy on mismatched hardware triggers immediate application execution block.
                </Text>
              </View>

              {/* Dynamic 1-Click Key Generator Console */}
              <View style={styles.customCard}>
                <Text style={styles.sectionHeaderTitle}>Dynamic License Key Console</Text>
                <TouchableOpacity style={[styles.actionChip, { backgroundColor: COLORS.amber }]} onPress={generateNewLicense}>
                  <Text style={[styles.chipText, { color: '#000' }]}>Generate Dynamic Core Key</Text>
                </TouchableOpacity>

                <View style={styles.generatedKeyBoxHUD}>
                  <Text style={styles.genHudLabel}>COGNITIVE CORE KEY:</Text>
                  <Text style={styles.genHudValue}>{generatedKey}</Text>
                  <Text style={styles.genHudLabel}>CORE PASSCODE CODE:</Text>
                  <Text style={[styles.genHudValue, { color: COLORS.emerald }]}>{generatedPass}</Text>
                  <Text style={styles.genHudLabel}>STATUS badge: <Text style={{ color: COLORS.amber }}>{licenseStatus}</Text></Text>
                </View>

                {/* Client Verification Fields mock testing */}
                <View style={styles.verificationHorizontalInputsFlex}>
                  <TextInput
                    style={[styles.standardInputTextWidget, { flex: 1, marginRight: 6 }]}
                    placeholder="Enter Core Key"
                    placeholderTextColor={COLORS.textMuted}
                    value={licenseKey}
                    onChangeText={setLicenseKey}
                  />
                  <TextInput
                    style={[styles.standardInputTextWidget, { flex: 0.8 }]}
                    placeholder="Passcode"
                    placeholderTextColor={COLORS.textMuted}
                    value={licensePasscode}
                    onChangeText={setLicensePasscode}
                  />
                </View>
                <TouchableOpacity style={[styles.speakTestButton, { marginTop: 10 }]} onPress={handleActivateLicense}>
                  <Text style={styles.speakButtonText}>Authenticate & Bind License on This Hardware</Text>
                </TouchableOpacity>
              </View>

              {/* Dual Passcode Intense 18+ Protection Setting */}
              <View style={styles.customCard}>
                <Text style={styles.sectionHeaderTitle}>Dual Passcodes (Intense 18+ Module)</Text>
                <View style={styles.verificationHorizontalInputsFlex}>
                  <TextInput
                    style={[styles.standardInputTextWidget, { flex: 1, marginRight: 6 }]}
                    placeholder="Passcode Slot 1"
                    placeholderTextColor={COLORS.textMuted}
                    value={passcode1}
                    onChangeText={setPasscode1}
                    secureTextEntry
                  />
                  <TextInput
                    style={[styles.standardInputTextWidget, { flex: 1 }]}
                    placeholder="Passcode Slot 2"
                    placeholderTextColor={COLORS.textMuted}
                    value={passcode2}
                    onChangeText={setPasscode2}
                    secureTextEntry
                  />
                </View>
                <TouchableOpacity
                  style={[styles.actionChip, { marginTop: 10, borderColor: COLORS.violet }]}
                  onPress={() => {
                    if (isOwnerActive || (passcode1 === "1234" && passcode2 === "5678")) {
                      setIsAgeVerified(true);
                      Alert.alert("Success", "18+ Intimacy Modifiers authorized completely.");
                    } else {
                      Alert.alert("Security Failed", "Dual passcode coordinates verification rejected.");
                    }
                  }}
                >
                  <Text style={[styles.chipText, { color: COLORS.violet }]}>Verify & Authorize 18+ Subsystem</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}

          {activeTab === 'settings' && (
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {/* Cognitive Model Stack Failover Settings */}
              <View style={styles.customCard}>
                <Text style={styles.sectionHeaderTitle}>Brain Model Selector & Failover Stack</Text>
                <Text style={styles.cardInputLabel}>Select Primary Engine:</Text>
                {['gemini-3.5-flash', 'gemini-3.1-flash-lite-preview', 'gemini-3.1-pro-preview'].map(model => (
                  <TouchableOpacity
                    key={model}
                    style={[styles.selectionPillButton, activeModel === model && styles.activePillSelector]}
                    onPress={() => setActiveModel(model)}
                  >
                    <Text style={styles.selectionPillButtonText}>{model}</Text>
                  </TouchableOpacity>
                ))}
                <Text style={styles.cardInfoDesc}>
                  Note: Auto-failover is dynamically armed. Rate limit errors or key exceptions trigger instant silent failover sequentially across the active stack.
                </Text>
              </View>

              {/* API Configuration Credentials inputs */}
              <View style={styles.customCard}>
                <Text style={styles.sectionHeaderTitle}>API Authorization Configurations</Text>
                <Text style={styles.cardInputLabel}>Gemini API Private Key:</Text>
                <TextInput style={styles.standardInputTextWidget} value="••••••••••••••••••••" secureTextEntry />

                <Text style={styles.cardInputLabel}>YouTube Channel API Handle Name:</Text>
                <TextInput style={styles.standardInputTextWidget} value="@zaramultimodal" />

                <Text style={styles.cardInputLabel}>Cloud TTS Speech Auth Credentials:</Text>
                <TextInput style={styles.standardInputTextWidget} value="••••••••••••••••••••" secureTextEntry />
              </View>

              {/* Intimacy Settings & Hindi Grammar Rules */}
              <View style={styles.customCard}>
                <Text style={styles.sectionHeaderTitle}>Intimacy Level & Grammatical Modifiers</Text>
                <View style={styles.verificationHorizontalInputsFlex}>
                  {['Friendly', 'Romantic', 'Intense (18+)'].map(lvl => (
                    <TouchableOpacity key={lvl} style={[styles.selectionPillButton, { flex: 1, marginHorizontal: 2 }]} onPress={() => Alert.alert("Intimacy Level Saved", `${lvl} profile applied.`)}>
                      <Text style={styles.selectionPillButtonText}>{lvl}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.cardInputLabel, { marginTop: 12 }]}>Hindi Verb Inflection Profile Selection:</Text>
                <View style={styles.verificationHorizontalInputsFlex}>
                  {['Male (rahe ho)', 'Female (rahi ho)', 'Neutral'].map(gender => (
                    <TouchableOpacity key={gender} style={[styles.selectionPillButton, { flex: 1, marginHorizontal: 2 }]} onPress={() => Alert.alert("Inflexion Updated", `${gender} profile selected.`)}>
                      <Text style={styles.selectionPillButtonText}>{gender.split(' ')[0]}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}
        </View>

        {/* BOTTOM TAB NAVIGATION HUD */}
        <View style={styles.tabNavRowBar}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'audio', label: 'Audio Orb', icon: '🎙️' },
            { id: 'chat', label: 'Chat', icon: '💬' },
            { id: 'licensing', label: 'Licensing', icon: '🔑' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabNavItemFrame, activeTab === tab.id && styles.activeTabNavItemFrame]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={styles.tabNavIconText}>{tab.icon}</Text>
              <Text style={[styles.tabNavLabelText, activeTab === tab.id && { color: COLORS.cyan, fontWeight: 'bold' }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ----------------------------------------------------
// UI HUD STYLES
// ----------------------------------------------------
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.bgObsidian
  },
  statusBarContainer: {
    height: 55,
    backgroundColor: COLORS.surfaceDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  brandText: {
    color: COLORS.cyan,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2
  },
  ownerBadge: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 42, 133, 0.15)',
    borderWidth: 1,
    borderColor: COLORS.magenta,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  ownerBadgeText: {
    color: COLORS.magenta,
    fontSize: 8,
    fontWeight: '900'
  },
  emergencyHaltButton: {
    backgroundColor: 'rgba(255, 82, 82, 0.15)',
    borderWidth: 1,
    borderColor: COLORS.rose,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  haltText: {
    color: COLORS.rose,
    fontSize: 10,
    fontWeight: '900'
  },
  contentArea: {
    flex: 1
  },
  scrollContent: {
    padding: 14,
    paddingBottom: 24
  },
  heroCard: {
    backgroundColor: COLORS.surfaceDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14
  },
  heroLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  liveIndicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  heroHeaderTitle: {
    color: COLORS.cyan,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5
  },
  activeLed: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.emerald,
    marginHorizontal: 6
  },
  liveText: {
    color: COLORS.emerald,
    fontSize: 8,
    fontWeight: '900'
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 4
  },
  hardwareText: {
    color: COLORS.magenta,
    fontSize: 9,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  smallOrbContainer: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  kpiContainerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  kpiCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 3
  },
  kpiLabel: {
    color: COLORS.textMuted,
    fontSize: 8,
    fontWeight: '900'
  },
  kpiValue: {
    color: COLORS.cyan,
    fontSize: 13,
    fontWeight: '900',
    marginVertical: 4
  },
  kpiDetail: {
    color: COLORS.textSecondary,
    fontSize: 9
  },
  customCard: {
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12
  },
  sectionHeaderTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10
  },
  actionButtonsCluster: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  actionChip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  activeChipBorder: {
    borderColor: COLORS.amber
  },
  chipText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '800'
  },
  cardInfoDesc: {
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 16
  },
  interactiveAudioLabWidget: {
    backgroundColor: COLORS.surfaceDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14
  },
  bigHeader: {
    color: COLORS.cyan,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5
  },
  subtext: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 16
  },
  orbDisplayModule: {
    alignItems: 'center',
    marginVertical: 14
  },
  giantAnimatedOrbBack: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  soundBarChartContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    width: width * 0.7
  },
  barVisualizerShape: {
    width: 5,
    backgroundColor: COLORS.cyan,
    marginHorizontal: 3,
    borderRadius: 2.5
  },
  telemetryStateReadout: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 4
  },
  speakTestButton: {
    backgroundColor: COLORS.cyan,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  speakButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '900'
  },
  cardInputLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 6
  },
  configSelectorFlexGroup: {
    flexDirection: 'row',
    gap: 6
  },
  selectionPillButton: {
    backgroundColor: COLORS.surfaceDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 12
  },
  activePillSelector: {
    borderColor: COLORS.cyan,
    backgroundColor: 'rgba(0, 229, 255, 0.1)'
  },
  selectionPillButtonText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: 'bold'
  },
  dualModeSegmentedBar: {
    backgroundColor: COLORS.surfaceDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 10,
    alignItems: 'center'
  },
  activeSegmentIndicator: {
    color: COLORS.cyan,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1
  },
  chatsScrollerContainer: {
    flex: 1,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10
  },
  messageBubbleFrame: {
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    maxWidth: '85%'
  },
  userMessageAlign: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  assistantMessageAlign: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  messageBubbleBodyText: {
    color: COLORS.textPrimary,
    fontSize: 12
  },
  canvasSandboxBox: {
    height: 190,
    backgroundColor: COLORS.surfaceDark,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 8,
    marginBottom: 10
  },
  canvasTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  canvasHeaderText: {
    color: COLORS.magenta,
    fontSize: 9,
    fontWeight: '900'
  },
  clearCanvasTextButton: {
    color: COLORS.rose,
    fontSize: 10,
    fontWeight: 'bold'
  },
  drawSurfaceMockFrame: {
    flex: 1,
    backgroundColor: COLORS.bgObsidian,
    borderRadius: 6,
    overflow: 'hidden'
  },
  inputSendingFlexBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chatInputTextWidget: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.surfaceCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 12
  },
  sendActionButton: {
    width: 50,
    height: 40,
    backgroundColor: COLORS.cyan,
    borderRadius: 8,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButtonLabelText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '900'
  },
  standardInputTextWidget: {
    height: 40,
    backgroundColor: COLORS.surfaceDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 12,
    marginBottom: 10
  },
  generatedKeyBoxHUD: {
    backgroundColor: COLORS.bgObsidian,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10
  },
  genHudLabel: {
    color: COLORS.textMuted,
    fontSize: 8,
    fontWeight: '900',
    marginBottom: 2
  },
  genHudValue: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 8
  },
  verificationHorizontalInputsFlex: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tabNavRowBar: {
    height: 60,
    backgroundColor: COLORS.surfaceDark,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tabNavItemFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 50
  },
  activeTabNavItemFrame: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.cyan
  },
  tabNavIconText: {
    fontSize: 16
  },
  tabNavLabelText: {
    color: COLORS.textSecondary,
    fontSize: 9,
    marginTop: 2
  }
});
