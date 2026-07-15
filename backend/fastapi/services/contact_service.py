from clients import wc


async def create_contact_service(data):

    order = {
        "status": "processing",
        "billing": {
            "first_name": data.name,
            "phone": data.phone
        }
    }

    return await wc.post(
        "/orders",
        order
    )