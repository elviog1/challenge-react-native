import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View,Image,TouchableWithoutFeedback } from 'react-native';

export default function App() {
    // variable donde se almacenara el "dato" de la api
    const [cat, setCat] = useState({})
    // variable para actualizar la informacion que viene de la api
    const [newCat,setNewCat] = useState(false)
    // variable de la api que se va a utilizar
    const api = "https://some-random-api.ml/animal/cat"
    // variable del boton actual
    const [buttonStyle, setButtonStyle] = useState(styles.newcatButton);

     // hook para poder poder almacenar en la variable "cat" la informacion que hay en la variable "api" mediante la funcion "fetch"
    useEffect(()=>{
      fetch(api)
      .then(response => response.json())
      .then(data => {
        setCat(data)
      })
    },[newCat]) // dependencia para actualizar el estado y obtener un nuevo objeto

    // funciones para actualizar el estado buttonStyle al clickear
    const handlePressIn = () => {
      setButtonStyle(styles.newcatButtonHover);
    };
  
    const handlePressOut = () => {
      setButtonStyle(styles.newcatButton);
    };
  return (
    <View style={styles.appContainer}>
    <View style={styles.cardCatInformation}>
      <Text style={styles.descriptionCat}>{cat.fact}</Text>
      <Image style={styles.imgCat} source={{ uri: cat.image }} />
    </View>
    <TouchableWithoutFeedback onPress={() => setNewCat(!newCat)} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={buttonStyle}>
          <Text style={styles.buttonText}>Next Fact</Text>
        </View>
      </TouchableWithoutFeedback>
  </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(200, 198, 198)'
  },
  cardCatInformation: {
    alignItems: 'center',
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  imgCat: {
    width: 270,
    height: 270,
    borderRadius: 30,
    padding: 20,
  },
  descriptionCat: {
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
  },
  newcatButton: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    fontSize: 22,
    fontWeight: 'bold',
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'rgb(152, 62, 236)',
    color: 'white',
    marginBottom: 10,
    transitionDuration: 0.2,
    marginTop:20
  },
  newcatButtonHover: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    fontSize: 22,
    fontWeight: 'bold',
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'rgb(108, 25, 185)',
    color: 'black',
    marginBottom: 10,
    transitionDuration: 0.2,
    marginTop:20
  },
  buttonText: {
    color: 'white',
    fontWeight:"bold"
  },
});
