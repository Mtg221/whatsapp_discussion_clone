import { Image } from "expo-image";
import { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { CONTACTS } from "../data/contacts";

type Contact = (typeof CONTACTS)[number];

function ContactRow({
  contact,
  selected,
  onPress,
}: {
  contact: Contact;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, selected && styles.rowSelected]}
    >
      <Image
        source={`https://i.pravatar.cc/100?u=${contact.id}`}
        style={styles.avatar}
      />
      <View style={styles.rowText}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.program}>{contact.program}</Text>
      </View>
    </Pressable>
  );
}

export default function Contacts() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return CONTACTS.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <FlatList
      data={filtered}
      keyExtractor={(contact) => contact.id}
      renderItem={({ item }) => (
        <ContactRow
          contact={item}
          selected={item.id === selectedId}
          onPress={() => setSelectedId(item.id)}
        />
      )}
      ListHeaderComponent={
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.h1}>Contacts</Text>
            <Text style={styles.count}>({filtered.length})</Text>
          </View>
          <TextInput
            style={styles.search}
            placeholder="Search..."
            value={query}
            onChangeText={setQuery}
          />
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <Text style={styles.empty}>
          No contact matches &quot;{query}&quot;.
        </Text>
      }
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  h1: { fontSize: 22, fontWeight: "bold", color: "#1a5276" },
  count: { color: "#888" },
  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  rowSelected: {
    backgroundColor: "#dbeafe",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  rowText: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  program: { fontSize: 13, color: "#666" },
  separator: { height: 1, backgroundColor: "#e5e5e5" },
  empty: { textAlign: "center", color: "#888", paddingVertical: 32 },
});
