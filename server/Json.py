import requests
import json
import time

def main():
    # Definieer de JSON-data
    json_data = {
        "on": True,
        "bri": 150,
        "transition": 10,
        "mainseg": 0,
        "seg": [
            {
                "start": 0,
                "stop": 10,
                "col": [[255, 192, 203, 0]],
                "fx": 1,
                "sx": 100
            },
            {
                "start": 10,
                "stop": 20,
                "col": [[0, 255, 0, 0]],
                "fx": 1,
                "sx": 100
            }
        ]
    }

    url = "http://ic2.local/json/state"
    try:
        response = requests.post(url, json=json_data)
        response.raise_for_status()  
        print("JSON met succes verzonden via HTTP!")
    except requests.exceptions.RequestException as e:
        print(f"Fout bij het verzenden van de JSON via HTTP: {e}")

if __name__ == "__main__":
    main()
