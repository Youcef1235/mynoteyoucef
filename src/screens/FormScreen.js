"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNotes, PRIORITIES } from "../context/NotesContext"

const FormScreen = ({ route, navigation }) => {
  const { note } = route.params || {}
  const { addNote, updateNote } = useNotes()
  const isEditing = !!note

  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")
  const [priority, setPriority] = useState(note?.priority || "normal")

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title for your note.")
      return
    }

    if (!content.trim()) {
      Alert.alert("Error", "Please enter some content for your note.")
      return
    }

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      priority,
    }

    if (isEditing) {
      updateNote({ ...note, ...noteData })
    } else {
      addNote(noteData)
    }

    navigation.navigate("Dashboard")
  }

  const PrioritySelector = () => (
    <View style={styles.priorityContainer}>
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityOptions}>
        {Object.values(PRIORITIES).map((priorityOption) => (
          <TouchableOpacity
            key={priorityOption.value}
            style={[
              styles.priorityOption,
              {
                backgroundColor: priority === priorityOption.value ? priorityOption.color : "#FFFFFF",
                borderColor: priorityOption.color,
              },
            ]}
            onPress={() => setPriority(priorityOption.value)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.priorityOptionText,
                {
                  color: priority === priorityOption.value ? "#FFFFFF" : priorityOption.color,
                },
              ]}
            >
              {priorityOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter note title..."
              placeholderTextColor="#ADB5BD"
              maxLength={100}
            />
          </View>

          {/* Priority Selector */}
          <PrioritySelector />

          {/* Content Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Content</Text>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="Write your note here..."
              placeholderTextColor="#ADB5BD"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.saveContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
          <Ionicons name="checkmark" size={24} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Note</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: "#495057",
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#212529",
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  contentInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#212529",
    borderWidth: 1,
    borderColor: "#DEE2E6",
    minHeight: 200,
  },
  priorityContainer: {
    marginBottom: 24,
  },
  priorityOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: 4,
    alignItems: "center",
  },
  priorityOptionText: {
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
  },
  saveContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  saveButton: {
    backgroundColor: "#45699D", // AZIENDA blue-purple
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: 8,
  },
})

export default FormScreen
