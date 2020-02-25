import os

bind = os.getenv('FS_BIND', '0.0.0.0')
port = os.getenv('FS_PORT', '8010')
root = os.path.normpath(os.getenv('FS_PATH', './dir_file'))
common_key = os.getenv('FS_COMMON_KEY','Og==')
auth_key = os.getenv('FS_AUTH_KEY','OnBhc3N3MHJk')