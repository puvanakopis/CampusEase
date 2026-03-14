def accommodation_text(data: dict):
    amenities = " ".join([a["name"] for a in data.get("amenities", [])])
    address = data.get("address") or {}
    city = address.get("city", "")
    
    return f"""
    Accommodation Name: {data.get("name")}
    Type: {data.get("accommodation_type")}
    Description: {data.get("description")}
    Monthly Rent: {data.get("month_rent")}
    Gender: {data.get("gender")}
    Rooms: {data.get("no_of_rooms")}
    Beds: {data.get("no_of_beds")}
    Bathrooms: {data.get("no_of_bathrooms")}
    Amenities: {amenities}
    City: {city}
    """

def vehicle_text(data: dict):
    return f"""
    Vehicle Name: {data.get("name")}
    Brand: {data.get("brand")}
    Model: {data.get("model")}
    Year: {data.get("year")}
    Vehicle Type: {data.get("vehicle_type")}
    Seats: {data.get("no_of_seats")}
    Fuel: {data.get("fuel_type")}
    Transmission: {data.get("transmission")}
    Rent Per Day: {data.get("day_rent")}
    Description: {data.get("description")}
    """

def owner_text(data: dict):
    return f"""
    Owner Name: {data.get("first_name")} {data.get("last_name")}
    Email: {data.get("email")}
    Phone: {data.get("phone")}
    Address: {data.get("address")}
    Description: {data.get("description")}
    """