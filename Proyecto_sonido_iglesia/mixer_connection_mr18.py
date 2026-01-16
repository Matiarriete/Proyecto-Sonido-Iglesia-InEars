from pythonosc import udp_client
import time, threading,struct,socket
from typing import Dict

MR18_IP = config.MIXER_IP
MR18_PORT = 10024

client = udp_client.SimpleUDPClient(MR18_IP, MR18_PORT)

def set_bus_fader_level(bus_number: int, level: float):
    """
    Controla el nivel del fader del Bus de Mix.
    
    El nivel (level) debe ser un valor de punto flotante entre 0.0 y 1.0.
    
    Parámetros:
    - bus_number (int): El número del Bus (1 al 6).
    - level (float): El nivel del fader (0.0 a 1.0).
    """
    # Formato del mensaje OSC para el fader de un Bus: /bus/XX/mix/fader
    osc_address = f"/bus/{bus_number}/mix/fader"
    client.send_message(osc_address, float(level))
    print(f"-> Comando enviado: {osc_address} (Bus {bus_number}) con valor: {level}")

def set_channel_mute_status(bus_number: int, is_muted: int):
    """
    Mutea o desmutea un Bus de Mix.
    
    Parámetros:
    - bus_number (int): El número del Bus (1 al 6).
    - is_muted (int): 1 para mutear, 0 para desmutear.
    """
    print(MR18_IP)
    # Formato del mensaje OSC para el mute de un Bus: /bus/XX/mix/on
    # Recordatorio: El valor se invierte (1=unmuted en la consola, 0=muted).
    mute_value = 1 - is_muted 
    osc_address = f"/bus/{bus_number}/mix/on"
    client.send_message(osc_address, mute_value)
    
    estado = "MUTEAR" if is_muted == 1 else "DESMUTEAR"
    print(f"-> Comando enviado: {osc_address} para {estado} Bus {bus_number}.")

def set_channel_fader_level_bus(bus_number: int, level: float, channel_number: int):
    """
    Controla el nivel del fader de un canal del Bus de Mix.
    
    El nivel (level) debe ser un valor de punto flotante entre 0.0 y 1.0.
    
    Parámetros:
    - bus_number (int): El número del Bus (1 al 6).
    - level (float): El nivel del fader (0.0 a 1.0).
    - channel_number: Canal que se le va a modificar el volumen.
    """
    # Formato del mensaje OSC para el fader de un Bus: /bus/XX/mix/fader
    osc_address = f"/ch/{channel_number:02d}/mix/{bus_number:02d}/level"
    client.send_message(osc_address, float(level))
    print(f"-> Comando enviado: {osc_address} (Bus {bus_number}) con valor: {level}") 