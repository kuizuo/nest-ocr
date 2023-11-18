from concurrent import futures
import time

import grpc
import ocr_pb2
import ocr_pb2_grpc

import ddddocr

ocr = ddddocr.DdddOcr(beta=True)
det = ddddocr.DdddOcr(det=True)
slide = ddddocr.DdddOcr(det=False, ocr=False)


class OCRServicer(ocr_pb2_grpc.OCRServicer):

    def Character(self, request, context):

        t = time.perf_counter()

        result = ocr.classification(request.image)
        consumed_time = int((time.perf_counter() - t)*1000)

        print({'result': result, 'consumedTime': consumed_time})

        reply = ocr_pb2.CharacterReply(
            result=result, consumedTime=consumed_time)
        return reply

    def Select(self, request, context):

        t = time.perf_counter()

        result = det.detection(request.image)
        consumed_time = int((time.perf_counter() - t)*1000)

        print({'result': result, 'consumedTime': consumed_time})

        reply = ocr_pb2.SelectReply(consumedTime=consumed_time)

        for row in result:
            inner_array = ocr_pb2.Array()
            for item in row:
                inner_array.items.append(item)
            reply.result.append(inner_array)

        return reply
    
    def Slide(self, request, context):

        t = time.perf_counter()

        if request.isMatch is True:
            result = slide.slide_match(request.image1, request.image2)
        else:
            result = slide.slide_comparison(request.image1, request.image2)


        consumed_time = int((time.perf_counter() - t)*1000)

        print({'result': result["target"], 'consumedTime': consumed_time})

        reply = ocr_pb2.SlideReply(result=result["target"], consumedTime=consumed_time)

        return reply


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
