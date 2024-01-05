from concurrent import futures
import authification_pb2 as authification
import authification_pb2_grpc as authification_grpc
import grpc
import argparse

PORT = 50051

class AuthenticationService(authification_grpc.AuthenticationServicer):
    def __init__(self, logs = False):
        self.logs = logs
        
    def Login(self, request, context):
        if self.logs:
            print(request.login, request.password, "try to login")
        return authification.KeyMessage(key="fjflkdjsflkdsjfkldsjf")

    def Register(self, request, context):
        return super().Register(request, context)
    
    def Accert(self, request, context):
        return authification.UserReply(id = 1, email="mail", type="employee")
    
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