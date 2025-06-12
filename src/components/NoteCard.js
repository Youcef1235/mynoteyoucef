import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { PRIORITIES } from "../context/NotesContext"

const { width } = Dimensions.get("window")

const NoteCard = ({ note, onPress }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  const priorityInfo = Object.values(PRIORITIES).find((p) => p.value === note.priority)

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Priority Indicator */}
      <View style={[styles.priorityIndicator, { backgroundColor: priorityInfo?.color }]} />

      <View style={styles.cardContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {note.title}
          </Text>
          <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
        </View>

        {/* Content */}
        <Text style={styles.content} numberOfLines={3}>
          {truncateContent(note.content)}
        </Text>

        {/* Priority Badge */}
        <View style={styles.footer}>
          <View style={[styles.priorityBadge, { backgroundColor: priorityInfo?.color }]}>
            <Text style={styles.priorityText}>{priorityInfo?.label}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#1148FF", // AZIENDA dark teal for shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFD4CA", // Light pink border
  },
  priorityIndicator: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    color: "#212529",
    marginRight: 12,
  },
  date: {
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    color: "#6C757D",
  },
  content: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "#495057",
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontFamily: "Montserrat-SemiBold",
    textTransform: "uppercase",
  },
})

export default NoteCard
