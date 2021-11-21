STATUS = [
    (0, "Pending"),
    (1, "In process"),
    (2, "Paused"),
    (3, "Finalized"),
    (4, "Canceled"),
]

DIC_STATUS = {
    0:"Pending",
    1:"In process",
    2:"Paused",
    3:"Finalized",
    4:"Canceled"
}


def verifyStatus(old_status, status):
    # Verify if the change of status is correct
    
    if ((old_status == 0 and status == 1) or 
        (old_status == 1 and status == 2) or
        (old_status == 2 and status == 1) or
        (old_status == 1 and status == 3) or
        (old_status == 2 and status == 3) or
        (status == 4)):
        return True
    
    return False
