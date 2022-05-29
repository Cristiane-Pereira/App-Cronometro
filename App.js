import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00aeef",
  },
  timer: {
    marginTop: -160,
    color: "#FFF",
    fontSize: 65,
    fontWeight: "bold",
  },
  btnArea: {
    flexDirection: "row",
    marginTop: 70,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00aeef",
  },
  areaUltima: {
    marginTop: 40,
  },
  textoCorrida: {
    fontSize: 25,
    fontStyle: "italic",
    color: "#FFF",
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cronometro: 0,
      start: "Start",
      ultimo: null,
    };

    //Variavel do timer do relogio.
    this.timer = null;

    this.handleStart = this.handleStart.bind(this);
    this.handleClean = this.handleClean.bind(this);
  }

  handleStart() {
    if (this.timer != null) { //Aqui vai parar o timer
      clearInterval(this.timer);
      this.timer = null;

      this.setState({ start: "Start" });

    } else {  //Comeca girar o timer
      this.timer = setInterval(() => {
        this.setState({ cronometro: this.state.cronometro + 0.1 });
      }, 100);

      this.setState({ start: "Stop" });
    }
  }

  handleClean() {
    if (this.timer != null) { //Aqui vai parar o timer
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      ultimo: this.state.cronometro,
      cronometro: 0,
      start: "Start",
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./assets/cronometro.png")}
          style={styles.cronometro}
        />

        <Text style={styles.timer}> {this.state.cronometro.toFixed(1)} </Text>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.handleStart}>
            <Text style={styles.btnTexto}> {this.state.start} </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.handleClean}>
            <Text style={styles.btnTexto}>Clean</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areaUltima}>
          <Text style={styles.textoCorrida}>
            {this.state.ultimo > 0
              ? "Last time: " + this.state.ultimo.toFixed(2) + "s"
              : ""}
          </Text>
        </View>
      </View>
    );
  }
}

export default App;
