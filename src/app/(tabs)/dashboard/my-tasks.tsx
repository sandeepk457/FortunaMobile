
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MyTasksScreen() {
  const router = useRouter();

  const tasks = [
    {
      id: 1,
      title: "Pending Putaway",
      count: 14,
      color: "#C8102E",
      icon: "cube-outline",
    },
    {
      id: 2,
      title: "Picking Queue",
      count: 8,
      color: "#005F99",
      icon: "cart-outline",
    },
    {
      id: 3,
      title: "Dispatch Queue",
      count: 5,
      color: "#F59E0B",
      icon: "car-outline",
    },
    {
      id: 4,
      title: "Cycle Count",
      count: 3,
      color: "#16A34A",
      icon: "clipboard-outline",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Tasks
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Assigned Tasks
        </Text>

        <Text style={styles.summaryCount}>
          30
        </Text>

        <Text style={styles.summaryText}>
          Total Open Tasks
        </Text>
      </View>

      {/* TASK LIST */}
      {tasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          style={styles.taskCard}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  task.color,
              },
            ]}
          >
            <Ionicons
              name={task.icon as any}
              size={24}
              color="#FFF"
            />
          </View>

          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>
              {task.title}
            </Text>

            <Text style={styles.taskCount}>
              {task.count} Tasks Pending
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#999"
          />
        </TouchableOpacity>
      ))}

      {/* RECENT ACTIVITY */}
      <View style={styles.activityCard}>
        <Text style={styles.activityTitle}>
          Recent Activity
        </Text>

        <Text style={styles.activityText}>
          ✓ Putaway Task Completed
        </Text>

        <Text style={styles.activityText}>
          ✓ Picking Order #10045
        </Text>

        <Text style={styles.activityText}>
          ✓ Dispatch Vehicle AP39XX1234
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#C8102E",
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 16,
    color: "#666",
  },

  summaryCount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#C8102E",
    marginVertical: 8,
  },

  summaryText: {
    color: "#999",
  },

  taskCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 15,

    padding: 16,

    borderRadius: 16,

    flexDirection: "row",
    alignItems: "center",

    elevation: 2,
  },

  iconContainer: {
    width: 50,
    height: 50,

    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",
  },

  taskInfo: {
    flex: 1,
    marginLeft: 15,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  taskCount: {
    color: "#666",
    marginTop: 4,
  },

  activityCard: {
    backgroundColor: "#FFF",
    margin: 20,
    borderRadius: 18,
    padding: 20,
  },

  activityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#005F99",
    marginBottom: 15,
  },

  activityText: {
    marginBottom: 10,
    color: "#444",
  },

});