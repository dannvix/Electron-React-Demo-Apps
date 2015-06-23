import sys
import time
from datetime import datetime

if __name__ == "__main__":
  while True:
    print datetime.now()
    sys.stdout.flush()
    time.sleep(1)
