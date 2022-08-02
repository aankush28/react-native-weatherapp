import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
const API_KEY ="xxxxplease fill api key";
//
export default function App() {
  const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
          try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('pune');
        console.log(weatherData);

    }, [])
    
    console.log(weatherData);

    if(!loaded) {
      return (
          <View style={styles.container}>
              <ActivityIndicator color='red'  size={46} />
          </View>

      )
  } else if(weatherData === null){
    return(
    <View>
       <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
            </View>
    </View>
    )
  }
  return (
    <View style={styles.container}>
<Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />

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
  primaryText: {
      margin: 20,
      fontSize: 28
  }
});