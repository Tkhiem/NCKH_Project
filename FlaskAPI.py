from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)

# URL của API đã deploy trên Render
RENDER_API_URL = "https://imagecaption-nckh.onrender.com/upload"  # Thay bằng URL thực tế của bạn

# Kiểm tra xem API có hoạt động không
@app.route('/')
def home():
    return "Chào mừng đến với API của tôi! API này chuyển tiếp yêu cầu đến API trên Render."

# Endpoint POST /upload để chuyển yêu cầu đến API Render
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({"error": "Không có file ảnh"}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Không có file nào được chọn"}), 400

    # Đọc nội dung file ảnh
    files = {'image': (file.filename, file.read(), file.content_type)}

    try:
        # Gửi ảnh đến API trên Render
        response = requests.post(RENDER_API_URL, files=files)

        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({"error": "Lỗi từ API Render", "status_code": response.status_code}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Lỗi kết nối đến API Render", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

print("Available routes:")
for rule in app.url_map.iter_rules():
    print(rule)
