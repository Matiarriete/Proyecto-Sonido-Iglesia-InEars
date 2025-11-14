from Models import Response

def set_response_items(data):
    response = {"data": data, "count": len(data)}
    return Response(**response)

def set_response_unique(data):
    response = {"data": data, "count": 1}
    return Response(**response)
