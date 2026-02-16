import os
from fastapi import UploadFile

async def save_file(file: UploadFile, filename: str, folder: str):
    ext = file.filename.split(".")[-1]  
    os.makedirs(folder, exist_ok=True)   
    file_path = os.path.join(folder, f"{filename}.{ext}")

    with open(file_path, "wb") as f:
        f.write(await file.read()) 

    return {
        "filename": f"{filename}.{ext}",
        "content_type": file.content_type,
        "size": file.spool_max_size if hasattr(file, "spool_max_size") else 0,
        "path": file_path
    }
