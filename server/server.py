import paho.mqtt.client as mqtt
import time

commands = ["{'on':true}","{'on':false}",{"bri":255},{"seg":[{"col":[[255,0,0]]}]},{"seg":[{"col":[[0,255,0]]}]},{"seg":[{"col":[[0,0,255]]}]},{"seg":{"fx":"0","tb":0}},{"seg":{"fx":"1","tb":0}},{"seg":{"fx":"2","tb":0}}]
strips = ["all", 1, 2]

# Het bericht publiceren
def publish(topic, message):
    global client
    client.publish(topic, message)
    print(f"Bericht {message} gepubliceerd op topic {topic}")

def main():
    global client
    client = mqtt.Client()
    client.connect("mqtt.devbit.be", 1883)
    for i in range(len(strips)):
        print(f'{i} - {strips[i]}')
    strip = int(input('Welke ledstrip wil je aansturen? '))

    print("-------------------")

    for i in range(len(commands)):
        print(f'{i} - {commands[i]}')   
    command = int(input('Welk commando wil je uitvoeren? ' ))
    if(strip == 0):
        publish("IC/all/api", str(commands[command]))
    elif(strip == 1):
        publish("IC/ic1/api", str(commands[command]))
    elif(strip == 2):
        publish("IC/ic2/api", str(commands[command]))

    main()
        
        

if __name__ == "__main__":
    main()