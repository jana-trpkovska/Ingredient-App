import React from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { createStyles } from "./CustomAlert.styles";

interface ButtonOption {
  text: string;
  onPress: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface CustomAlertProps {
  visible: boolean;
  title?: string;
  message: string;
  onClose?: () => void;
  buttons?: ButtonOption[];
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  onClose,
  buttons,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const renderButtons = () => {
    if (buttons && buttons.length > 0) {
      return buttons.map((btn, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            btn.style === "destructive" && { backgroundColor: theme.primary },
            btn.style === "cancel" && { backgroundColor: theme.secondaryBackground },
          ]}
          onPress={btn.onPress}
        >
          <Text
            style={[
              styles.buttonText,
              btn.style === "cancel" && { color: theme.textPrimary },
            ]}
          >
            {btn.text}
          </Text>
        </TouchableOpacity>
      ));
    }

    return (
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.message}>{message}</Text>
        {renderButtons()}
      </View>
    </Modal>
  );
};

export default CustomAlert;