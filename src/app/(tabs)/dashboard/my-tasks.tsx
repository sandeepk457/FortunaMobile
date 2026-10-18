
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AnimatedEntrance from "@/components/ui/AnimatedEntrance";
import HoverCard from "@/components/ui/HoverCard";

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
      color: "#005F99",
      icon: "car-outline",
    },
    {
      id: 4,
      title: "Cycle Count",
      count: 3,
      color: "#C8102E",
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
      <LinearGradient
        colors={["#C8102E", "#A90D27", "#005F99"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
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
      </LinearGradient>

      {/* SUMMARY */}
      <AnimatedEntrance delay={80} style={styles.summaryWrap}>
        <HoverCard>
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
        </HoverCard>
      </AnimatedEntrance>

      {/* TASK LIST */}
      {tasks.map((task, index) => (
        <AnimatedEntrance key={task.id} delay={140 + index * 70} style={styles.taskWrap}>
          <HoverCard>
            <TouchableOpacity activeOpacity={0.82} style={styles.taskCard}>
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
          </HoverCard>
        </AnimatedEntrance>
      ))}

      {/* RECENT ACTIVITY */}
      <AnimatedEntrance delay={450} style={styles.activityWrap}>
        <HoverCard>
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
        </HoverCard>
      </AnimatedEntrance>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EEF5FA",
  },

  header: {
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 17,
    elevation: 8,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  summaryWrap: {
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 22,
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DFEAF2",
  },

  summaryTitle: {
    fontSize: 16,
    color: "#64788C",
  },

  summaryCount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#C8102E",
    marginVertical: 8,
  },

  summaryText: {
    color: "#718297",
  },

  taskWrap: {
    marginHorizontal: 20,
    marginBottom: 12,
  },

  taskCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 19,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0EAF2",
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
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
    color: "#172033",
  },

  taskCount: {
    color: "#718297",
    marginTop: 4,
  },

  activityWrap: {
    marginHorizontal: 20,
    marginTop: 10,
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0EAF2",
    shadowColor: "#005F99",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },

  activityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#005F99",
    marginBottom: 15,
  },

  activityText: {
    marginBottom: 10,
    color: "#52667B",
  },

});