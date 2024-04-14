#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN D5

#define LDRPIN A0

#define DHTTYPE DHT11

DHT_Unified dht(DHTPIN, DHTTYPE);

uint32_t delayMS;


const char* ssid = "NNV";             //"Duong Le Pro";
const char* password = "92hbbghdhn";  //"123456789";
const char* mqtt_server = "192.168.2.12";
const char* sensor_data_topic = "sensor_data";
const char* light_status_topic = "light_data";
const char* fan_status_topic = "fan_data";
const char* mqtt_username = "semicof";
const char* mqtt_password = "2002";
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
String msgStr = "";
float temp, hum;


void setup_wifi() {

  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {

    Serial.print(".");
    digitalWrite(2, 0);
    delay(200);
    digitalWrite(2, 1);
    delay(200);
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  if (strcmp(topic, "device/light") == 0) {
    if ((char)payload[0] == '0') {
      digitalWrite(D6, LOW);
      client.publish(light_status_topic, "0");
    } else if ((char)payload[0] == '1') {
      digitalWrite(D6, HIGH);
      client.publish(light_status_topic, "1");
    }
  } else if (strcmp(topic, "device/fan") == 0) {
    if ((char)payload[0] == '0') {
      digitalWrite(D7, LOW);
       client.publish(fan_status_topic, "0");
    } else if ((char)payload[0] == '1') {
      digitalWrite(D7, HIGH);
      client.publish(fan_status_topic, "1");
    }
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("Connected!");
      client.subscribe("device/light");
      client.subscribe("device/fan");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);
  pinMode(LDRPIN, INPUT);

  dht.begin();
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);

  dht.humidity().getSensor(&sensor);
  delayMS = sensor.min_delay / 1000;


  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1886);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;


    //    delay(delayMS);
    // Get temperature event and print its value.
    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (isnan(event.temperature)) {
      Serial.println(F("Error reading temperature!"));
    } else {
      Serial.print(F("Temperature: "));
      Serial.print(event.temperature);
      Serial.println(F("°C"));
      temp = event.temperature;
    }
    // Get humidity event and print its value.
    dht.humidity().getEvent(&event);
    if (isnan(event.relative_humidity)) {
      Serial.println(F("Error reading humidity!"));
    } else {
      Serial.print(F("Humidity: "));
      Serial.print(event.relative_humidity);
      Serial.println(F("%"));
      hum = event.relative_humidity;
    }

    int brightness = analogRead(LDRPIN);
    Serial.print("Brightness: ");
    Serial.println(brightness);

    msgStr = String(temp) + "," + String(hum) + "," + String(brightness);
    byte arrSize = msgStr.length() + 1;
    char msg[arrSize];
    Serial.print("PUBLISH DATA:");
    Serial.println(msgStr);
    msgStr.toCharArray(msg, arrSize);
    client.publish(sensor_data_topic, msg);
    msgStr = "";
    delay(1000);
  }
}