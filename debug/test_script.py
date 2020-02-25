import os
import shutil
from werkzeug.utils import secure_filename
path = './1/1'
filename = secure_filename(os.path.basename(path))
if filename:
    print('Error')