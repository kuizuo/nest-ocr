from concurrent import futures
import time

import grpc
import ocr_pb2
import ocr_pb2_grpc

import ddddocr

ocr = ddddocr.DdddOcr(beta=True)


class OCRServicer(ocr_pb2_grpc.OCRServicer):

    # 这里实现 英数验证码 识别
    def Character(self, request, context):

        t = time.perf_counter()

        result = ocr.classification(request.image)
        consumed_time = int((time.perf_counter() - t)*1000)

        print({'result': result, 'consumedTime': consumed_time})

        # 根据 ocr.proto 的 message CharacterReply 生成的类
        response = ocr_pb2.CharacterReply(
            result=result, consumedTime=consumed_time)
        return response


def serve():
    port = '50051'
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ocr_pb2_grpc.add_OCRServicer_to_server(OCRServicer(), server)
    server.add_insecure_port('[::]:' + port)
    server.start()
    print("Server started, listening on " + port)
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
