import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
const START_MESSAGES = [
  { id: "1", text: "Hi!", mine: false },
  { id: "2", text: "Hello Awa 👋", mine: true },
  { id: "3", text: "Ready for the lab?", mine: false },
];
function Bubble({ text, mine }: { text: string; mine?: boolean }) {
  return (
    <View style={[styles.bubble, mine && styles.bubbleMine]}>
      <Text style={mine && styles.textMine}>{text}</Text>
    </View>
  );
}
export default function Chat() {
  const [messages, setMessages] = useState(START_MESSAGES);
  const [draft, setDraft] = useState("");
  function send() {
    if (draft.trim() === "") return;
    const next = {
      id: String(Date.now()),
      text: draft.trim(),
      mine: true,
    };
    setMessages([...messages, next]);
    setDraft("");
  }
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Image source="https://i.pravatar.cc/100" style={styles.avatar} />
        <Text style={styles.name}>Awa Diop</Text>
      </View>
      <ScrollView
        style={styles.messages}
        contentContainerStyle={{ paddingVertical: 8 }}
      >
        {messages.map((m) => (
          <Bubble key={m.id} text={m.text} mine={m.mine} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message…"
          value={draft}
          onChangeText={setDraft}
        />
        <Pressable style={styles.send} onPress={send}>
          <Text style={styles.sendLabel}>➤</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  name: { fontSize: 17, fontWeight: "bold" },
  messages: { flex: 1, backgroundColor: "#f4f4f4" },
  bubble: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 14,
    maxWidth: "75%",
    margin: 8,
    alignSelf: "flex-start",
  },
  bubbleMine: {
    backgroundColor: "#1a5276",
    alignSelf: "flex-end",
  },
  textMine: { color: "#fff" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1a5276",
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: { color: "#fff", fontSize: 16 },
});