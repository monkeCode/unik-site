from concurrent import futures
import authification_pb2 as authification
import authification_pb2_grpc as authification_grpc
import grpc
import argparse
import mongo_access
PORT = 50051

class AuthenticationService(authification_grpc.AuthenticationServicer):
    def __init__(self, logs = False):
        self.logs = logs
        
    def Login(self, request, context):
        if self.logs:
            print(request.login, request.password, "try to login")
        user = mongo_access.get_user_by_username(request.login)
        if user is None:
            if self.logs:
                print("user not found")
            context.abort(grpc.StatusCode.NOT_FOUND,'user not found')
        
        if user["password"] != request.password:
            if self.logs:
                print("wrong password")
            context.abort(grpc.StatusCode.INVALID_ARGUMENT,'wrong password')

        return authification.KeyMessage(key=str(user["_id"]))

    def Register(self, request, context):
        user = mongo_access.get_user_by_username(request.login)
        if user is not None:
            if self.logs:
                print("user already exist")
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, 'user already exist')
        key = mongo_access.add_user(request.login, request.password, request.email, 
                              request.type)
        
        return authification.KeyMessage(key=key)
    
    def Accert(self, request, context):
        if self.logs:
            print(f"try to get user with {request.key}")
        user = mongo_access.get_user(request.key)
        if user is None:
            if self.logs:
                    print("invalid key")
            context.abort(grpc.StatusCode.NOT_FOUND, 'invalid key')
        return authification.UserReply(id = 0, email=user["email"], type=user["type"])
    
def serve(logs = False):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    authification_grpc.add_AuthenticationServicer_to_server(AuthenticationService(logs), 
                                                            server)
    server.add_insecure_port(f"[::]:{PORT}")
    server.start()
    if logs:
        print(f"server starts on {PORT}")
    server.wait_for_termination()   

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
    prog='auth',
    description='grpc authentication service')
    parser.add_argument('-l', '--logs', help="add logs", action='store_true')
    args = parser.parse_args()
    serve(args.logs)