import React, { useEffect } from "react";
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

interface SpinnerModalProps {
  visible: boolean;
  color?: string;
  size?: "small" | "large";
  text?: string;
}

const SpinnerModal: React.FC<SpinnerModalProps> = ({
  visible,
  text = "Loading...",
  size = "large",
  color = "purple",
}) => {
  const [showModal, setShowModal] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
    }, 50);
  }, []);
  return (
    (showModal && (
      <Modal
        transparent={true}
        animationType="none"
        visible={visible}
        onRequestClose={() => {}}
      >
        <TouchableWithoutFeedback onLongPress={() => {}}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size={size} color={color} />
              <Text style={styles.loadingText}>{text}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )) ||
    null
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Darker background shade
  },
  activityIndicatorWrapper: {
    backgroundColor: "#333333", // Dark background for the spinner container
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#FFFFFF", // White text color
    fontSize: 16,
  },
});

export default SpinnerModal;
