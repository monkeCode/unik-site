from pymongo import MongoClient
from bson.objectid import ObjectId

USER = "root"
HOST = "mongo"
PASSWORD = "MegaGigaPass12345"
PORT = 27017
DATABASE = "auth"

def get_database():
 
   CONNECTION_STRING = f"mongodb://{USER}:{PASSWORD}@{HOST}:{PORT}"
 
   client = MongoClient(CONNECTION_STRING)
 
   return client[DATABASE]
  

def get_user(key:str)-> dict|None:
   db = get_database()
   usr = db.users.find_one(ObjectId(key))
   return usr

def get_user_by_username(username:str)-> dict|None:
   db = get_database()
   usr = db.users.find_one({"username": username})
   return usr

def add_user(username:str, password:str, email:str, type)->str:
   usr = {"username": username, "password": password, "email": email, "type": type}
   db = get_database()
   return str(db.users.insert_one(usr).inserted_id)

if __name__ == "__main__":   
  
   print(str(get_user_by_username("foo")["_id"]))