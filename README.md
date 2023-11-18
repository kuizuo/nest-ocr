# nest-ocr

使用 nest 框架, 通过 grpc 与 python 通信，调用 [ddddocr](https://github.com/sml2h3/ddddocr) 库

**建议 python 版本 3.7-3.9 64 位**

## 运行项目

### 运行 grpc 服务端

```shell
# 安装依赖
cd ocr_server
pip3 install -r requirements.txt

python3 server.py
```

依赖有点大, 请耐心等候...

docker 运行

```shell
# 编译镜像
docker build -t ocr_server:v1 .

# 运行镜像
docker run -p 8124:8124 -d ocr_server:v1
```

### 运行 grpc 客户端 (nest 服务)

```shell
pnpm i
pnpm run dev
```

### 测试

[在线测试](https://apifox.com/apidoc/shared-64d64b17-925b-407f-b52b-9ab46214c0d0)
