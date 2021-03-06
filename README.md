## flask-fileServer

FROM: https://github.com/Wildog/flask-file-server

A flask file server with an elegant frontend for browsing, uploading, streaming and deleting files.

![screenshot](https://raw.githubusercontent.com/scenerycm/flask-fileServer/master/screenshot.jpg)

## Quick Start
### Build

```docker build -t scenerycm/flask-file-server:1.0 .```

### Run

```docker run -p 8010:8010 scenerycm/flask-file-server:1.0```

### Params

FS_BIND = Param for bind address, default 0.0.0.0  
FS_PORT = Param for server port, default 8010  
FS_PATH = Param for serve path, default ./dir_file  
FS_COMMON_KEY = Param for authentication key as base64 encoded username:password, default none, use to upload files
FS_AUTH_KEY =  Param for authentication key as base64 encoded username:password, default none, use to delete files or folders

The container WORKDIR is: `/home/flask/file_server/`. The host file save dir is: `/home/file_server`

Docker run command:

```docker run --name="fileServer" -d -it -p 8010:8010 -e FS_BIND=0.0.0.0 -e FS_PORT=8010  -e FS_PATH=./dir_file -e FS_AUTH_KEY=OnBhc3N3MHJk -v /home/file_server:/home/flask/file_server/dir_file scenerycm/flask-file-server:1.0```

