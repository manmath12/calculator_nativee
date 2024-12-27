import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CalculatorApp() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const handlePress = (value: string) => {
    if (!isNaN(Number(value)) || value === '.') {
      setCurrentValue((prev) => (prev === '0' ? value : prev + value));
    } else if (value === 'AC') {
      setCurrentValue('0');
      setPreviousValue('');
      setOperator(null);
    } else if (value === '=') {
      if (operator && previousValue) {
        calculate();
      }
    } else {
      setOperator(value);
      setPreviousValue(currentValue);
      setCurrentValue('0');
    }
  };

  const calculate = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) return;

    let result = 0;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
    }
    setCurrentValue(String(result));
    setPreviousValue('');
    setOperator(null);
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const buttonLabels = [
    ['AC', '+/-', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={[styles.container, darkMode ? styles.darkBackground : styles.lightBackground]}>
      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <Text style={styles.themeToggleText}>{darkMode ? '🌞 ' : '🌙 '}</Text>
      </TouchableOpacity>
      <View style={styles.resultContainer}>
        <Text style={[styles.resultText, darkMode ? styles.darkText : styles.lightText]}>
          {currentValue}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttonLabels.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((label) => (
              <TouchableOpacity
                key={label}
                style={[
                  styles.button,
                  darkMode ? styles.darkButton : styles.lightButton,
                  label === '=' && styles.equalsButton,
                  isNaN(Number(label)) && label !== '.' && styles.operatorButton,
                ]}
                onPress={() => handlePress(label)}>
                <Text style={[styles.buttonText, darkMode ? styles.darkText : styles.lightText]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop:50
  },
  darkBackground: {
    backgroundColor: '#1E1E1E',
  },
  lightBackground: {
    backgroundColor: '#FFFFFF',
  },
  themeToggle: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  themeToggleText: {
    fontSize: 16,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  darkButton: {
    backgroundColor: '#333333',
  },
  lightButton: {
    backgroundColor: '#E0E0E0',
  },
  operatorButton: {
    backgroundColor: '#FF9500',
  },
  equalsButton: {
    backgroundColor: '#FF9500',
    flex: 2,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
