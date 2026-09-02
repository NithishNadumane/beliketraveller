import cv2
import sys
import os
import json

video_path = sys.argv[1]
output_dir = sys.argv[2]

os.makedirs(output_dir, exist_ok=True)

video = cv2.VideoCapture(video_path)

if not video.isOpened():
    print(json.dumps({
        "success": False,
        "error": "Could not open video"
    }))
    sys.exit(1)

fps = video.get(cv2.CAP_PROP_FPS)
frame_count = video.get(cv2.CAP_PROP_FRAME_COUNT)

if fps <= 0 or frame_count <= 0:
    print(json.dumps({
        "success": False,
        "error": "Could not read video"
    }))
    sys.exit(1)

duration = frame_count / fps

# Number of frames to extract
number_of_frames = 6

frames = []

for i in range(number_of_frames):

    # Spread frames across the entire video
    timestamp = (duration / number_of_frames) * i

    video.set(cv2.CAP_PROP_POS_MSEC, timestamp * 1000)

    success, frame = video.read()

    if success:
        frame_path = os.path.join(
            output_dir,
            f"frame_{i}.jpg"
        )

        cv2.imwrite(frame_path, frame)

        frames.append(frame_path)

video.release()

print(json.dumps({
    "success": True,
    "duration": duration,
    "frames": frames
}))