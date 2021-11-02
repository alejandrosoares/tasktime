from random import randint


def generate_code(Class):
    list_code = Class.objects.values_list("code", flat=True)

    while True:
        code = randint(1, 999)
        if code not in list_code:
            break

    return code
