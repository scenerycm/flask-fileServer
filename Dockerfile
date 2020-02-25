FROM python:3.7
ENV TZ=Asia/Shanghai
WORKDIR /home/flask/file_server/
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
COPY . .
ENTRYPOINT ["uwsgi"]
CMD ["--ini", "uwsgi.ini"]