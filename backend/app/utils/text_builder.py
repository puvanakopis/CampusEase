from typing import Dict


def accommodation_text(data: Dict):
    amenities = ", ".join(data.get("amenities", []))
    address = data.get("address") or {}
    street = address.get("street", "")
    city = address.get("city", "")
    postal_code = address.get("postal_code", "")
    country = address.get("country", "")
    location = data.get("location") or {}
    latitude = location.get("latitude", "")
    longitude = location.get("longitude", "")
    distance = data.get("time_from_uni") or {}
    susl = distance.get("susl_main_gate", "")
    pambahinna = distance.get("pambahinna_junction", "")
    images = ", ".join([img.get("filename", "")
                       for img in data.get("images", [])])
    reviews_list = data.get("reviews") or []
    reviews = "\n".join(
        [f"    - {r.get('user_id')}: {r.get('message')} (Rating: {r.get('rating')})"
         for r in reviews_list]
    )

    return f"""
        Accommodation ID: {data.get('_id')}
        Name: {data.get('name')}
        Owner ID: {data.get('owner_id')}
        Type: {data.get('accommodation_type')}
        Description: {data.get('description')}
        Monthly Rent: {data.get('month_rent')}
        Gender: {data.get('gender')}
        Rooms: {data.get('no_of_rooms')}
        Beds: {data.get('no_of_beds')}
        Bathrooms: {data.get('no_of_bathrooms')}
        Verified: {data.get('verified')}
        Highly Rated: {data.get('highly_rated')}
        Status: {data.get('status')}
        Reject Reason: {data.get('reject_reason')}
        Available Users: {data.get('available_users')}
        Total Users: {data.get('total_users')}
        Amenities: {amenities}
        Address: {street}, {city}, {postal_code}, {country}
        Location: Latitude {latitude}, Longitude {longitude}
        Distance from SUSL Main Gate: {susl}
        Distance from Pambahinna Junction: {pambahinna}
        Images: {images}
        Reviews:
        {reviews if reviews else '    No reviews'}
        Created At: {data.get('created_at')}
        Last Updated: {data.get('last_updated')}
        """


def vehicle_text(data: Dict):
    address = data.get("address") or {}
    street = address.get("street", "")
    city = address.get("city", "")
    postal_code = address.get("postal_code", "")
    country = address.get("country", "")
    location = data.get("location") or {}
    latitude = location.get("latitude", "")
    longitude = location.get("longitude", "")
    distance = data.get("time_from_uni") or {}
    susl = distance.get("susl_main_gate", "")
    pambahinna = distance.get("pambahinna_junction", "")
    images = ", ".join([img.get("filename", "")
                       for img in data.get("images", [])])
    reviews_list = data.get("reviews") or []
    reviews = "\n".join(
        [f"    - {r.get('user_id')}: {r.get('message')} (Rating: {r.get('rating')})"
         for r in reviews_list]
    )
    amenities = ", ".join(data.get("amenities") or [])

    return f"""
        Vehicle ID: {data.get('_id')}
        Name: {data.get('name')}
        Owner ID: {data.get('owner_id')}
        Brand: {data.get('brand')}
        Model: {data.get('model')}
        Year: {data.get('year')}
        Vehicle Type: {data.get('vehicle_type')}
        Seats: {data.get('no_of_seats')}
        Fuel: {data.get('fuel_type')}
        Transmission: {data.get('transmission')}
        Air Conditioning: {data.get('air_conditioning')}
        Registration Number: {data.get('registration_number')}
        Insurance Number: {data.get('insurance_number')}
        Insurance Expiry: {data.get('insurance_expiry')}
        Verified: {data.get('verified')}
        Highly Rated: {data.get('highly_rated')}
        Day Rent: {data.get('day_rent')}
        Status: {data.get('status')}
        Reject Reason: {data.get('reject_reason')}
        Description: {data.get('description')}
        Amenities: {amenities}
        Address: {street}, {city}, {postal_code}, {country}
        Location: Latitude {latitude}, Longitude {longitude}
        Distance from SUSL Main Gate: {susl}
        Distance from Pambahinna Junction: {pambahinna}
        Images: {images}
        Reviews:
        {reviews if reviews else '    No reviews'}
        Created At: {data.get('created_at')}
        Last Updated: {data.get('last_updated')}
        """


def owner_text(data: Dict):
    photo = data.get("photo") or {}
    photo_info = f"{photo.get('filename')} ({photo.get('content_type')}, {photo.get('size')} bytes)" if photo else "No photo"
    id_photo = data.get("id_photo") or {}
    id_photo_info = f"{id_photo.get('filename')} ({id_photo.get('content_type')}, {id_photo.get('size')} bytes)" if id_photo else "No ID photo"
    return f"""
        Owner ID: {data.get('_id')}
        Name: {data.get('first_name')} {data.get('last_name') or ''}
        Email: {data.get('email')}
        Phone: {data.get('phone')}
        Address: {data.get('address')}
        Role: {data.get('role')}
        Status: {data.get('status')}
        Verified: {data.get('verified')}
        Decline Reason: {data.get('decline_reason')}
        Description: {data.get('description')}
        ID Number: {data.get('id_number')}
        Photo: {photo_info}
        ID Photo: {id_photo_info}
        Created At: {data.get('created_at')}
        Last Updated: {data.get('last_updated')}
        """
