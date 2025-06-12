import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNotes, PRIORITIES } from "../context/NotesContext"

const { width } = Dimensions.get("window")

const NoteScreen = ({ route, navigation }) => {
  const { note } = route.params
  const { deleteNote } = useNotes()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note? This action cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteNote(note.id)
          navigation.navigate("Dashboard")
        },
      },
    ])
  }

  const priorityInfo = Object.values(PRIORITIES).find((p) => p.value === note.priority)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Priority Indicator */}
          <View style={[styles.priorityBadge, { backgroundColor: priorityInfo?.color }]}>
            <Text style={styles.priorityText}>{priorityInfo?.label}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{note.title}</Text>

          {/* Date */}
          <Text style={styles.date}>{formatDate(note.createdAt)}</Text>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{note.content}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate("Form", { note })}
          activeOpacity={0.8}
        >
          <Ionicons name="pencil" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete} activeOpacity={0.8}>
          <Ionicons name="trash" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  priorityText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Montserrat-SemiBold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 28,
    fontFamily: "Montserrat-Bold",
    color: "#212529",
    marginBottom: 8,
    lineHeight: 34,
  },
  date: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#6C757D",
    marginBottom: 24,
  },
  contentContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentText: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#495057",
    lineHeight: 24,
  },
  actionContainer: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  editButton: {
    backgroundColor: "#45699D", // AZIENDA blue-purple
  },
  deleteButton: {
    backgroundColor: "#F45B69", // AZIENDA coral red
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    marginLeft: 8,
  },
})

export default NoteScreen
