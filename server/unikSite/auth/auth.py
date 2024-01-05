import grpc
import unikSite.auth.authification_pb2_grpc as authification_pb2_grpc
import unikSite.auth.authification_pb2 as authification_pb2
from enum import Enum
HOST = "authification"

class Authenticator(object):
    

    def __new__(cls, *args, **kwargs):
        if "instance" in cls.__dict__:
            return cls.__dict__["instance"]
        inst = super().__new__(cls, *args, **kwargs)
        inst.connected = False
        setattr(cls,"instance", inst)
        return inst

    def __init__(self):
        if not self.connected:
            self.connect()
    
    def __del__(self):
        self.disconnect()

    def connect(self):
        self.channel = grpc.insecure_channel(HOST+':50051')
        self.stub = authification_pb2_grpc.AuthenticationStub(self.channel)
        self.connected = True
        print("connected")

    def disconnect(self):
        self.channel.close()
        self.connected = False

    def login(self, username, password) -> str:
        """login user with username and password

        Args:
            username (str): _description_
            password (str): _description_

        Raises:
            Exception: if connection is not exist

        Returns:
            str: user personal key
        """

        if not self.connected:
            raise Exception("not connected")
        
        req = authification_pb2.LoginRequest(login = username, password=password)
        key = self.stub.Login(req)
        return key

    def register(self, username, password, email, type):
        """register new user


        Args:
            username (str): _description_
            password (str): _description_
            email (str): _description_
            type (str): employee or recruter

        Raises:
            Exception: if connection is not exist

        Returns:
            _type_: user personal key
        """

        if not self.connected:
            raise Exception("not connected")
        
        req = authification_pb2.RegisterRequest(login = username, password=password, 
                                                email=email, type=type)
        
        key = self.stub.Register(req)
        return key
    
    def get_user_by_key(self, key):
        if not self.connected:
            raise Exception("not connected")
        
        req = authification_pb2.KeyMessage(key=key)
        user = self.stub.Accert(req)

        return user

class UserType(Enum):
    employee = "employee"
    recruter = "recruter"
    any = "any"

def authification(usr_type:UserType):
    def wrapper(func):
        def inner(*args, **kwargs):
            key = args[1].context.headers["key"]
            aut = Authenticator()
            user = aut.get_user_by_key(key)
            if(usr_type.value == "any" or user.type == usr_type.value):
                kwargs["user"] = user
                return func(*args, **kwargs)
            raise Exception("permission denied")
        return inner
    return wrapper
if __name__ == "__main__":
    a = Authenticator()
    print(a.login("usr", "log"))