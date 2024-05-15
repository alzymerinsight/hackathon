import sys
def extract_feature(dir_path):
    img = mpimg.imread(dir_path)
    img = img / 255.0  # normalize pixel values
    img = resize(img, (128, 128, 3))  # convert all images to (128x128x3)
    img = np.reshape(img, (128, 384))
    return img

import pickle
from PIL import Image
import matplotlib.image as mpimg
from skimage.transform import resize
import numpy as np
model = sys.argv[2] 
with open(model, 'rb') as f:
    model = pickle.load(f)

width = 256
height = 256
new_size = (width,height)
def resizer(file):
    img = Image.fromarray(file) 
    img = img.resize(new_size)
    array_temp = np.array(img)
    shape_new = width*height
    img_wide = array_temp.reshape(1, shape_new)
    return img_wide
inputdata = extract_feature(sys.argv[1])
prediction = model.predict(resizer(inputdata))

# Print the prediction
print(prediction)