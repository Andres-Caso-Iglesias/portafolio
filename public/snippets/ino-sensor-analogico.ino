void setup() {
  Serial.begin(9600);
}

void loop() {
  int valorSensor = analogRead(A0);
  Serial.println(valorSensor);
  delay(2000);
}
