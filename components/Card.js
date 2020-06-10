import React from 'react';
import { View, StyleSheet } from 'react-native';

function Card(props) {
  return (
    <View style={{...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { height: 3, width: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
});

export default Card;