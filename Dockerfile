FROM python:3.7-alpine
ENV TZ=Asia/Shanghai
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk --no-cache add  gcc libc-dev linux-headers
WORKDIR /home/flask/file_server/
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
COPY . .
ENTRYPOINT ["uwsgi"]
CMD ["--ini", "uwsgi.ini"]
