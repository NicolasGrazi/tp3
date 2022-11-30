import * as React from "react";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
const axios= require("axios").default;

function DetailsScreen(){
  const [autores, setAutores] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  function pegarAPI(){
    setLoading(true);
    axios.get("https://api.artic.edu/api/v1/artworks?fields=title,artist_display,date_display,main_reference_number,image_id")
      .then(function (resp){
        setAutores(resp.data.data);
          setLoading(false)
      })
      .catch(function (err){
          console.log(err);
      })
  }


  return (
    <View style={styles.container}>
      {!loading ? <Button 
        title="Obtener Autores"
        onPress={() => pegarAPI()}
        style={styles.boton}
      /> : <ActivityIndicator/>}
      
      
        {autores.map((autores, index) =>
          
          <Text key={index} >
          Titulo{"\n"}
          {autores.title} 
          {"\n"}{"\n"}
          Artista{"\n"}
          {autores.artist_display}
          {"\n"}{"\n"}
          Fecha de creacion{"\n"}
           {autores.date_display} 
           {"\n"}{"\n"}

        </Text> 
         
        
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  boton: {
    color: 'red',
    margin: 20
  },
  
});


module.exports = DetailsScreen;