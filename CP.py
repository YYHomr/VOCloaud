import os
import shutil

# المسارات
source_folder = r"F:/downloads/port1"
destination_folder = r"F:/downloads/port2"

# إنشاء مجلد الوجهة إذا لم يكن موجود
os.makedirs(destination_folder, exist_ok=True)

# صيغ الفيديو المدعومة
video_extensions = (".mp4", ".mov", ".avi", ".mkv", ".webm")

# جلب كل الفيديوهات من Port1
videos = [
    f for f in os.listdir(source_folder)
    if f.lower().endswith(video_extensions)
]

# ترتيب الفيديوهات أبجديًا
videos.sort()

# نسخ الفيديوهات مع إعادة التسمية
for index, video in enumerate(videos, start=1):
    new_name = f"{index}.mp4"
    src_path = os.path.join(source_folder, video)
    dst_path = os.path.join(destination_folder, new_name)

    shutil.copy2(src_path, dst_path)

print(f"✅ تم نسخ وترقيم {len(videos)} فيديو بنجاح")
