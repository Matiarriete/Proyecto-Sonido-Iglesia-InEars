from pythonosc.udp_client import SimpleUDPClient
import config

# --- CONFIGURACIÓN DE TU MEZCLADOR ---
# !!! IMPORTANTE: Cambia la IP por la dirección de tu X32
X32_IP = config.X32_IP

X32_PORT = config.X32_PORT

# Inicializa el cliente OSC
client = SimpleUDPClient(X32_IP, X32_PORT)

def set_bus_fader_level(bus_number, level):
    """
    Controla el nivel del fader del Bus de Mix.
    
    El nivel (level) debe ser un valor de punto flotante entre 0.0 y 1.0.
    
    Parámetros:
    - bus_number (int): El número del Bus (1 al 16).
    - level (float): El nivel del fader (0.0 a 1.0).
    """
    # Formato del mensaje OSC para el fader de un Bus: /bus/XX/mix/fader
    osc_address = f"/bus/{bus_number:02d}/mix/fader"
    client.send_message(osc_address, float(level))
    print(f"-> Comando enviado: {osc_address} (Bus {bus_number}) con valor: {level}")

def set_channel_mute_status(bus_number, is_muted):
    """
    Mutea o desmutea un Bus de Mix.
    
    Parámetros:
    - bus_number (int): El número del Bus (1 al 16).
    - is_muted (int): 1 para mutear, 0 para desmutear.
    """
    # Formato del mensaje OSC para el mute de un Bus: /bus/XX/mix/on
    # Recordatorio: El valor se invierte (1=unmuted en la consola, 0=muted).
    mute_value = 1 - is_muted 
    osc_address = f"/bus/{bus_number:02d}/mix/on"
    client.send_message(osc_address, mute_value)
    
    estado = "MUTEAR" if is_muted == 1 else "DESMUTEAR"
    print(f"-> Comando enviado: {osc_address} para {estado} Bus {bus_number}.")

def set_channel_fader_level_bus(bus_number, level, channel_number):
    """
    Controla el nivel del fader de un canal del Bus de Mix.
    
    El nivel (level) debe ser un valor de punto flotante entre 0.0 y 1.0.
    
    Parámetros:
    - bus_number (int): El número del Bus (1 al 16).
    - level (float): El nivel del fader (0.0 a 1.0).
    - channel_number: Canal que se le va a modificar el volumen.
    """
    # Formato del mensaje OSC para el fader de un Bus: /bus/XX/mix/fader
    osc_address = osc_address = f"/ch/{channel_number:02d}/mix/send/{bus_number:02d}/level"
    client.send_message(osc_address, float(level))
    print(f"-> Comando enviado: {osc_address} (Bus {bus_number}) con valor: {level}")

def set_channel_mute_status_bus(bus_number, is_muted, channel_number):
    """
    Mutea o desmutea un Bus de Mix.
    
    Parámetros:
    - bus_number (int): El número del Bus (1 al 16).
    - is_muted (int): 1 para mutear, 0 para desmutear.
    - channel_number: Canal que va a ser muteado.
    """
    # Formato del mensaje OSC para el mute de un Bus: /bus/XX/mix/on
    # Recordatorio: El valor se invierte (1=unmuted en la consola, 0=muted).
    mute_value = 1 - is_muted 
    osc_address = f"/ch/{channel_number:02d}/mix/send/{bus_number:02d}/on"
    client.send_message(osc_address, mute_value)
    
    estado = "MUTEAR" if is_muted == 1 else "DESMUTEAR"
    print(f"-> Comando enviado: {osc_address} para {estado} Bus {bus_number}.")

def set_main_stereo_fader(level):
    """
    Controla el fader del Bus Stereo Principal (Main L/R).
    
    Parámetros:
    - level (float): El nivel del fader (0.0 a 1.0).
    """
    # Formato del mensaje OSC para el Main Stereo: /main/st/mix/fader
    osc_address = "/main/st/mix/fader"
    client.send_message(osc_address, float(level))
    print(f"-> Comando enviado: {osc_address} (Main L/R) con valor: {level}")

## --- EJEMPLO DE USO ADICIONAL ---

# if __name__ == "__main__":
    
#     BUS_DE_PRUEBA = 1
    
#     # ... (código de prueba anterior para el Canal 1) ...
    
#     print(f"\n--- Iniciando prueba de control para el Bus {BUS_DE_PRUEBA} ---")

#     # 1. Bajar el volumen del Bus 1
#     print("\n--- PASO 5: Bajando Fader del Bus ---")
#     set_bus_fader_level(bus_number=BUS_DE_PRUEBA, level=0.35) 
#     time.sleep(1) 
    
#     # 2. Mutear el Bus 1
#     print("\n--- PASO 6: Muteando Bus ---")
#     set_bus_mute_status(bus_number=BUS_DE_PRUEBA, is_muted=1) 
#     time.sleep(1) 

#     # 3. Desmutear y subir el volumen del Bus 1 a 0 dB
#     print("\n--- PASO 7: Desmuteando y Subiendo Bus ---")
#     set_bus_mute_status(bus_number=BUS_DE_PRUEBA, is_muted=0) 
#     set_bus_fader_level(bus_number=BUS_DE_PRUEBA, level=0.75) 
#     time.sleep(1) 
    
#     # 4. Controlar el Main L/R
#     print("\n--- PASO 8: Bajando y Subiendo Main L/R ---")
#     set_main_stereo_fader(level=0.5) # Nivel bajo
#     time.sleep(1)
#     set_main_stereo_fader(level=0.85) # Nivel alto

#     print("\n--- Prueba de Buses finalizada ---")
