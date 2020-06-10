import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

function Input(props) {
  return (
    <TextInput
      {...props}
      style={{ ...styles.input, ...props.style }}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
    padding: 5,
  }
})

export default Input;