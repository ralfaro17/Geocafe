# Here you'll find some useful functions to work with Geocafe AWS bucket
from dotenv import load_dotenv
from botocore.config import Config
import os
import boto3

load_dotenv()

s3 = boto3.client("s3", aws_access_key_id=os.getenv("AMAZONS3_API"), aws_secret_access_key=os.getenv("AMAZONS3_KEY"), config=Config(signature_version="s3v4", region_name=os.getenv("BUCKET_REGION")))

if not os.getenv("AMAZONS3_API") or not os.getenv("AMAZONS3_KEY"):
    raise RuntimeError("You need a connection with an AmazonSB3 IAM user API.")

def object_exist(key):
    try:
        s3.head_object(Bucket=os.getenv("BUCKET"), Key=key)
        return True
    except:
        return False


# Obtains the image URL of a user given the username. This is strictly configured to the structure: user_images/{images.png}.
def get_image(username):
    try:
        search = f"user_images/{username}.png"
        
        # Check the object existence before generating the signed URL
        if object_exist(search):
            url = s3.generate_presigned_url('get_object', Params={'Bucket': os.getenv("BUCKET"), 'Key': search}, ExpiresIn=10000)
            return (True, url)
        else:
            return (False, "The image does not exist.")

    except Exception as e:
        return (False, f"An error ocurred while trying to get a URL for the image: {e}")


# Deletes an image, this function is intended for account deletions.
def delete_image(username):
    try:
        s3 = boto3.client('s3', aws_access_key_id=os.getenv("AMAZONS3_API"), aws_secret_access_key=os.getenv("AMAZONS3_KEY"), config=Config(signature_version='s3v4', region_name=os.getenv("BUCKET_REGION")))
        object = f"user_images/{username}.png"
        s3.delete_object(Bucket=os.getenv("BUCKET"), Key=object)
        return (True, "The image was uploaded successfully.")
    
    except Exception as e:
        return (False, f"An error ocurred while deleting the image: {e}")


# Returns the URL of an image to the client after uploading it.
def upload_image(username, imagen):
    try:
        object_key = f"user_images/{username}.png"
        s3.upload_fileobj(imagen, os.getenv("BUCKET"), object_key, ExtraArgs={"ContentType": "image/png"})

        return (True, f"The image was uploaded successfully to {object_key}")
    
    except Exception as e:
        return (False, f"An error ocurred while uploading the image: {e}")