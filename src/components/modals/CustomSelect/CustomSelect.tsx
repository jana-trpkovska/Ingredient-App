import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './CustomSelect.styles';
import { useTheme } from '../../../hooks/useTheme';

interface Option<T> {
  label: string;
  value: T;
}

interface CustomSelectProps<T> {
  options: Option<T>[];
  selectedValue: T | null;
  onValueChange: (value: T) => void;
  placeholder?: string;
}

export default function CustomSelect<T>({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
}: CustomSelectProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const selectedOption = options.find((o) => o.value === selectedValue);

  const handleSelect = (value: T) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={selectedValue ? styles.selectedText : styles.placeholderText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name={modalVisible ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={20}
          color={theme.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
          <FlatList
            data={options}
            keyExtractor={(item) => String(item.value)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}