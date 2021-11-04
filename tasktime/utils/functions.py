from random import randint
import math

def generate_code(Class):
    list_code = Class.objects.values_list("code", flat=True)

    while True:
        code = randint(1, 999)
        if code not in list_code:
            break

    return code

def generate_str_duration(time):
    # @args: int
    # @return: str
    
    hours = minutes = seconds = None
    duration = time
    str_duration = ""

    # Hours
    hours = math.floor(duration / 3600)
    if hours > 0:
        duration -= 3600 * hours
        str_duration = f"{hours} h, "
    
    # Minutes
    minutes = math.floor(duration / 60)
    if minutes > 0:
        duration -= 60 * minutes
        str_duration += f"{minutes} m, "
    
    # Seconds 
    seconds = duration
    str_duration += f"{seconds} s"

    return str_duration