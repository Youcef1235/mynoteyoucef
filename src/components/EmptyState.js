import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EmptyState = ({ title, message, icon }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={80} color="#ADB5BD" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat-SemiBold",
    color: "#495057",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 22,
  },
})

export default EmptyState
